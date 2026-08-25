import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PropertyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "",
    location: "",
    city: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    areaSize: "",
    images: "",
    status: "available",
  });

  // =========================
  // Fetch Property
  // =========================
  const fetchProperty = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8080/api/properties/${id}`,
      );

      const result = await response.json();

      if (!result.status) {
        alert(result.message || "Property not found");
        navigate("/properties");
        return;
      }

      const property = result.data;

      // =========================
      // Check Owner
      // =========================
      const user = JSON.parse(localStorage.getItem("user") || "null");

      const propertyOwnerId =
        typeof property.owner === "object"
          ? property.owner?._id
          : property.owner;

      if (!user || propertyOwnerId?.toString() !== user.id?.toString()) {
        alert("You can only edit your own property");
        navigate("/properties");
        return;
      }

      // =========================
      // Set Form Data
      // =========================
      setFormData({
        title: property.title || "",
        description: property.description || "",
        price: property.price || "",
        propertyType: property.propertyType || "",
        location: property.location || "",
        city: property.city || "",
        area: property.area || "",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        areaSize: property.areaSize || "",
        images: property.images?.join(", ") || "",
        status: property.status || "available",
      });
    } catch (error) {
      console.log("Fetch property error:", error);
      alert("Something went wrong");
      navigate("/properties");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Handle Input
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Update Property
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setUpdating(true);

      const imageArray = formData.images
        .split(",")
        .map((image) => image.trim())
        .filter(Boolean);

      const data = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        propertyType: formData.propertyType,
        location: formData.location,
        city: formData.city,
        area: formData.area,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        areaSize: Number(formData.areaSize),
        images: imageArray,
        status: formData.status,
      };

      const response = await fetch(
        `http://localhost:8080/api/properties/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (result.status) {
        alert("Property updated successfully ✅");
        navigate("/properties");
      } else {
        alert(result.message || "Failed to update property");
      }
    } catch (error) {
      console.log("Update property error:", error);
      alert("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // Load Property
  // =========================
  useEffect(() => {
    if (!id) {
      navigate("/properties");
      return;
    }

    fetchProperty();
  }, [id]);

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <section className="py-5">
        <div className="container text-center py-5">
          <div
            className="spinner-border"
            style={{ color: "#d4a017" }}
            role="status"
          ></div>

          <h5 className="mt-3">Loading property...</h5>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <p
            className="text-uppercase fw-semibold mb-2"
            style={{
              color: "#d4a017",
              fontSize: "13px",
              letterSpacing: "2px",
            }}
          >
            Edit Property
          </p>

          <h2 className="fw-bold">Update Your Property</h2>

          <p className="text-muted">Update your property information below.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card border-0 shadow-sm p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Title */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Property Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Property Type */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Property Type
                    </label>

                    <select
                      name="propertyType"
                      className="form-select"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="luxury-house">Luxury House</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Price</label>

                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* City */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">City</label>

                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Location</label>

                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Area */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Area / Locality
                    </label>

                    <input
                      type="text"
                      name="area"
                      className="form-control"
                      value={formData.area}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Bedrooms */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Bedrooms</label>

                    <input
                      type="number"
                      name="bedrooms"
                      className="form-control"
                      min="0"
                      value={formData.bedrooms}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Bathrooms */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Bathrooms</label>

                    <input
                      type="number"
                      name="bathrooms"
                      className="form-control"
                      min="0"
                      value={formData.bathrooms}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Area Size */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Area Size (sq.ft)
                    </label>

                    <input
                      type="number"
                      name="areaSize"
                      className="form-control"
                      min="0"
                      value={formData.areaSize}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Status */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>

                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>

                  {/* Images */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Image URLs</label>

                    <input
                      type="text"
                      name="images"
                      className="form-control"
                      value={formData.images}
                      onChange={handleChange}
                    />

                    <small className="text-muted">
                      Multiple images ko comma se separate karein.
                    </small>
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Description
                    </label>

                    <textarea
                      name="description"
                      className="form-control"
                      rows="5"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Buttons */}
                  <div className="col-12 mt-4">
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary flex-fill"
                        onClick={() => navigate("/properties")}
                        disabled={updating}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="btn text-white flex-fill"
                        style={{
                          background: "#d4a017",
                          border: "none",
                        }}
                        disabled={updating}
                      >
                        {updating ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Updating...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-lg me-2"></i>
                            Update Property
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyEdit;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProperty = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // =========================
  // Check Logged In Owner
  // =========================
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Normal user ko create page access nahi
  if (!token || user?.role !== "owner") {
    return (
      <section className="py-5 bg-white">
        <div className="container text-center py-5">
          <i
            className="bi bi-shield-lock"
            style={{
              fontSize: "50px",
              color: "#d4a017",
            }}
          ></i>

          <h3 className="mt-3">Access Denied</h3>

          <p className="text-muted">
            Only property owners can create a property.
          </p>

          <button
            type="button"
            className="btn text-white"
            style={{
              background: "#d4a017",
            }}
            onClick={() => navigate("/properties")}
          >
            View Properties
          </button>
        </div>
      </section>
    );
  }

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
  // Submit Property
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const imageArray = formData.images
        .split(",")
        .map((image) => image.trim())
        .filter((image) => image !== "");

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

      const response = await fetch("http://localhost:8080/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log("Create property response:", result);

      if (response.ok && result.status) {
        alert("Property created successfully 🏠");

        navigate("/properties");
      } else {
        alert(result.message || "Failed to create property");
      }
    } catch (error) {
      console.log("Create property error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-white">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <p
            className="text-uppercase fw-semibold mb-2"
            style={{
              color: "#d4a017",
              fontSize: "13px",
              letterSpacing: "2px",
            }}
          >
            Owner Panel
          </p>

          <h2 className="fw-bold">List Your Property</h2>

          <p className="text-muted">
            Add your property details and publish it.
          </p>
        </div>

        {/* Form */}
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
                      placeholder="Luxury 3 BHK Villa"
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
                      placeholder="5000000"
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
                      placeholder="Ahmedabad"
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
                      placeholder="Satellite"
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
                      placeholder="Near Iscon Mall"
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
                      placeholder="3"
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
                      placeholder="2"
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
                      placeholder="1800"
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
                      placeholder="https://image1.jpg, https://image2.jpg"
                      value={formData.images}
                      onChange={handleChange}
                    />

                    <small className="text-muted">
                      Multiple images comma se separate karein.
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
                      placeholder="Describe your property..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Submit */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn w-100 text-white"
                      disabled={loading}
                      style={{
                        background: "#d4a017",
                        border: "none",
                        padding: "12px",
                      }}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Creating Property...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-house-add me-2"></i>
                          Create Property
                        </>
                      )}
                    </button>
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

export default CreateProperty;

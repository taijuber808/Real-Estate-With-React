import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(null);

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [bhk, setBhk] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  // =========================
  // URL Search
  // =========================
  useEffect(() => {
    const search = searchParams.get("search");

    if (search) {
      setLocation(search);
    }
  }, [searchParams]);

  // =========================
  // Fetch Properties
  // =========================
  const fetchProperties = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams();

      if (location.trim()) {
        query.append("search", location.trim());
      }

      if (type) {
        query.append("propertyType", type);
      }

      if (bhk) {
        query.append("bedrooms", bhk);
      }

      if (priceRange === "under50") {
        query.append("maxPrice", 5000000);
      }

      if (priceRange === "50-80") {
        query.append("minPrice", 5000000);
        query.append("maxPrice", 8000000);
      }

      if (priceRange === "80-120") {
        query.append("minPrice", 8000000);
        query.append("maxPrice", 12000000);
      }

      if (priceRange === "above120") {
        query.append("minPrice", 12000000);
      }

      query.append("page", 1);
      query.append("limit", 20);

      const response = await fetch(
        `http://localhost:8080/api/properties?${query.toString()}`,
      );

      const result = await response.json();

      if (response.ok && result.status) {
        setProperties(result.data || []);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.log("Property fetch error:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Fetch Wishlist
  // =========================
  const fetchWishlist = async () => {
    if (!token) {
      setWishlistItems([]);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/wishlist", {
        headers: {
          token,
        },
      });

      const result = await response.json();

      if (result.status) {
        const ids = result.data.map((item) =>
          typeof item.property === "object" ? item.property._id : item.property,
        );

        setWishlistItems(ids);
      }
    } catch (error) {
      console.log("Wishlist fetch error:", error);
    }
  };

  // =========================
  // Wishlist
  // =========================
  const handleWishlist = async (propertyId) => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (wishlistItems.includes(propertyId)) {
      alert("Property already added to wishlist ❤️");
      return;
    }

    try {
      setWishlistLoading(propertyId);

      const response = await fetch(
        `http://localhost:8080/api/wishlist/${propertyId}`,
        {
          method: "POST",
          headers: {
            token,
          },
        },
      );

      const result = await response.json();

      if (result.status) {
        setWishlistItems((prev) => [...prev, propertyId]);
        alert("Property added to wishlist ❤️");
      } else {
        alert(result.message || "Failed to add wishlist");
      }
    } catch (error) {
      console.log("Wishlist error:", error);
      alert("Something went wrong");
    } finally {
      setWishlistLoading(null);
    }
  };

  // =========================
  // Delete Property
  // =========================
  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/properties/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            token,
          },
        },
      );

      const result = await response.json();

      if (result.status) {
        setProperties((prev) =>
          prev.filter((property) => property._id !== propertyId),
        );

        alert("Property deleted successfully");
      } else {
        alert(result.message || "Failed to delete property");
      }
    } catch (error) {
      console.log("Delete error:", error);
      alert("Something went wrong");
    }
  };

  // =========================
  // Edit Property
  // =========================
  const handleEdit = (propertyId) => {
    navigate(`/property-edit/${propertyId}`);
  };

  // =========================
  // Clear Filters
  // =========================
  const clearFilters = () => {
    setLocation("");
    setType("");
    setBhk("");
    setPriceRange("");

    navigate("/properties");
  };

  // =========================
  // Fetch Data
  // =========================
  useEffect(() => {
    fetchProperties();
    fetchWishlist();
  }, [location, type, bhk, priceRange]);

  return (
    <section className="py-5 bg-light min-vh-100">
      {/* =========================
          HEADER
      ========================= */}
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-down">
          <p
            className="text-uppercase fw-semibold mb-2"
            style={{
              color: "#d4a017",
              fontSize: "13px",
              letterSpacing: "2px",
            }}
          >
            DreamEstate
          </p>

          <h1 className="fw-bold mb-3">Find Your Perfect Property</h1>

          <p className="text-muted mb-0">
            Explore houses, apartments, villas and luxury homes across Gujarat.
          </p>
        </div>

        {/* =========================
            FILTER BOX
        ========================= */}
        <div
          className="bg-white rounded-4 shadow-sm p-4 mb-5"
          data-aos="fade-up"
        >
          <div className="row g-3 align-items-end">
            {/* Location */}
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-semibold">
                <i className="bi bi-geo-alt me-1"></i>
                Location
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Ahmedabad, Surat..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Type */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-semibold">Property Type</label>

              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="villa">Villa</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="luxury-house">Luxury House</option>
              </select>
            </div>

            {/* BHK */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-semibold">BHK</label>

              <select
                className="form-select"
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
              >
                <option value="">Any BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5 BHK</option>
              </select>
            </div>

            {/* Price */}
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-semibold">Price Range</label>

              <select
                className="form-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="under50">Under ₹50 Lakh</option>
                <option value="50-80">₹50 - ₹80 Lakh</option>
                <option value="80-120">₹80 Lakh - ₹1.2 Crore</option>
                <option value="above120">Above ₹1.2 Crore</option>
              </select>
            </div>

            {/* Clear */}
            <div className="col-lg-2 col-md-6">
              <button
                type="button"
                className="btn w-100"
                onClick={clearFilters}
                style={{
                  background: "#061326",
                  color: "white",
                  height: "38px",
                }}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* =========================
            RESULT TITLE
        ========================= */}
        <div
          className="d-flex justify-content-between align-items-center mb-4"
          data-aos="fade-up"
        >
          <div>
            <h4 className="fw-bold mb-1">Properties</h4>

            <p className="text-muted mb-0 small">
              {loading
                ? "Finding properties..."
                : `${properties.length} properties found`}
            </p>
          </div>
        </div>

        {/* =========================
            LOADING
        ========================= */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "#d4a017" }}></div>

            <h5 className="mt-3">Finding properties...</h5>
          </div>
        )}

        {/* =========================
            PROPERTY CARDS
        ========================= */}
        {!loading && properties.length > 0 && (
          <div className="row g-4">
            {properties.map((property, index) => {
              const isOwner =
                user?.role === "owner" &&
                property.owner?._id?.toString() === user?.id?.toString();

              const isWishlisted = wishlistItems.includes(property._id);

              return (
                <div
                  key={property._id}
                  className="col-xl-3 col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 100}
                >
                  <div className="property-card h-100 bg-white rounded-4 overflow-hidden shadow-sm">
                    {/* =========================
                        IMAGE
                    ========================= */}
                    <div
                      className="property-image position-relative"
                      style={{ height: "230px" }}
                    >
                      <img
                        src={property.images?.[0] || "/default-property.jpg"}
                        alt={property.title}
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                        }}
                      />

                      {/* Badge */}
                      <span className="property-badge">
                        {property.status === "sold" ? "Sold" : "For Sale"}
                      </span>

                      {/* Wishlist */}
                      <button
                        type="button"
                        className="wishlist-btn"
                        onClick={() => handleWishlist(property._id)}
                        disabled={wishlistLoading === property._id}
                        style={{
                          color: isWishlisted ? "#dc3545" : "#333",
                        }}
                      >
                        <i
                          className={
                            isWishlisted ? "bi bi-heart-fill" : "bi bi-heart"
                          }
                        ></i>
                      </button>
                    </div>

                    {/* =========================
                        CONTENT
                    ========================= */}
                    <div className="property-content p-3">
                      <h5 className="property-title fw-bold">
                        {property.title}
                      </h5>

                      <p className="property-location text-muted">
                        <i className="bi bi-geo-alt-fill me-1"></i>

                        {property.location}

                        {property.city && <>, {property.city}</>}
                      </p>

                      {/* Type */}
                      <span
                        className="badge rounded-pill mb-3"
                        style={{
                          background: "#fff4d6",
                          color: "#a57900",
                        }}
                      >
                        {property.propertyType}
                      </span>

                      {/* Info */}
                      <div className="property-info d-flex gap-3 mb-3">
                        <span>
                          <i className="bi bi-door-open me-1"></i>
                          {property.bedrooms} BHK
                        </span>

                        <span>
                          <i className="bi bi-rulers me-1"></i>
                          {property.areaSize} sq.ft
                        </span>
                      </div>

                      {/* Price */}
                      <div className="property-bottom d-flex justify-content-between align-items-end">
                        <div className="property-price">
                          <small className="text-muted">Price</small>

                          <h5
                            className="fw-bold mb-0"
                            style={{ color: "#061326" }}
                          >
                            ₹{Number(property.price).toLocaleString("en-IN")}
                          </h5>
                        </div>

                        <Link
                          to={`/property-details/${property._id}`}
                          className="view-btn"
                        >
                          Details
                          <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                      </div>

                      {/* =========================
                          OWNER ACTIONS
                      ========================= */}
                      {isOwner && (
                        <div className="d-flex gap-2 mt-3">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm flex-fill"
                            onClick={() => handleEdit(property._id)}
                          >
                            <i className="bi bi-pencil me-1"></i>
                            Edit
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm flex-fill"
                            onClick={() => handleDelete(property._id)}
                          >
                            <i className="bi bi-trash me-1"></i>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================
            NO PROPERTY
        ========================= */}
        {!loading && properties.length === 0 && (
          <div
            className="text-center bg-white rounded-4 shadow-sm py-5"
            data-aos="zoom-in"
          >
            <i
              className="bi bi-house-x"
              style={{
                fontSize: "55px",
                color: "#d4a017",
              }}
            ></i>

            <h4 className="fw-bold mt-3">No Properties Found</h4>

            <p className="text-muted">Try changing your location or filters.</p>

            <button
              type="button"
              className="btn"
              onClick={clearFilters}
              style={{
                background: "#061326",
                color: "white",
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyListing;

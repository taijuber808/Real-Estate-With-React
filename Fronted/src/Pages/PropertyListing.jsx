import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Search / Filter states
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [bhk, setBhk] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // =========================
  // Fetch Properties
  // =========================
  const fetchProperties = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams();

      if (location) {
        query.append("search", location);
      }

      if (type) {
        query.append("propertyType", type);
      }

      if (bhk) {
        query.append("bedrooms", bhk);
      }

      // Price
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

      if (result.status) {
        setProperties(result.data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.log("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Fetch Wishlist
  // =========================
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch("http://localhost:8080/api/wishlist", {
        method: "GET",
        headers: {
          token: token,
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
  // Add To Wishlist
  // =========================
  const handleWishlist = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      // Already in wishlist
      if (wishlistItems.includes(propertyId)) {
        alert("Property already added to wishlist ❤️");
        return;
      }

      setWishlistLoading(propertyId);

      const response = await fetch("http://localhost:8080/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          property: propertyId,
        }),
      });

      const result = await response.json();

      console.log("Wishlist response:", result);

      if (result.status) {
        alert("Property added to wishlist ❤️");

        // Heart ko filled karne ke liye
        setWishlistItems((prev) => [...prev, propertyId]);
      } else {
        alert(result.message || "Failed to add property to wishlist");
      }
    } catch (error) {
      console.log("Wishlist error:", error);
      alert("Something went wrong");
    } finally {
      setWishlistLoading(null);
    }
  };

  // =========================
  // First Load
  // =========================
  useEffect(() => {
    fetchProperties();
    fetchWishlist();
  }, [location, type, bhk, priceRange]);

  return (
    <section className="py-5 bg-white">
      {/* =========================
          Heading
      ========================= */}
      <div className="text-center mb-4">
        <p
          className="text-uppercase fw-semibold mb-2"
          style={{
            color: "#d4a017",
            fontSize: "13px",
            letterSpacing: "2px",
          }}
        >
          Our Properties
        </p>

        <h2 className="fw-bold mb-3">Find Your Perfect Property</h2>

        <p className="text-muted mb-0">
          Explore our handpicked properties and find your perfect home.
        </p>
      </div>

      {/* =========================
          Search Box
      ========================= */}
      <div className="container mb-5">
        <div
          className="p-4 rounded shadow-sm"
          style={{
            background: "#f8f9fa",
          }}
        >
          <div className="row g-3">
            {/* Location */}
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-semibold">Location</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Property Type */}
            <div className="col-lg-3 col-md-6">
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
              </select>
            </div>

            {/* BHK */}
            <div className="col-lg-3 col-md-6">
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
          </div>
        </div>
      </div>

      {/* =========================
          Property Cards
      ========================= */}
      <div className="container">
        {loading ? (
          <div className="text-center py-5">
            <h5>Loading properties...</h5>
          </div>
        ) : properties.length > 0 ? (
          <div className="row g-4">
            {properties.map((property) => {
              const isWishlisted = wishlistItems.includes(property._id);

              return (
                <div
                  key={property._id}
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  {/* Property Card */}
                  <div className="property-card">
                    {/* Image */}
                    <div className="property-image">
                      <img src={property.images?.[0]} alt={property.title} />

                      {/* Property Type Badge */}
                      <span className="property-badge">For Sale</span>

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

                    {/* Card Content */}
                    <div className="property-content">
                      {/* Title */}
                      <h5 className="property-title">{property.title}</h5>

                      {/* Location */}
                      <p className="property-location">
                        <i className="bi bi-geo-alt-fill"></i>

                        {property.location}

                        {property.city && <>, {property.city}</>}
                      </p>

                      {/* Property Information */}
                      <div className="property-info">
                        <span>
                          <i className="bi bi-door-open"></i>
                          {property.bedrooms} BHK
                        </span>

                        <span>
                          <i className="bi bi-rulers"></i>
                          {property.areaSize} sq.ft
                        </span>
                      </div>

                      {/* Bottom Section */}
                      <div className="property-bottom">
                        {/* Price */}
                        <div className="property-price">
                          <small>Price</small>

                          <h6>
                            ₹{Number(property.price).toLocaleString("en-IN")}
                          </h6>
                        </div>

                        {/* View Details */}
                        <Link
                          to={`/property-details/${property._id}`}
                          className="view-btn"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5">
            <h5>No properties found</h5>

            <p className="text-muted">Try changing your search filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyListing;

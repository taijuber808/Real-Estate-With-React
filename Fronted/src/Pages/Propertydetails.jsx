import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // =========================
  // Get Property
  // =========================
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/properties/${id}`,
        );

        const result = await response.json();

        if (result.status) {
          setProperty(result.data);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  // =========================
  // Add To Wishlist
  // =========================
  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      setWishlistLoading(true);

      const response = await fetch("http://localhost:8080/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          property: id,
        }),
      });

      const result = await response.json();

      if (result.status) {
        alert("Property added to wishlist ❤️");
      } else {
        alert(result.message || "Failed to add wishlist");
      }
    } catch (error) {
      console.log("Wishlist error:", error);
      alert("Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  // =========================
  // Loading
  // =========================
  if (!property) {
    return (
      <div className="property-loading text-center py-5">
        <div className="spinner-border mb-3"></div>
        <h5>Loading property...</h5>
      </div>
    );
  }

  // =========================
  // Images
  // =========================
  const images =
    property.images?.length > 0 ? property.images : ["/default-property.jpg"];

  return (
    <section className="property-details-page">
      <div className="container">
        {/* =========================
            Top Navigation
        ========================= */}
        <div className="details-topbar">
          <Link to="/properties" className="back-link">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Properties
          </Link>

          <button
            className="details-wishlist"
            onClick={handleWishlist}
            disabled={wishlistLoading}
          >
            <i
              className={`bi ${
                wishlistLoading ? "bi-hourglass-split" : "bi-heart"
              }`}
            ></i>
          </button>
        </div>

        {/* =========================
            Main Details
        ========================= */}
        <div className="details-wrapper">
          {/* =========================
              LEFT SIDE - Gallery
          ========================= */}
          <div className="details-gallery">
            {/* Main Image */}
            <div className="main-property-image">
              <img src={images[selectedImage]} alt={property.title} />

              {/* Wishlist on Image */}
              <button
                className="image-heart"
                onClick={handleWishlist}
                disabled={wishlistLoading}
              >
                <i
                  className={`bi ${
                    wishlistLoading ? "bi-hourglass-split" : "bi-heart"
                  }`}
                ></i>
              </button>
            </div>

            {/* Thumbnails */}
            {property.images?.length > 0 && (
              <div className="property-thumbnails">
                {images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`property-thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${property.title}-${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}
          <div className="details-content">
            {/* Property Type */}
            <span className="details-badge">{property.propertyType}</span>

            {/* Title */}
            <h1 className="details-title">{property.title}</h1>

            {/* Location */}
            <p className="details-location">
              <i className="bi bi-geo-alt-fill me-2"></i>

              {property.location}

              {property.city && `, ${property.city}`}
            </p>

            {/* Price */}
            <div className="details-price">
              ₹{Number(property.price).toLocaleString("en-IN")}
            </div>

            {/* =========================
                Basic Information
            ========================= */}
            <div className="details-basic-info">
              {/* Bedrooms */}
              <div className="basic-item">
                <i className="bi bi-door-open"></i>

                <div>
                  <small>Bedrooms</small>

                  <strong>{property.bedrooms} BHK</strong>
                </div>
              </div>

              {/* Bathrooms */}
              <div className="basic-item">
                <i className="bi bi-droplet"></i>

                <div>
                  <small>Bathrooms</small>

                  <strong>{property.bathrooms}</strong>
                </div>
              </div>

              {/* Area */}
              <div className="basic-item">
                <i className="bi bi-rulers"></i>

                <div>
                  <small>Area</small>

                  <strong>{property.areaSize} sq.ft</strong>
                </div>
              </div>

              {/* Property Type */}
              <div className="basic-item">
                <i className="bi bi-buildings"></i>

                <div>
                  <small>Type</small>

                  <strong>{property.propertyType}</strong>
                </div>
              </div>
            </div>

            {/* =========================
                About Property
            ========================= */}
            <div className="about-property">
              <h3>About Property</h3>

              <p>
                {property.description ||
                  "No description available for this property."}
              </p>
            </div>

            {/* =========================
                Property Location Info
            ========================= */}
            <div className="property-features">
              <h3>Location</h3>

              <div className="features-grid">
                <div className="feature-item">
                  <i className="bi bi-geo-alt-fill"></i>

                  <span>{property.location}</span>
                </div>

                <div className="feature-item">
                  <i className="bi bi-buildings"></i>

                  <span>{property.city}</span>
                </div>

                <div className="feature-item">
                  <i className="bi bi-map"></i>

                  <span>{property.area}</span>
                </div>
              </div>
            </div>

            {/* =========================
                Contact Agent
            ========================= */}
            <button
              className="contact-agent-btn"
              onClick={() => setShowForm(true)}
            >
              <i className="bi bi-telephone me-2"></i>
              Contact Agent
            </button>

            {/* =========================
                Contact Form
            ========================= */}
            {showForm && (
              <div className="contact-form-box">
                <div className="contact-form-header">
                  <div>
                    <h3>Contact Agent</h3>

                    <p>Interested in this property?</p>
                  </div>

                  <button type="button" onClick={() => setShowForm(false)}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                <form>
                  <div className="form-group">
                    <label>Your Name</label>

                    <input type="text" placeholder="Enter your name" required />
                  </div>

                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>

                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>

                    <textarea
                      rows="3"
                      placeholder="I'm interested in this property..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-buttons">
                    <button type="submit">Send Enquiry</button>

                    <button type="button" onClick={() => setShowForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* =========================
            Property Information
        ========================= */}
        <div className="property-info-section">
          <h2>Property Information</h2>

          <div className="info-grid">
            <div>
              <span>Property ID</span>

              <strong>#{property._id}</strong>
            </div>

            <div>
              <span>Property Type</span>

              <strong>{property.propertyType}</strong>
            </div>

            <div>
              <span>Location</span>

              <strong>{property.location}</strong>
            </div>

            <div>
              <span>City</span>

              <strong>{property.city}</strong>
            </div>

            <div>
              <span>Area</span>

              <strong>{property.area}</strong>
            </div>

            <div>
              <span>Bedrooms</span>

              <strong>{property.bedrooms} BHK</strong>
            </div>

            <div>
              <span>Bathrooms</span>

              <strong>{property.bathrooms}</strong>
            </div>

            <div>
              <span>Area Size</span>

              <strong>{property.areaSize} sq.ft</strong>
            </div>

            <div>
              <span>Price</span>

              <strong>₹{Number(property.price).toLocaleString("en-IN")}</strong>
            </div>

            <div>
              <span>Status</span>

              <strong>{property.status}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;

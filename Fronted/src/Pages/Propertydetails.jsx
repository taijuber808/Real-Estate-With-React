import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API = "http://localhost:8080/api";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const [contactOpen, setContactOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // =========================
  // Get Property
  // =========================
  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await fetch(`${API}/properties/${id}`);
        const result = await response.json();

        if (response.ok && result.status) {
          setProperty(result.data);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log("Property error:", error);
      }
    };

    getProperty();
  }, [id]);

  // =========================
  // Wishlist
  // =========================
  const handleWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setWishlistLoading(true);

      const response = await fetch(`${API}/wishlist/${id}`, {
        method: "POST",
        headers: {
          token,
        },
      });

      const result = await response.json();

      if (response.ok && result.status) {
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
  // Open Contact Drawer
  // =========================
  const openContact = () => {
    const token = localStorage.getItem("token");

    console.log("CONTACT OWNER CLICKED");
    console.log("TOKEN:", token);

    if (!token) {
      alert("Please login first");
      return;
    }

    setContactOpen(true);
  };

  // =========================
  // Send Enquiry
  // =========================
  const handleEnquiry = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!message.trim()) {
      alert("Please enter your message");
      return;
    }

    if (!property?.owner) {
      alert("Owner information not available");
      return;
    }

    try {
      setSending(true);

      const response = await fetch(`${API}/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          owner: property.owner._id || property.owner,
          property: property._id,
          message: message.trim(),
        }),
      });

      const result = await response.json();

      console.log("Enquiry response:", result);

      if (response.ok && result.status) {
        alert("Enquiry sent successfully ❤️");

        setMessage("");
        setContactOpen(false);
      } else {
        alert(result.message || "Failed to send enquiry");
      }
    } catch (error) {
      console.log("Enquiry error:", error);
      alert("Unable to connect with server");
    } finally {
      setSending(false);
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
    <>
      <section className="property-details-page">
        <div className="container">
          {/* Top Navigation */}
          <div
            className="details-topbar"
            data-aos="fade-down"
            data-aos-duration="700"
          >
            <Link to="/properties" className="back-link">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Properties
            </Link>

            <button
              type="button"
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

          {/* Main Details */}
          <div className="details-wrapper">
            {/* Gallery */}
            <div
              className="details-gallery"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              <div className="main-property-image">
                <img src={images[selectedImage]} alt={property.title} />

                <button
                  type="button"
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

              {property.images?.length > 0 && (
                <div
                  className="property-thumbnails"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
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

            {/* Property Content */}
            <div
              className="details-content"
              data-aos="fade-left"
              data-aos-duration="900"
              data-aos-delay="150"
            >
              <span className="details-badge">{property.propertyType}</span>

              <h1 className="details-title">{property.title}</h1>

              <p className="details-location">
                <i className="bi bi-geo-alt-fill me-2"></i>
                {property.location}
                {property.city && `, ${property.city}`}
              </p>

              <div className="details-price">
                ₹{Number(property.price).toLocaleString("en-IN")}
              </div>

              {/* Basic Information */}
              <div className="details-basic-info">
                <div className="basic-item">
                  <i className="bi bi-door-open"></i>
                  <div>
                    <small>Bedrooms</small>
                    <strong>{property.bedrooms} BHK</strong>
                  </div>
                </div>

                <div className="basic-item">
                  <i className="bi bi-droplet"></i>
                  <div>
                    <small>Bathrooms</small>
                    <strong>{property.bathrooms}</strong>
                  </div>
                </div>

                <div className="basic-item">
                  <i className="bi bi-rulers"></i>
                  <div>
                    <small>Area</small>
                    <strong>{property.areaSize} sq.ft</strong>
                  </div>
                </div>

                <div className="basic-item">
                  <i className="bi bi-buildings"></i>
                  <div>
                    <small>Type</small>
                    <strong>{property.propertyType}</strong>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="about-property">
                <h3>About Property</h3>

                <p>
                  {property.description ||
                    "No description available for this property."}
                </p>
              </div>

              {/* Location */}
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

              {/* Contact Owner */}
              <button
                type="button"
                className="contact-agent-btn"
                onClick={openContact}
              >
                <i className="bi bi-person-lines-fill"></i>
                Contact Owner
              </button>
            </div>
          </div>

          {/* Property Information */}
          <div
            className="property-info-section"
            data-aos="fade-up"
            data-aos-duration="900"
          >
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
                <strong>
                  ₹{Number(property.price).toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{property.status}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Contact Overlay
      ========================= */}
      {contactOpen && (
        <div
          className="profile-overlay"
          onClick={() => setContactOpen(false)}
        ></div>
      )}

      {/* =========================
          Contact Drawer
      ========================= */}
      <div className={`profile-drawer ${contactOpen ? "open" : ""}`}>
        <div className="profile-drawer-header">
          <div>
            <h3>Contact Owner</h3>
            <small>{property.title}</small>
          </div>

          <button type="button" onClick={() => setContactOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="profile-drawer-content">
          {/* Property Info */}
          <div className="mb-4" data-aos="fade-left">
            <h5 className="fw-bold mb-1">{property.title}</h5>

            <p className="text-muted small mb-0">
              ₹{Number(property.price).toLocaleString("en-IN")} ·{" "}
              {property.location}
            </p>
          </div>

          {/* Enquiry Form */}
          <form onSubmit={handleEnquiry}>
            <div className="form-group">
              <label>Message</label>

              <textarea
                name="message"
                rows="6"
                placeholder="I am interested in this property."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="profile-update-btn"
              disabled={sending}
            >
              {sending ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Sending...
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>
                  Send Enquiry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;

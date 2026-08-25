import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
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

      const response = await fetch(`http://localhost:8080/api/wishlist/${id}`, {
        method: "POST",
        headers: {
          token,
        },
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
        <div
          className="details-topbar"
          data-aos="fade-down"
          data-aos-duration="700"
        >
          <Link to="/properties" className="back-link">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Properties
          </Link>

          {/* Wishlist */}
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

        {/* =========================
            Main Details
        ========================= */}
        <div className="details-wrapper">
          {/* =========================
              Gallery
          ========================= */}
          <div
            className="details-gallery"
            data-aos="fade-right"
            data-aos-duration="900"
          >
            {/* Main Image */}
            <div className="main-property-image">
              <img src={images[selectedImage]} alt={property.title} />

              {/* Wishlist */}
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

            {/* Thumbnails */}
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

          {/* =========================
              Property Content
          ========================= */}
          <div
            className="details-content"
            data-aos="fade-left"
            data-aos-duration="900"
            data-aos-delay="150"
          >
            {/* Property Type */}
            <span
              className="details-badge"
              data-aos="fade-down"
              data-aos-delay="250"
            >
              {property.propertyType}
            </span>

            {/* Title */}
            <h1
              className="details-title"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {property.title}
            </h1>

            {/* Location */}
            <p
              className="details-location"
              data-aos="fade-up"
              data-aos-delay="350"
            >
              <i className="bi bi-geo-alt-fill me-2"></i>

              {property.location}

              {property.city && `, ${property.city}`}
            </p>

            {/* Price */}
            <div
              className="details-price"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              ₹{Number(property.price).toLocaleString("en-IN")}
            </div>

            {/* =========================
                Basic Information
            ========================= */}
            <div
              className="details-basic-info"
              data-aos="fade-up"
              data-aos-delay="450"
            >
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
            <div
              className="about-property"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h3>About Property</h3>

              <p>
                {property.description ||
                  "No description available for this property."}
              </p>
            </div>

            {/* =========================
                Location
            ========================= */}
            <div
              className="property-features"
              data-aos="fade-up"
              data-aos-delay="550"
            >
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
          </div>
        </div>

        {/* =========================
            Property Information
        ========================= */}
        <div
          className="property-info-section"
          data-aos="fade-up"
          data-aos-duration="900"
          data-aos-delay="200"
        >
          <h2 data-aos="fade-up">Property Information</h2>

          <div className="info-grid">
            <div data-aos="fade-up" data-aos-delay="100">
              <span>Property ID</span>
              <strong>#{property._id}</strong>
            </div>

            <div data-aos="fade-up" data-aos-delay="150">
              <span>Property Type</span>
              <strong>{property.propertyType}</strong>
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              <span>Location</span>
              <strong>{property.location}</strong>
            </div>

            <div data-aos="fade-up" data-aos-delay="250">
              <span>City</span>
              <strong>{property.city}</strong>
            </div>

            <div data-aos="fade-up" data-aos-delay="300">
              <span>Area</span>
              <strong>{property.area}</strong>
            </div>

            <div data-aos="fade-up" data-aos-delay="350">
              <span>Bedrooms</span>
              <strong>{property.bedrooms} BHK</strong>
            </div>

            <div data-aos="fade-up" data-aos-delay="400">
              <span>Bathrooms</span>
              <strong>{property.bathrooms}</strong>
            </div>

            <div data-aos="fade-up" data-aos-delay="450">
              <span>Area Size</span>
              <strong>{property.areaSize} sq.ft</strong>
            </div>

            <div data-aos="fade-up" data-aos-delay="500">
              <span>Price</span>
              <strong>₹{Number(property.price).toLocaleString("en-IN")}</strong>
            </div>

            <div data-aos="fade-up" data-aos-delay="550">
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

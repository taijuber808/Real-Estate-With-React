import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../Component/Hero";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch Properties
  // =========================
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:8080/api/properties");

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to fetch properties");
        }

        setProperties(result.data || []);
      } catch (error) {
        console.error("Property fetch error:", error);
        setError("Unable to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // =========================
  // Property Categories
  // =========================
  const categories = [
    {
      title: "Apartments",
      icon: "bi-buildings",
      text: "Modern apartments for comfortable city living.",
      search: "apartment",
    },
    {
      title: "Villas",
      icon: "bi-house-heart",
      text: "Spacious villas designed for premium living.",
      search: "villa",
    },
    {
      title: "Houses",
      icon: "bi-house-door",
      text: "Beautiful houses for you and your family.",
      search: "house",
    },
    {
      title: "Luxury Homes",
      icon: "bi-gem",
      text: "Premium properties for an elevated lifestyle.",
      search: "",
    },
  ];

  return (
    <>
      {/* =========================
          HERO
      ========================= */}
      <Hero />

      {/* =========================
          TRUST FEATURES
      ========================= */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-4" data-aos="fade-up">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "58px",
                    height: "58px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-award fs-4"></i>
                </div>

                <div className="text-start">
                  <h6 className="fw-bold mb-1">Best Price Guarantee</h6>

                  <p className="text-muted small mb-0">
                    Great properties at competitive prices.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="150">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "58px",
                    height: "58px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-shield-check fs-4"></i>
                </div>

                <div className="text-start">
                  <h6 className="fw-bold mb-1">Trusted Properties</h6>

                  <p className="text-muted small mb-0">
                    Find properties from trusted owners.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "58px",
                    height: "58px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-buildings fs-4"></i>
                </div>

                <div className="text-start">
                  <h6 className="fw-bold mb-1">Wide Range of Properties</h6>

                  <p className="text-muted small mb-0">
                    Apartments, houses, villas and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FEATURED PROPERTIES
      ========================= */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <p
              className="text-uppercase fw-semibold mb-2"
              style={{
                color: "#d4a017",
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              Explore Properties
            </p>

            <h2 className="fw-bold mb-3">Featured Properties</h2>

            <p className="text-muted">
              Discover some of our latest properties.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-5">
              <div
                className="spinner-border"
                style={{ color: "#d4a017" }}
              ></div>

              <h5 className="mt-3">Loading properties...</h5>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {/* Property Cards */}
          {!loading && !error && properties.length > 0 && (
            <div className="row g-4">
              {properties.slice(0, 4).map((property, index) => (
                <div
                  key={property._id}
                  className="col-lg-3 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="property-card h-100">
                    {/* Image */}
                    <div className="property-image">
                      <img
                        src={property.images?.[0] || "/default-property.jpg"}
                        alt={property.title}
                      />

                      <span className="property-badge">
                        {property.status === "sold" ? "Sold" : "For Sale"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="property-content">
                      <h5 className="property-title">{property.title}</h5>

                      <p className="property-location">
                        <i className="bi bi-geo-alt-fill"></i>{" "}
                        {property.location}
                        {property.city && `, ${property.city}`}
                      </p>

                      <div className="property-info">
                        <span>
                          <i className="bi bi-door-open"></i>{" "}
                          {property.bedrooms} BHK
                        </span>

                        <span>
                          <i className="bi bi-rulers"></i> {property.areaSize}{" "}
                          sq.ft
                        </span>
                      </div>

                      <div className="property-bottom">
                        <div className="property-price">
                          <small>Price</small>

                          <h6>
                            ₹{Number(property.price).toLocaleString("en-IN")}
                          </h6>
                        </div>

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
              ))}
            </div>
          )}

          {/* No Properties */}
          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-5">
              <i
                className="bi bi-house-x"
                style={{
                  fontSize: "45px",
                  color: "#d4a017",
                }}
              ></i>

              <h5 className="mt-3">No properties available</h5>
            </div>
          )}

          {/* View All */}
          <div className="text-center mt-5" data-aos="fade-up">
            <Link
              to="/properties"
              className="btn px-4 py-2"
              style={{
                background: "#061326",
                color: "white",
              }}
            >
              View All Properties
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          POPULAR LOCATIONS
      ========================= */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <p
              className="text-uppercase fw-semibold mb-2"
              style={{
                color: "#d4a017",
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              Explore Cities
            </p>

            <h2 className="fw-bold mb-3">Popular Locations</h2>

            <p className="text-muted">
              Find your dream home in Gujarat's popular cities.
            </p>
          </div>

          <div className="row g-4">
            {/* Ahmedabad */}
            <div
              className="col-lg-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div
                className="position-relative overflow-hidden rounded-4 shadow-sm"
                style={{ height: "300px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80"
                  alt="Ahmedabad"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />

                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                  style={{
                    background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
                  }}
                >
                  <h4 className="fw-bold mb-1">Ahmedabad</h4>

                  <p className="small mb-3">
                    Modern homes and premium properties
                  </p>

                  <Link
                    to="/properties?search=Ahmedabad"
                    className="btn btn-sm text-white"
                    style={{
                      background: "#d4a017",
                      border: "none",
                      padding: "8px 18px",
                    }}
                  >
                    Explore Properties
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Surat */}
            <div
              className="col-lg-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div
                className="position-relative overflow-hidden rounded-4 shadow-sm"
                style={{ height: "300px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                  alt="Surat"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />

                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                  style={{
                    background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
                  }}
                >
                  <h4 className="fw-bold mb-1">Surat</h4>

                  <p className="small mb-3">
                    Beautiful homes in a growing city
                  </p>

                  <Link
                    to="/properties?search=Surat"
                    className="btn btn-sm text-white"
                    style={{
                      background: "#d4a017",
                      border: "none",
                      padding: "8px 18px",
                    }}
                  >
                    Explore Properties
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Vadodara */}
            <div
              className="col-lg-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div
                className="position-relative overflow-hidden rounded-4 shadow-sm"
                style={{ height: "300px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
                  alt="Vadodara"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />

                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                  style={{
                    background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
                  }}
                >
                  <h4 className="fw-bold mb-1">Vadodara</h4>

                  <p className="small mb-3">
                    Comfortable homes for modern living
                  </p>

                  <Link
                    to="/properties?search=Vadodara"
                    className="btn btn-sm text-white"
                    style={{
                      background: "#d4a017",
                      border: "none",
                      padding: "8px 18px",
                    }}
                  >
                    Explore Properties
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Gandhinagar */}
            <div
              className="col-lg-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div
                className="position-relative overflow-hidden rounded-4 shadow-sm"
                style={{ height: "300px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"
                  alt="Gandhinagar"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />

                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                  style={{
                    background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
                  }}
                >
                  <h4 className="fw-bold mb-1">Gandhinagar</h4>

                  <p className="small mb-3">Peaceful residential properties</p>

                  <Link
                    to="/properties?search=Gandhinagar"
                    className="btn btn-sm text-white"
                    style={{
                      background: "#d4a017",
                      border: "none",
                      padding: "8px 18px",
                    }}
                  >
                    Explore Properties
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          WHY CHOOSE US
      ========================= */}
      <section
        className="py-5"
        style={{
          background: "#061326",
          color: "white",
        }}
      >
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <p
              className="text-uppercase fw-semibold mb-2"
              style={{
                color: "#d4a017",
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              Why DreamEstate
            </p>

            <h2 className="fw-bold">Why Choose Us?</h2>

            <p className="text-white-50">
              Everything you need to find the right property.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: "bi-search",
                title: "Easy Property Search",
                text: "Search and explore properties easily according to your needs.",
              },
              {
                icon: "bi-shield-check",
                title: "Trusted Listings",
                text: "Explore properties listed by registered property owners.",
              },
              {
                icon: "bi-house-heart",
                title: "Find Your Dream Home",
                text: "Choose from apartments, houses, villas and premium homes.",
              },
              {
                icon: "bi-person-check",
                title: "Simple Experience",
                text: "A clean and simple platform designed for every user.",
              },
            ].map((item, index) => (
              <div
                className="col-lg-3 col-md-6"
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div
                  className="text-center p-4 rounded-4 h-100"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "65px",
                      height: "65px",
                      background: "#d4a017",
                      color: "#061326",
                    }}
                  >
                    <i className={`bi ${item.icon} fs-3`}></i>
                  </div>

                  <h5 className="fw-bold">{item.title}</h5>

                  <p className="text-white-50 small mb-0">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          PROPERTY CATEGORIES
      ========================= */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <p
              className="text-uppercase fw-semibold mb-2"
              style={{
                color: "#d4a017",
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              Property Types
            </p>

            <h2 className="fw-bold mb-3">Find What Fits Your Lifestyle</h2>

            <p className="text-muted">
              Explore properties based on your preferred property type.
            </p>
          </div>

          <div className="row g-4">
            {/* =========================
          APARTMENT
      ========================= */}
            <div
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-white rounded-4 shadow-sm text-center p-4 h-100">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-buildings fs-2"></i>
                </div>

                <h5 className="fw-bold">Apartments</h5>

                <p className="text-muted small">
                  Modern apartments for comfortable city living.
                </p>

                <Link
                  to="/properties?propertyType=apartment"
                  className="btn btn-sm text-white"
                  style={{
                    background: "#d4a017",
                    border: "none",
                    padding: "8px 18px",
                  }}
                >
                  Explore Properties
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>

            {/* =========================
          VILLA
      ========================= */}
            <div
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-white rounded-4 shadow-sm text-center p-4 h-100">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-house-heart fs-2"></i>
                </div>

                <h5 className="fw-bold">Villas</h5>

                <p className="text-muted small">
                  Spacious villas designed for premium living.
                </p>

                <Link
                  to="/properties?propertyType=villa"
                  className="btn btn-sm text-white"
                  style={{
                    background: "#d4a017",
                    border: "none",
                    padding: "8px 18px",
                  }}
                >
                  Explore Properties
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>

            {/* =========================
          HOUSE
      ========================= */}
            <div
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-white rounded-4 shadow-sm text-center p-4 h-100">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-house-door fs-2"></i>
                </div>

                <h5 className="fw-bold">Houses</h5>

                <p className="text-muted small">
                  Beautiful houses for you and your family.
                </p>

                <Link
                  to="/properties?propertyType=house"
                  className="btn btn-sm text-white"
                  style={{
                    background: "#d4a017",
                    border: "none",
                    padding: "8px 18px",
                  }}
                >
                  Explore Properties
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>

            {/* =========================
          LUXURY HOUSE
      ========================= */}
            <div
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="bg-white rounded-4 shadow-sm text-center p-4 h-100">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-gem fs-2"></i>
                </div>

                <h5 className="fw-bold">Luxury Houses</h5>

                <p className="text-muted small">
                  Premium homes for an elevated lifestyle.
                </p>

                <Link
                  to="/properties?propertyType=luxury-house"
                  className="btn btn-sm text-white"
                  style={{
                    background: "#d4a017",
                    border: "none",
                    padding: "8px 18px",
                  }}
                >
                  Explore Properties
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          STATS
      ========================= */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-3" data-aos="fade-up">
              <h2 className="fw-bold" style={{ color: "#d4a017" }}>
                500+
              </h2>

              <p className="text-muted mb-0">Properties Listed</p>
            </div>

            <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
              <h2 className="fw-bold" style={{ color: "#d4a017" }}>
                50+
              </h2>

              <p className="text-muted mb-0">Locations</p>
            </div>

            <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
              <h2 className="fw-bold" style={{ color: "#d4a017" }}>
                10K+
              </h2>

              <p className="text-muted mb-0">Happy Customers</p>
            </div>

            <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
              <h2 className="fw-bold" style={{ color: "#d4a017" }}>
                4.9/5
              </h2>

              <p className="text-muted mb-0">User Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}
      <section
        className="py-5"
        style={{
          background: "#d4a017",
        }}
      >
        <div className="container">
          <div className="text-center text-dark py-4" data-aos="zoom-in">
            <i className="bi bi-house-heart fs-1"></i>

            <h2 className="fw-bold mt-3">Ready to Find Your Dream Home?</h2>

            <p className="mb-4">
              Explore our properties and discover a place that feels like home.
            </p>

            <Link
              to="/properties"
              className="btn px-4 py-2"
              style={{
                background: "#061326",
                color: "white",
              }}
            >
              Explore Properties
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

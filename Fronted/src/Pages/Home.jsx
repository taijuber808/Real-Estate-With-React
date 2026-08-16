import { Link } from "react-router-dom";
import Hero from "../Component/Hero";
import { useEffect, useState } from "react";

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
      })
      .catch((error) => {
        console.log("Error fetching properties:", error);
      });
  }, []);

  return (
    <>
      <Hero />

      <section className="py-4 bg-white mt-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-award fs-4"></i>
                </div>

                <div className="text-start">
                  <h6 className="fw-bold mb-1">Best Price Guarantee</h6>

                  <p className="text-muted small mb-0">
                    We ensure the best prices for our properties.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-people fs-4"></i>
                </div>

                <div className="text-start">
                  <h6 className="fw-bold mb-1">Trusted by Thousands</h6>

                  <p className="text-muted small mb-0">
                    More than 10,000+ happy customers trust us.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-buildings fs-4"></i>
                </div>

                <div className="text-start">
                  <h6 className="fw-bold mb-1">Wide Range of Properties</h6>

                  <p className="text-muted small mb-0">
                    From apartments to villas, we have it all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              Our Properties
            </p>

            <h2 className="fw-bold mb-3">Featured Properties</h2>

            <p className="text-muted mb-0">
              Explore our handpicked properties and find your perfect home.
            </p>
          </div>

          {/* Cards */}

          <div className="row">
            {properties.slice(0, 4).map((property) => (
              <div key={property.id} className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  {/* Image */}

                  <img
                    src={property.image}
                    alt={property.title}
                    className="card-img-top"
                    style={{
                      height: "210px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Card Body */}

                  <div className="card-body">
                    <h5 className="fw-bold mb-2">{property.title}</h5>

                    <p className="text-muted small mb-3">
                      <i className="bi bi-geo-alt"></i> {property.location}
                    </p>

                    <div className="d-flex justify-content-between text-muted small mb-3">
                      <span>
                        <i className="bi bi-door-open"></i> {property.bedrooms}{" "}
                        BHK
                      </span>

                      <span>
                        <i className="bi bi-rulers"></i> {property.area} sq.ft
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <h5
                        className="mb-0 fw-bold"
                        style={{
                          color: "#d4a017",
                        }}
                      >
                        {property.price}
                      </h5>

                      <button className="btn btn-dark btn-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}

          <div className="text-center mt-3">
            <a
              href="/properties"
              className="btn"
              style={{
                background: "#061326",
                color: "white",
                padding: "10px 25px",
              }}
            >
              View All Properties
            </a>
          </div>
        </div>
      </section>

      {/* ================= POPULAR LOCATIONS ================= */}

      <section className="py-5" style={{ background: "#f8f9fa" }}>
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
              Explore Areas
            </p>

            <h2 className="fw-bold mb-3">Popular Locations</h2>

            <p className="text-muted">
              Discover properties in some of the most desirable locations.
            </p>
          </div>

          <div className="row g-4">
            {/* Ahmedabad */}
            <div className="col-lg-4 col-md-6">
              <div
                className="position-relative overflow-hidden rounded shadow-sm"
                style={{ height: "250px" }}
              >
                <img
                  src="https://i.natgeofe.com/n/827f878f-609d-4bcb-ba40-6be366d78ab8/mosque-ahmedabad-city-india.jpg"
                  alt="Ahmedabad"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />

                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4"
                  style={{
                    background:
                      "linear-gradient(transparent, rgba(0,0,0,0.85))",
                    color: "white",
                  }}
                >
                  <h4 className="fw-bold mb-1">Ahmedabad</h4>
                  <p className="mb-0">120+ Properties</p>
                </div>
              </div>
            </div>

            {/* Mumbai */}
            <div className="col-lg-4 col-md-6">
              <div
                className="position-relative overflow-hidden rounded shadow-sm"
                style={{ height: "250px" }}
              >
                <img
                  src="https://as1.ftcdn.net/v2/jpg/03/55/64/04/1000_F_355640480_FKKv2BQwqY6sMa6jmEGVPnEndX1GPtJU.jpg"
                  alt="Mumbai"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />

                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4"
                  style={{
                    background:
                      "linear-gradient(transparent, rgba(0,0,0,0.85))",
                    color: "white",
                  }}
                >
                  <h4 className="fw-bold mb-1">Mumbai</h4>
                  <p className="mb-0">95+ Properties</p>
                </div>
              </div>
            </div>

            {/* Bangalore */}
            <div className="col-lg-4 col-md-6">
              <div
                className="position-relative overflow-hidden rounded shadow-sm"
                style={{ height: "250px" }}
              >
                <img
                  src="https://www.agoda.com/wp-content/uploads/2024/07/bangalore-feature.jpg"
                  alt="Bangalore"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />

                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4"
                  style={{
                    background:
                      "linear-gradient(transparent, rgba(0,0,0,0.85))",
                    color: "white",
                  }}
                >
                  <h4 className="fw-bold mb-1">Bangalore</h4>
                  <p className="mb-0">80+ Properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE DREAMESTATE ================= */}

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
              Why DreamEstate
            </p>

            <h2 className="fw-bold mb-3">Why Choose DreamEstate?</h2>

            <p className="text-muted">
              We make finding your dream property simple, secure and
              stress-free.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="text-center p-4 h-100">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-shield-check fs-2"></i>
                </div>

                <h5 className="fw-bold">Trusted Platform</h5>

                <p className="text-muted small">
                  Verified properties and trusted listings for complete peace of
                  mind.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="text-center p-4 h-100">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-search fs-2"></i>
                </div>

                <h5 className="fw-bold">Easy Search</h5>

                <p className="text-muted small">
                  Find properties quickly using location, price and property
                  type.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="text-center p-4 h-100">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-headset fs-2"></i>
                </div>

                <h5 className="fw-bold">Expert Support</h5>

                <p className="text-muted small">
                  Our team is always ready to help you make the right decision.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="text-center p-4 h-100">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-house-heart fs-2"></i>
                </div>

                <h5 className="fw-bold">Perfect Homes</h5>

                <p className="text-muted small">
                  From modern apartments to luxury villas, find a home you love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section
        className="py-5"
        style={{
          background: "#061326",
          color: "white",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <p
                className="text-uppercase fw-semibold mb-2"
                style={{
                  color: "#d4a017",
                  letterSpacing: "2px",
                  fontSize: "13px",
                }}
              >
                Find Your Dream Home
              </p>

              <h2 className="fw-bold mb-3">
                Ready to Find Your Perfect Property?
              </h2>

              <p className="text-white-50 mb-lg-0">
                Explore our latest properties and take the first step towards
                your dream home.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <Link
                to="/properties"
                className="btn me-2"
                style={{
                  background: "#d4a017",
                  color: "#061326",
                  padding: "12px 25px",
                  fontWeight: "600",
                }}
              >
                Explore Properties
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline-light"
                style={{
                  padding: "11px 25px",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

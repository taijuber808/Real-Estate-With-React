import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      {/* =========================
          ABOUT HERO
      ========================= */}
      <section
        className="py-5"
        style={{
          background: "#061326",
          color: "white",
        }}
      >
        <div className="container py-5">
          <div className="text-center" data-aos="fade-up">
            <p
              className="text-uppercase fw-semibold mb-2"
              style={{
                color: "#d4a017",
                letterSpacing: "2px",
                fontSize: "13px",
              }}
            >
              About Us
            </p>

            <h1 className="fw-bold mb-3">Welcome to DreamEstate</h1>

            <p
              className="text-white-50 mx-auto mb-0"
              style={{ maxWidth: "650px" }}
            >
              Your trusted platform for discovering properties and finding a
              place you can truly call home.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          ABOUT CONTENT
      ========================= */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Image */}
            <div className="col-lg-6" data-aos="fade-right">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                  alt="DreamEstate Property"
                  className="img-fluid rounded-4 shadow"
                  style={{
                    width: "100%",
                    height: "420px",
                    objectFit: "cover",
                  }}
                />

                {/* Small Badge */}
                <div
                  className="position-absolute bottom-0 start-0 m-4 px-4 py-3 rounded-3 shadow"
                  style={{
                    background: "#061326",
                    color: "white",
                  }}
                >
                  <h5 className="fw-bold mb-0">DreamEstate</h5>
                  <small className="text-white-50">Find. Choose. Live.</small>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="col-lg-6" data-aos="fade-left">
              <p
                className="text-uppercase fw-semibold mb-2"
                style={{
                  color: "#d4a017",
                  letterSpacing: "2px",
                  fontSize: "13px",
                }}
              >
                Who We Are
              </p>

              <h2 className="fw-bold mb-4">Find Your Dream Home With Us</h2>

              <p className="text-muted">
                DreamEstate provides a wide range of properties including
                apartments, houses, villas and luxury homes.
              </p>

              <p className="text-muted">
                Our goal is to make property searching simple, transparent and
                convenient for everyone. Explore different properties, compare
                your options and find the home that fits your lifestyle.
              </p>

              {/* Stats */}
              <div className="row mt-4 g-3">
                <div className="col-6" data-aos="fade-up" data-aos-delay="100">
                  <div className="bg-white rounded-3 shadow-sm p-3">
                    <h3 className="fw-bold mb-1" style={{ color: "#d4a017" }}>
                      10K+
                    </h3>

                    <p className="text-muted mb-0 small">Happy Customers</p>
                  </div>
                </div>

                <div className="col-6" data-aos="fade-up" data-aos-delay="200">
                  <div className="bg-white rounded-3 shadow-sm p-3">
                    <h3 className="fw-bold mb-1" style={{ color: "#d4a017" }}>
                      500+
                    </h3>

                    <p className="text-muted mb-0 small">Properties</p>
                  </div>
                </div>
              </div>

              <Link
                to="/properties"
                className="btn mt-4 px-4 py-2"
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
        </div>
      </section>

      {/* =========================
          OUR MISSION
      ========================= */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <p
              className="text-uppercase fw-semibold mb-2"
              style={{
                color: "#d4a017",
                letterSpacing: "2px",
                fontSize: "13px",
              }}
            >
              Our Purpose
            </p>

            <h2 className="fw-bold">What We Believe In</h2>

            <p className="text-muted">
              Making the property search experience simple and enjoyable.
            </p>
          </div>

          <div className="row g-4">
            {/* Mission */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="text-center p-4 rounded-4 shadow-sm h-100">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "65px",
                    height: "65px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-bullseye fs-3"></i>
                </div>

                <h5 className="fw-bold">Our Mission</h5>

                <p className="text-muted small mb-0">
                  To make finding the right property easier, faster and more
                  convenient.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="text-center p-4 rounded-4 shadow-sm h-100">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "65px",
                    height: "65px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-eye fs-3"></i>
                </div>

                <h5 className="fw-bold">Our Vision</h5>

                <p className="text-muted small mb-0">
                  To create a simple and trusted platform for modern property
                  discovery.
                </p>
              </div>
            </div>

            {/* Trust */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="text-center p-4 rounded-4 shadow-sm h-100">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "65px",
                    height: "65px",
                    background: "#061326",
                    color: "#d4a017",
                  }}
                >
                  <i className="bi bi-shield-check fs-3"></i>
                </div>

                <h5 className="fw-bold">Trust & Simplicity</h5>

                <p className="text-muted small mb-0">
                  We focus on providing a clean, transparent and easy-to-use
                  experience.
                </p>
              </div>
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
        <div className="container text-center py-4" data-aos="zoom-in">
          <i className="bi bi-house-heart fs-1 text-dark"></i>

          <h2 className="fw-bold mt-3 text-dark">
            Ready to Find Your Dream Home?
          </h2>

          <p className="text-dark mb-4">
            Explore our properties and discover your perfect place.
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
      </section>
    </>
  );
};

export default About;

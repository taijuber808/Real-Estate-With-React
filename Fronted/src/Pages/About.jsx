const About = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
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

          <h2 className="fw-bold">Welcome to DreamEstate</h2>

          <p className="text-muted">
            Your trusted partner for finding the perfect property.
          </p>
        </div>

        <div className="row align-items-center">

          <div className="col-md-6 mb-4">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="DreamEstate"
              className="img-fluid rounded shadow"
              style={{
                height: "350px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-md-6">
            <h3 className="fw-bold mb-3">
              Find Your Dream Home With Us
            </h3>

            <p className="text-muted">
              DreamEstate provides a wide range of properties including
              apartments, houses and luxury villas.
            </p>

            <p className="text-muted">
              Our goal is to make property searching simple, transparent
              and convenient for everyone.
            </p>

            <div className="row mt-4">

              <div className="col-6">
                <h4
                  className="fw-bold"
                  style={{ color: "#d4a017" }}
                >
                  10K+
                </h4>
                <p className="text-muted">Happy Customers</p>
              </div>

              <div className="col-6">
                <h4
                  className="fw-bold"
                  style={{ color: "#d4a017" }}
                >
                  500+
                </h4>
                <p className="text-muted">Properties</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
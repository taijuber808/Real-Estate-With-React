const Footer = () => {
  return (
    <footer
      style={{
        background: "#061326",
        color: "white",
      }}
      className="pt-5 pb-3"
    >
      <div className="container">

        <div className="row">

          <div className="col-md-5 mb-4">

            <h4 className="fw-bold">
              🏠 Dream<span style={{ color: "#d4a017" }}>
                Estate
              </span>
            </h4>

            <p className="text-light opacity-75 mt-3">
              Find your perfect home with DreamEstate.
              Explore premium houses, apartments and villas.
            </p>

          </div>

          <div className="col-md-3 mb-4">

            <h6 className="fw-bold mb-3">Quick Links</h6>

            <p className="mb-2">
              <a
                href="/"
                className="text-light text-decoration-none"
              >
                Home
              </a>
            </p>

            <p className="mb-2">
              <a
                href="/properties"
                className="text-light text-decoration-none"
              >
                Properties
              </a>
            </p>

            <p className="mb-2">
              <a
                href="/about"
                className="text-light text-decoration-none"
              >
                About
              </a>
            </p>

            <p className="mb-0">
              <a
                href="/contact"
                className="text-light text-decoration-none"
              >
                Contact
              </a>
            </p>

          </div>

          <div className="col-md-4 mb-4">

            <h6 className="fw-bold mb-3">Contact</h6>

            <p className="mb-2">
              <i className="bi bi-geo-alt me-2"></i>
              Ahmedabad, Gujarat
            </p>

            <p className="mb-2">
              <i className="bi bi-envelope me-2"></i>
              info@dreamestate.com
            </p>

            <p className="mb-0">
              <i className="bi bi-telephone me-2"></i>
              +91 98765 43210
            </p>

          </div>

        </div>

        <hr className="border-light opacity-25" />

        <div className="text-center">
          <p className="mb-0 small opacity-75">
            © 2026 DreamEstate. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
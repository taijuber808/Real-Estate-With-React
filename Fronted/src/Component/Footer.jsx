import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  // =========================
  // Show / Hide Top Button
  // =========================
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================
  // Go To Top
  // =========================
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      style={{
        background: "#061326",
        color: "white",
      }}
    >
      {/* =========================
          TOP FOOTER
      ========================= */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up">
            <h3 className="fw-bold mb-3">
              Dream<span style={{ color: "#d4a017" }}>Estate</span>
            </h3>

            <p className="text-white-50" style={{ maxWidth: "380px" }}>
              Find your dream home with DreamEstate. Explore apartments, houses,
              villas and luxury properties in popular locations.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-2 mt-4">
              <a href="#" className="footer-social" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#" className="footer-social" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#" className="footer-social" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#" className="footer-social" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="col-lg-2 col-md-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h5 className="fw-bold mb-4">Quick Links</h5>

            <ul className="list-unstyled">
              <li className="mb-3">
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>

              <li className="mb-3">
                <Link to="/properties" className="footer-link">
                  Properties
                </Link>
              </li>

              <li className="mb-3">
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>

              <li className="mb-3">
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div
            className="col-lg-3 col-md-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h5 className="fw-bold mb-4">Property Types</h5>

            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  to="/properties?propertyType=apartment"
                  className="footer-link"
                >
                  <i className="bi bi-chevron-right me-2"></i>
                  Apartments
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/properties?propertyType=villa"
                  className="footer-link"
                >
                  <i className="bi bi-chevron-right me-2"></i>
                  Villas
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/properties?propertyType=house"
                  className="footer-link"
                >
                  <i className="bi bi-chevron-right me-2"></i>
                  Houses
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/properties?propertyType=luxury-house"
                  className="footer-link"
                >
                  <i className="bi bi-chevron-right me-2"></i>
                  Luxury Houses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div
            className="col-lg-3 col-md-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h5 className="fw-bold mb-4">Get In Touch</h5>

            <div className="d-flex gap-3 mb-3">
              <i
                className="bi bi-geo-alt-fill"
                style={{ color: "#d4a017" }}
              ></i>

              <span className="text-white-50">Ahmedabad, Gujarat, India</span>
            </div>

            <div className="d-flex gap-3 mb-3">
              <i
                className="bi bi-telephone-fill"
                style={{ color: "#d4a017" }}
              ></i>

              <span className="text-white-50">+91 98765 43210</span>
            </div>

            <div className="d-flex gap-3 mb-3">
              <i
                className="bi bi-envelope-fill"
                style={{ color: "#d4a017" }}
              ></i>

              <span className="text-white-50">info@dreamestate.com</span>
            </div>

            <div className="d-flex gap-3">
              <i className="bi bi-clock-fill" style={{ color: "#d4a017" }}></i>

              <span className="text-white-50">Mon - Sat: 9 AM - 7 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          BOTTOM FOOTER
      ========================= */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="text-white-50 small mb-0">
                © {new Date().getFullYear()} DreamEstate. All rights reserved.
              </p>
            </div>

            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <Link
                to="/properties"
                className="text-decoration-none small"
                style={{ color: "#d4a017" }}
              >
                Find Your Dream Home
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          GO TO TOP BUTTON
      ========================= */}
      {showTopButton && (
        <button
          type="button"
          className="go-to-top"
          onClick={scrollToTop}
          aria-label="Go to top"
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}

      {/* =========================
          FOOTER CSS
      ========================= */}
      <style>
        {`
          .footer-link {
            color: rgba(255,255,255,0.65);
            text-decoration: none;
            transition: 0.3s;
          }

          .footer-link:hover {
            color: #d4a017;
            padding-left: 4px;
          }

          .footer-social {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            background: rgba(255,255,255,0.08);
            text-decoration: none;
            transition: 0.3s;
          }

          .footer-social:hover {
            background: #d4a017;
            color: #061326;
            transform: translateY(-3px);
          }

          /* =========================
             GO TO TOP
          ========================= */
          .go-to-top {
            position: fixed;
            right: 25px;
            bottom: 25px;
            width: 48px;
            height: 48px;
            border: none;
            border-radius: 50%;
            background: #d4a017;
            color: #061326;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 6px 20px rgba(0,0,0,0.25);
            transition: all 0.3s ease;
          }

          .go-to-top:hover {
            background: #061326;
            color: #d4a017;
            transform: translateY(-5px);
          }

          .go-to-top i {
            line-height: 1;
          }

          @media (max-width: 576px) {
            .go-to-top {
              right: 15px;
              bottom: 15px;
              width: 44px;
              height: 44px;
              font-size: 18px;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;

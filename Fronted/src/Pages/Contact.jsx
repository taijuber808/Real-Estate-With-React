import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      {/* =========================
          CONTACT HERO
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
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              Get In Touch
            </p>

            <h1 className="fw-bold mb-3">Contact DreamEstate</h1>

            <p className="text-white-50 mx-auto" style={{ maxWidth: "650px" }}>
              Have questions about a property? Our team is here to help you find
              the right home.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          CONTACT INFO + FORM
      ========================= */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {/* =========================
                CONTACT INFORMATION
            ========================= */}
            <div className="col-lg-5" data-aos="fade-right">
              <div className="h-100">
                <p
                  className="text-uppercase fw-semibold mb-2"
                  style={{
                    color: "#d4a017",
                    fontSize: "13px",
                    letterSpacing: "2px",
                  }}
                >
                  Contact Information
                </p>

                <h2 className="fw-bold mb-3">Let's Talk About Your Property</h2>

                <p className="text-muted mb-4">
                  Whether you are looking for a new home or want to know more
                  about our properties, feel free to contact us.
                </p>

                {/* Address */}
                <div className="d-flex gap-3 mb-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "#061326",
                      color: "#d4a017",
                    }}
                  >
                    <i className="bi bi-geo-alt-fill fs-5"></i>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">Our Office</h6>

                    <p className="text-muted mb-0">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="d-flex gap-3 mb-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "#061326",
                      color: "#d4a017",
                    }}
                  >
                    <i className="bi bi-telephone-fill fs-5"></i>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">Phone</h6>

                    <p className="text-muted mb-0">+91 98765 43210</p>
                  </div>
                </div>

                {/* Email */}
                <div className="d-flex gap-3 mb-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "#061326",
                      color: "#d4a017",
                    }}
                  >
                    <i className="bi bi-envelope-fill fs-5"></i>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>

                    <p className="text-muted mb-0">info@dreamestate.com</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="d-flex gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "#061326",
                      color: "#d4a017",
                    }}
                  >
                    <i className="bi bi-clock-fill fs-5"></i>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">Working Hours</h6>

                    <p className="text-muted mb-0">
                      Monday - Saturday: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================
                CONTACT FORM
            ========================= */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
                <p
                  className="text-uppercase fw-semibold mb-2"
                  style={{
                    color: "#d4a017",
                    fontSize: "13px",
                    letterSpacing: "2px",
                  }}
                >
                  Send Us A Message
                </p>

                <h3 className="fw-bold mb-4">How Can We Help You?</h3>

                <form>
                  <div className="row g-3">
                    {/* Name */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Full Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Email Address
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter your phone"
                      />
                    </div>

                    {/* Subject */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Subject</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Property enquiry"
                      />
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">Message</label>

                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Write your message..."
                      ></textarea>
                    </div>

                    {/* Button */}
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn px-4 py-2 text-white"
                        style={{
                          background: "#061326",
                        }}
                      >
                        Send Message
                        <i className="bi bi-send ms-2"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          WHY CONTACT US
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
              Why Contact Us
            </p>

            <h2 className="fw-bold">We're Here To Help</h2>

            <p className="text-muted">
              Get the support you need throughout your property journey.
            </p>
          </div>

          <div className="row g-4">
            {/* Card 1 */}
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
                  <i className="bi bi-chat-dots fs-3"></i>
                </div>

                <h5 className="fw-bold">Quick Response</h5>

                <p className="text-muted small mb-0">
                  Our team is ready to answer your property questions.
                </p>
              </div>
            </div>

            {/* Card 2 */}
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
                  <i className="bi bi-house-heart fs-3"></i>
                </div>

                <h5 className="fw-bold">Property Guidance</h5>

                <p className="text-muted small mb-0">
                  Get useful guidance to choose a property that fits you.
                </p>
              </div>
            </div>

            {/* Card 3 */}
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

                <h5 className="fw-bold">Trusted Service</h5>

                <p className="text-muted small mb-0">
                  We aim to provide a simple and reliable property experience.
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
            Looking For Your Dream Home?
          </h2>

          <p className="text-dark mb-4">
            Explore our properties and find a place that feels like home.
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

export default Contact;

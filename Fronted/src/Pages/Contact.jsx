const Contact = () => {
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
            Contact Us
          </p>

          <h2 className="fw-bold">Get In Touch</h2>

          <p className="text-muted">
            Have a question? We would love to hear from you.
          </p>
        </div>

        <div className="row justify-content-center">

          <div className="col-md-5 mb-4">

            <div className="card border-0 shadow-sm p-4">

              <h4 className="fw-bold mb-4">Contact Information</h4>

              <p>
                <i
                  className="bi bi-geo-alt me-2"
                  style={{ color: "#d4a017" }}
                ></i>
                Ahmedabad, Gujarat
              </p>

              <p>
                <i
                  className="bi bi-telephone me-2"
                  style={{ color: "#d4a017" }}
                ></i>
                +91 98765 43210
              </p>

              <p>
                <i
                  className="bi bi-envelope me-2"
                  style={{ color: "#d4a017" }}
                ></i>
                info@dreamestate.com
              </p>

            </div>

          </div>

          <div className="col-md-7">

            <div className="card border-0 shadow-sm p-4">

              <form>

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn"
                  style={{
                    background: "#061326",
                    color: "white",
                  }}
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Contact;
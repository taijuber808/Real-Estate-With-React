import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Input Change
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // =========================
  // Register
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Password Check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        }),
      });

      const result = await response.json();

      console.log("Register response:", result);

      // =========================
      // Success
      // =========================
      if (response.ok) {
        alert(result.message || "Registration successful ❤️");

        navigate("/login");
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (error) {
      console.log("Register error:", error);

      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" data-aos="zoom-in" data-aos-duration="800">
        {/* =========================
            Logo
        ========================= */}
        <div
          className="text-center mb-3"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <div
            className="mx-auto d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "65px",
              height: "65px",
              background: "#061326",
              color: "#d4a017",
            }}
          >
            <i className="bi bi-house-heart-fill fs-3"></i>
          </div>
        </div>

        {/* =========================
            Heading
        ========================= */}
        <div className="text-center" data-aos="fade-down" data-aos-delay="200">
          <h2 className="fw-bold">Create Account</h2>

          <p className="text-muted">
            Join DreamEstate and find your dream property
          </p>
        </div>

        {/* =========================
            Error
        ========================= */}
        {error && (
          <div
            className="alert alert-danger py-2 text-center"
            data-aos="fade-up"
          >
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        {/* =========================
            Form
        ========================= */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group" data-aos="fade-up" data-aos-delay="300">
            <label>Full Name</label>

            <div className="position-relative">
              <i
                className="bi bi-person position-absolute"
                style={{
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#d4a017",
                }}
              ></i>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  paddingLeft: "42px",
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group" data-aos="fade-up" data-aos-delay="400">
            <label>Email</label>

            <div className="position-relative">
              <i
                className="bi bi-envelope position-absolute"
                style={{
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#d4a017",
                }}
              ></i>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  paddingLeft: "42px",
                }}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group" data-aos="fade-up" data-aos-delay="500">
            <label>Phone Number</label>

            <div className="position-relative">
              <i
                className="bi bi-telephone position-absolute"
                style={{
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#d4a017",
                }}
              ></i>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  paddingLeft: "42px",
                }}
              />
            </div>
          </div>

          {/* Account Type */}
          <div className="form-group" data-aos="fade-up" data-aos-delay="550">
            <label>Account Type</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="user">User - I want to buy property</option>

              <option value="owner">Owner - I want to list my property</option>
            </select>
          </div>

          {/* Password */}
          <div className="form-group" data-aos="fade-up" data-aos-delay="600">
            <label>Password</label>

            <div className="position-relative">
              <i
                className="bi bi-lock position-absolute"
                style={{
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#d4a017",
                }}
              ></i>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  paddingLeft: "42px",
                }}
              />
            </div>

            <small className="text-muted">Minimum 6 characters</small>
          </div>

          {/* Confirm Password */}
          <div className="form-group" data-aos="fade-up" data-aos-delay="700">
            <label>Confirm Password</label>

            <div className="position-relative">
              <i
                className="bi bi-shield-lock position-absolute"
                style={{
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#d4a017",
                }}
              ></i>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{
                  paddingLeft: "42px",
                }}
              />
            </div>
          </div>

          {/* Register Button */}
          <div data-aos="fade-up" data-aos-delay="800">
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus me-2"></i>
                  Create Account
                </>
              )}
            </button>
          </div>
        </form>

        {/* =========================
            Login
        ========================= */}
        <div
          className="text-center mt-4"
          data-aos="fade-up"
          data-aos-delay="900"
        >
          <p className="text-muted mb-2">Already have an account?</p>

          <Link
            to="/login"
            className="fw-semibold text-decoration-none"
            style={{
              color: "#d4a017",
            }}
          >
            Login to your account
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>

        {/* =========================
            Back Home
        ========================= */}
        <div
          className="text-center mt-3"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          <Link to="/" className="text-muted text-decoration-none small">
            <i className="bi bi-arrow-left me-1"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =========================
  // Register
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // =========================
    // Clean Data
    // =========================
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const role = formData.role;

    // =========================
    // Name Validation
    // =========================
    if (!name) {
      setError("Please enter your full name.");
      return;
    }

    if (name.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    // =========================
    // Email Validation
    // =========================
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // =========================
    // Phone Validation
    // =========================
    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    // Remove spaces, +91, hyphen etc.
    const cleanPhone = phone.replace(/\D/g, "");

    // If user enters +91XXXXXXXXXX
    const normalizedPhone =
      cleanPhone.length === 12 && cleanPhone.startsWith("91")
        ? cleanPhone.slice(2)
        : cleanPhone;

    // Indian 10 digit mobile validation
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(normalizedPhone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    // =========================
    // Role Validation
    // =========================
    const allowedRoles = ["user", "owner"];

    if (!allowedRoles.includes(role)) {
      setError("Invalid account type selected.");
      return;
    }

    // =========================
    // Password Validation
    // =========================
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // =========================
    // Confirm Password
    // =========================
    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone: normalizedPhone,
            password,
            role,
          }),
        },
      );

      const result = await response.json();

      console.log("Register response:", result);

      // =========================
      // Success
      // =========================
      if (response.ok && result.status !== false) {
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
                autoComplete="name"
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
                autoComplete="email"
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
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
                maxLength="13"
                style={{
                  paddingLeft: "42px",
                }}
              />
            </div>

            <small className="text-muted">
              Example: 9876543210 or +91 9876543210
            </small>
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
                minLength="6"
                autoComplete="new-password"
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
                minLength="6"
                autoComplete="new-password"
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

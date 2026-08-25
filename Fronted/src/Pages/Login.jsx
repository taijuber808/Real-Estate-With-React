import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
  // Login
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("Login response:", result);

      // =========================
      // Login Success
      // =========================
      if (response.ok && result.token && result.user) {
        localStorage.setItem("token", result.token);

        localStorage.setItem("user", JSON.stringify(result.user));

        // Navbar immediately update
        window.dispatchEvent(new Event("authChange"));

        alert("Login successful ❤️");

        navigate("/");
      } else {
        setError(
          result.message ||
            "Invalid email or password. Please check your details.",
        );
      }
    } catch (error) {
      console.log("Login error:", error);

      setError("Unable to connect with server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* =========================
          Login Card
      ========================= */}
      <div className="auth-card" data-aos="zoom-in" data-aos-duration="800">
        {/* Logo / Icon */}
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

        {/* Heading */}
        <div className="text-center" data-aos="fade-down" data-aos-delay="200">
          <h2 className="fw-bold">Welcome Back</h2>

          <p className="text-muted">Login to your DreamEstate account</p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="alert alert-danger py-2 text-center"
            data-aos="fade-up"
          >
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div
            className="form-group"
            data-aos="fade-right"
            data-aos-delay="300"
          >
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

          {/* Password */}
          <div className="form-group" data-aos="fade-left" data-aos-delay="400">
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  paddingLeft: "42px",
                }}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging in...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </>
            )}
          </button>
        </form>

        {/* Register */}
        <div
          className="text-center mt-4"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <p className="text-muted mb-2">Don't have an account?</p>

          <Link
            to="/register"
            className="fw-semibold text-decoration-none"
            style={{
              color: "#d4a017",
            }}
          >
            Create New Account
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>

        {/* Back Home */}
        <div
          className="text-center mt-3"
          data-aos="fade-up"
          data-aos-delay="700"
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

export default Login;

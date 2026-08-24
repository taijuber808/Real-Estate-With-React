import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // =========================
  // Check Login
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setMenuOpen(false);

    navigate("/login");
  };

  // =========================
  // Close Menu
  // =========================
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* =========================
          Logo
      ========================= */}
      <Link to="/" className="logo" onClick={closeMenu}>
        <span className="logo-icon">
          <i className="bi bi-house-door-fill"></i>
        </span>
        Dream<span>Estate</span>
      </Link>

      {/* =========================
          Mobile Menu Button
      ========================= */}
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="bi bi-list"></i>
      </button>

      {/* =========================
          Navigation Links
      ========================= */}
      <ul className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/properties" onClick={closeMenu}>
            Properties
          </Link>
        </li>

        <li>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </li>

        <li>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </li>

        {/* Wishlist only when logged in */}
        {isLoggedIn && (
          <li>
            <Link to="/wishlist" onClick={closeMenu}>
              <i className="bi bi-heart me-1"></i>
              Wishlist
            </Link>
          </li>
        )}
      </ul>

      {/* =========================
          Auth Buttons
      ========================= */}
      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="login-btn" onClick={closeMenu}>
              Login
            </Link>

            <Link to="/register" className="register-btn" onClick={closeMenu}>
              Register
            </Link>
          </>
        ) : (
          <button type="button" className="register-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

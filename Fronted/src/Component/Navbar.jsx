import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // =========================
  // Check User
  // =========================
  const checkUser = () => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (token && storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();

    window.addEventListener("authChange", checkUser);
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("authChange", checkUser);
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    // Cancel
    if (!confirmLogout) return;

    // Confirm
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);

    // Navbar update
    window.dispatchEvent(new Event("authChange"));

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
      {/* Logo */}
      <Link to="/" className="logo" onClick={closeMenu}>
        <span className="logo-icon">
          <i className="bi bi-house-door-fill"></i>
        </span>
        Dream<span>Estate</span>
      </Link>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
      </button>

      {/* Navigation Links */}
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

        {/* Wishlist */}
        {user && (
          <li>
            <Link to="/wishlist" onClick={closeMenu}>
              <i className="bi bi-heart me-1"></i>
              Wishlist
            </Link>
          </li>
        )}

        {/* Add Property */}
        {user?.role === "owner" && (
          <li>
            <Link to="/create-property" onClick={closeMenu}>
              <i className="bi bi-house-add me-1"></i>
              Add Property
            </Link>
          </li>
        )}
      </ul>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        {!user ? (
          <>
            <Link to="/login" className="login-btn" onClick={closeMenu}>
              Login
            </Link>

            <Link to="/register" className="register-btn" onClick={closeMenu}>
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Profile */}
            <Link to="/profile" className="login-btn" onClick={closeMenu}>
              <i className="bi bi-person me-1"></i>
              Profile
            </Link>

            {/* Logout */}
            <button
              type="button"
              className="register-btn"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

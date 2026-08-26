import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // ================================
  // GET PROFILE
  // ================================
  const getProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      console.log("PROFILE TOKEN:", token ? "Token exists" : "Token missing");

      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await fetch("http://localhost:8080/api/profile", {
        method: "GET",
        headers: {
          token: token,
        },
      });

      const data = await response.json();

      console.log("PROFILE STATUS:", response.status);
      console.log("PROFILE RESPONSE:", data);

      if (response.ok && data.user) {
        setUser(data.user);

        setForm({
          name: data.user.name || "",
          phone: data.user.phone || "",
        });
      } else {
        setUser(null);
        setError(data.message || "Profile load nahi hua");
      }
    } catch (error) {
      console.log("Profile error:", error);
      setError("Unable to connect with server");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // LOAD PROFILE ON PAGE LOAD
  // ================================
  useEffect(() => {
    getProfile();
  }, []);

  // ================================
  // INPUT CHANGE
  // ================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // UPDATE PROFILE
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await fetch("http://localhost:8080/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
        }),
      });

      const data = await response.json();

      console.log("UPDATE PROFILE STATUS:", response.status);
      console.log("UPDATE PROFILE RESPONSE:", data);

      if (response.ok && data.user) {
        setUser(data.user);

        setForm({
          name: data.user.name || "",
          phone: data.user.phone || "",
        });

        localStorage.setItem("user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("authChange"));

        alert("Profile updated successfully ❤️");
      } else {
        setError(data.message || "Profile update failed");
      }
    } catch (error) {
      console.log("Update error:", error);
      setError("Unable to connect with server");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* HEADER */}
        <div className="profile-header">
          <div>
            <h2>My Profile</h2>
            <p>Manage your DreamEstate account</p>
          </div>

          <button
            type="button"
            className="profile-close-btn"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* CONTENT */}
        <div className="profile-content">
          {/* LOADING */}
          {loading && (
            <div className="profile-loading">
              <i className="bi bi-arrow-repeat"></i>
              <span>Loading Profile...</span>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="profile-loading">
              <i className="bi bi-exclamation-circle"></i>

              <span>{error}</span>

              <button
                type="button"
                onClick={getProfile}
                className="profile-retry-btn"
              >
                Try Again
              </button>
            </div>
          )}

          {/* PROFILE */}
          {!loading && !error && user && (
            <>
              {/* AVATAR */}
              <div className="profile-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <h3>{user.name}</h3>

              <p className="profile-email">{user.email}</p>

              {/* FORM */}
              <form onSubmit={handleSubmit}>
                {/* NAME */}
                <div className="form-group">
                  <label>Name</label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* PHONE */}
                <div className="form-group">
                  <label>Phone</label>

                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone"
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label>Email</label>

                  <input type="email" value={user.email || ""} disabled />
                </div>

                {/* ROLE */}
                <div className="form-group">
                  <label>Role</label>

                  <input type="text" value={user.role || ""} disabled />
                </div>

                {/* UPDATE */}
                <button
                  type="submit"
                  className="profile-update-btn"
                  disabled={updating}
                >
                  {updating ? (
                    "Updating..."
                  ) : (
                    <>
                      <i className="bi bi-check2-circle"></i>
                      Update Profile
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

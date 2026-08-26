import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api";

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // =========================
  // Admin Protection
  // =========================
  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchProperties();
  }, []);

  // =========================
  // Get Properties
  // =========================
  const fetchProperties = async () => {
    try {
      const response = await fetch(`${API_URL}/properties`);

      const data = await response.json();

      if (data.status) {
        setProperties(data.data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Delete Property
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/properties/${id}`, {
        method: "DELETE",
        headers: {
          token: token,
        },
      });

      const data = await response.json();

      if (data.status) {
        alert("Property deleted successfully");

        setProperties((prev) => prev.filter((property) => property._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong");
    }
  };

  // =========================
  // Statistics
  // =========================
  const totalProperties = properties.length;

  const availableProperties = properties.filter(
    (property) => property.status === "available",
  ).length;

  const soldProperties = properties.filter(
    (property) => property.status === "sold",
  ).length;

  if (loading) {
    return <h2>Loading Admin Dashboard...</h2>;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage all properties from here.</p>
        </div>

        <button onClick={() => navigate("/")}>Back to Website</button>
      </div>

      {/* Statistics */}
      <div className="admin-stats">
        <div className="stat-card">
          <i className="bi bi-buildings"></i>
          <h3>Total Properties</h3>
          <p>{totalProperties}</p>
        </div>

        <div className="stat-card">
          <i className="bi bi-house-check"></i>
          <h3>Available</h3>
          <p>{availableProperties}</p>
        </div>

        <div className="stat-card">
          <i className="bi bi-house-x"></i>
          <h3>Sold</h3>
          <p>{soldProperties}</p>
        </div>
      </div>

      {/* Property Table */}
      <div className="admin-properties">
        <h2>All Properties</h2>

        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>City</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {properties.map((property) => (
                  <tr key={property._id}>
                    <td>
                      {property.images?.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="admin-property-image"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>

                    <td>{property.title}</td>

                    <td>{property.city}</td>

                    <td>₹{Number(property.price).toLocaleString("en-IN")}</td>

                    <td>{property.propertyType}</td>

                    <td>
                      <span
                        className={
                          property.status === "available"
                            ? "status-available"
                            : "status-sold"
                        }
                      >
                        {property.status}
                      </span>
                    </td>

                    <td>{property.owner?.name || "Unknown"}</td>

                    <td>
                      <button
                        onClick={() =>
                          navigate(`/properties/${property._id}/edit`)
                        }
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button onClick={() => handleDelete(property._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;

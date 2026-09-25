import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = `${import.meta.env.VITE_API_URL}/api`;

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeLoading, setRemoveLoading] = useState(null);
  const [error, setError] = useState("");

  // =========================
  // Fetch Wishlist
  // =========================
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });

      const result = await response.json();

      console.log("Wishlist response:", result);

      if (response.ok && result.status) {
        setWishlist(Array.isArray(result.data) ? result.data : []);
      } else {
        setWishlist([]);
        setError(result.message || "Failed to load wishlist");
      }
    } catch (error) {
      console.log("Error fetching wishlist:", error);

      setWishlist([]);
      setError("Unable to connect with server.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Remove Wishlist
  // =========================
  const removeWishlist = async (propertyId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!propertyId) {
      alert("Invalid property");
      return;
    }

    try {
      setRemoveLoading(propertyId);

      const response = await fetch(`${API}/wishlist/${propertyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });

      const result = await response.json();

      console.log("Remove wishlist response:", result);

      if (response.ok && result.status) {
        // Remove immediately from UI
        setWishlist((prev) =>
          prev.filter((item) => {
            const id =
              typeof item.property === "object"
                ? item.property?._id
                : item.property;

            return id?.toString() !== propertyId?.toString();
          }),
        );

        alert("Property removed from wishlist ❤️");
      } else {
        alert(result.message || "Failed to remove wishlist");
      }
    } catch (error) {
      console.log("Error removing wishlist:", error);
      alert("Unable to connect with server");
    } finally {
      setRemoveLoading(null);
    }
  };

  // =========================
  // First Load
  // =========================
  useEffect(() => {
    fetchWishlist();
  }, []);

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <section className="py-5 bg-light min-vh-100">
        <div className="container text-center py-5">
          <div
            className="spinner-border mb-3"
            style={{
              color: "#d4a017",
            }}
            role="status"
          ></div>

          <h5>Loading wishlist...</h5>

          <p className="text-muted mb-0">
            Please wait while we load your saved properties.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* =========================
            Heading
        ========================= */}
        <div className="text-center mb-5" data-aos="fade-down">
          <p
            className="text-uppercase fw-semibold mb-2"
            style={{
              color: "#d4a017",
              fontSize: "13px",
              letterSpacing: "2px",
            }}
          >
            My Wishlist
          </p>

          <h2 className="fw-bold mb-2">Saved Properties ❤️</h2>

          <p className="text-muted mb-0">
            Properties you have saved for later.
          </p>
        </div>

        {/* =========================
            Error
        ========================= */}
        {error && (
          <div className="alert alert-danger text-center" data-aos="fade-up">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        {/* =========================
            Empty Wishlist
        ========================= */}
        {!error && wishlist.length === 0 ? (
          <div
            className="text-center bg-white rounded-4 shadow-sm py-5 px-3"
            data-aos="zoom-in"
          >
            <i
              className="bi bi-heart"
              style={{
                fontSize: "60px",
                color: "#d4a017",
              }}
            ></i>

            <h4 className="fw-bold mt-3">Your wishlist is empty</h4>

            <p className="text-muted">
              Save properties you like and find them here.
            </p>

            <Link
              to="/properties"
              className="btn text-white mt-2"
              style={{
                background: "#061326",
              }}
            >
              <i className="bi bi-house me-2"></i>
              Browse Properties
            </Link>
          </div>
        ) : (
          /* =========================
             Wishlist Cards
          ========================= */
          <div className="row g-4">
            {wishlist.map((item, index) => {
              const property =
                typeof item.property === "object" ? item.property : null;

              // Invalid/deleted property
              if (!property?._id) {
                return null;
              }

              const propertyId = property._id;

              return (
                <div
                  key={item._id || propertyId}
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 100}
                >
                  <div
                    className="card h-100 shadow-sm border-0 position-relative rounded-4"
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    {/* =========================
                        Remove Wishlist
                    ========================= */}
                    <button
                      type="button"
                      className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                      onClick={() => removeWishlist(propertyId)}
                      disabled={removeLoading === propertyId}
                      title="Remove from wishlist"
                      style={{
                        width: "40px",
                        height: "40px",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {removeLoading === propertyId ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          style={{
                            color: "#dc3545",
                          }}
                        ></span>
                      ) : (
                        <i
                          className="bi bi-heart-fill"
                          style={{
                            color: "#dc3545",
                          }}
                        ></i>
                      )}
                    </button>

                    {/* =========================
                        Property Image
                    ========================= */}
                    <img
                      src={property.images?.[0] || "/default-property.jpg"}
                      alt={property.title || "Property"}
                      className="card-img-top"
                      onError={(e) => {
                        e.currentTarget.src = "/default-property.jpg";
                      }}
                      style={{
                        height: "210px",
                        objectFit: "cover",
                      }}
                    />

                    {/* =========================
                        Card Body
                    ========================= */}
                    <div className="card-body">
                      {/* Type + Status */}
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span
                          className="badge"
                          style={{
                            background: "#d4a017",
                          }}
                        >
                          {property.propertyType}
                        </span>

                        <span
                          className={`badge ${
                            property.status === "sold"
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                        >
                          {property.status === "sold" ? "Sold" : "Available"}
                        </span>
                      </div>

                      {/* Title */}
                      <h5 className="fw-bold mb-2">{property.title}</h5>

                      {/* Location */}
                      <p className="text-muted small mb-3">
                        <i className="bi bi-geo-alt-fill me-1"></i>

                        {property.location}

                        {property.city && <>, {property.city}</>}
                      </p>

                      {/* Property Information */}
                      <div className="d-flex justify-content-between text-muted small mb-3">
                        <span>
                          <i className="bi bi-door-open me-1"></i>
                          {property.bedrooms || 0} BHK
                        </span>

                        <span>
                          <i className="bi bi-rulers me-1"></i>
                          {property.areaSize || 0} sq.ft
                        </span>
                      </div>

                      {/* Price */}
                      <h5
                        className="fw-bold mb-3"
                        style={{
                          color: "#d4a017",
                        }}
                      >
                        ₹{Number(property.price || 0).toLocaleString("en-IN")}
                      </h5>

                      {/* View Details */}
                      <Link
                        to={`/property-details/${propertyId}`}
                        className="btn btn-dark w-100"
                      >
                        <i className="bi bi-eye me-2"></i>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;

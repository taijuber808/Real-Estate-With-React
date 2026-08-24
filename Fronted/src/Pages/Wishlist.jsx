import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeLoading, setRemoveLoading] = useState(null);

  // =========================
  // Fetch Wishlist
  // =========================
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setWishlist([]);
        return;
      }

      const response = await fetch("http://localhost:8080/api/wishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      const result = await response.json();

      console.log("Wishlist response:", result);

      if (result.status) {
        setWishlist(result.data);
      } else {
        setWishlist([]);
        console.log(result.message);
      }
    } catch (error) {
      console.log("Error fetching wishlist:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Remove Wishlist
  // =========================
  const removeWishlist = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      setRemoveLoading(propertyId);

      const response = await fetch(
        `http://localhost:8080/api/wishlist/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        },
      );

      const result = await response.json();

      console.log("Remove wishlist response:", result);

      if (result.status) {
        // UI se property immediately remove
        setWishlist((prev) =>
          prev.filter((item) => item.property?._id !== propertyId),
        );

        alert("Property removed from wishlist");
      } else {
        alert(result.message || "Failed to remove wishlist");
      }
    } catch (error) {
      console.log("Error removing wishlist:", error);
      alert("Something went wrong");
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

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* =========================
            Heading
        ========================= */}
        <div className="text-center mb-5">
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

          <p className="text-muted">Properties you have saved for later.</p>
        </div>

        {/* =========================
            Loading
        ========================= */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border mb-3"
              style={{
                color: "#d4a017",
              }}
            ></div>

            <h5>Loading wishlist...</h5>
          </div>
        ) : wishlist.length === 0 ? (
          /* =========================
             Empty Wishlist
          ========================= */
          <div className="text-center py-5">
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

            <Link to="/properties" className="btn btn-dark mt-2">
              Browse Properties
            </Link>
          </div>
        ) : (
          /* =========================
             Wishlist Cards
          ========================= */
          <div className="row g-4">
            {wishlist.map((item) => {
              const property = item.property;

              if (!property) {
                return null;
              }

              return (
                <div
                  key={item._id}
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <div
                    className="card h-100 shadow-sm border-0 position-relative"
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    {/* =========================
                        Remove Wishlist Button
                    ========================= */}
                    <button
                      type="button"
                      className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                      onClick={() => removeWishlist(property._id)}
                      disabled={removeLoading === property._id}
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
                      {removeLoading === property._id ? (
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
                      alt={property.title}
                      className="card-img-top"
                      style={{
                        height: "210px",
                        objectFit: "cover",
                      }}
                    />

                    {/* =========================
                        Card Body
                    ========================= */}
                    <div className="card-body">
                      {/* Property Type */}
                      <span
                        className="badge mb-2"
                        style={{
                          background: "#d4a017",
                        }}
                      >
                        {property.propertyType}
                      </span>

                      {/* Title */}
                      <h5 className="fw-bold mb-2">{property.title}</h5>

                      {/* Location */}
                      <p className="text-muted small mb-3">
                        <i className="bi bi-geo-alt me-1"></i>

                        {property.location}

                        {property.city && <>, {property.city}</>}
                      </p>

                      {/* Property Information */}
                      <div className="d-flex justify-content-between text-muted small mb-3">
                        <span>
                          <i className="bi bi-door-open me-1"></i>
                          {property.bedrooms} BHK
                        </span>

                        <span>
                          <i className="bi bi-rulers me-1"></i>
                          {property.areaSize} sq.ft
                        </span>
                      </div>

                      {/* Price */}
                      <h5
                        className="fw-bold mb-3"
                        style={{
                          color: "#d4a017",
                        }}
                      >
                        ₹{Number(property.price).toLocaleString("en-IN")}
                      </h5>

                      {/* View Details */}
                      <Link
                        to={`/property-details/${property._id}`}
                        className="btn btn-dark w-100"
                      >
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

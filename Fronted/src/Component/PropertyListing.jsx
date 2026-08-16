import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);

  // Search states
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [bhk, setBhk] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
      })
      .catch((error) => {
        console.log("Error fetching properties:", error);
      });
  }, []);

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const locationMatch =
      location === "" ||
      property.location.toLowerCase().includes(location.toLowerCase());

    const typeMatch = type === "" || property.type === type;

    const bhkMatch = bhk === "" || property.bedrooms === Number(bhk);

    let priceMatch = true;

    if (priceRange === "under50") {
      priceMatch = property.priceValue < 5000000;
    }

    if (priceRange === "50-80") {
      priceMatch =
        property.priceValue >= 5000000 && property.priceValue <= 8000000;
    }

    if (priceRange === "80-120") {
      priceMatch =
        property.priceValue > 8000000 && property.priceValue <= 12000000;
    }

    if (priceRange === "above120") {
      priceMatch = property.priceValue > 12000000;
    }

    return locationMatch && typeMatch && bhkMatch && priceMatch;
  });

  return (
    <section className="py-5 bg-white">
      {/* Heading */}

      <div className="text-center mb-4">
        <p
          className="text-uppercase fw-semibold mb-2"
          style={{
            color: "#d4a017",
            fontSize: "13px",
            letterSpacing: "2px",
          }}
        >
          Our Properties
        </p>

        <h2 className="fw-bold mb-3">Find Your Perfect Property</h2>

        <p className="text-muted mb-0">
          Explore our handpicked properties and find your perfect home.
        </p>
      </div>

      {/* Search Box */}

      <div className="container mb-5">
        <div
          className="p-4 rounded shadow-sm"
          style={{
            background: "#f8f9fa",
          }}
        >
          <div className="row g-3">
            {/* Location */}

            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-semibold">Location</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Property Type */}

            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-semibold">Property Type</label>

              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Types</option>

                <option value="Villa">Villa</option>

                <option value="House">House</option>

                <option value="Apartment">Apartment</option>
              </select>
            </div>

            {/* BHK */}

            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-semibold">BHK</label>

              <select
                className="form-select"
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
              >
                <option value="">Any BHK</option>

                <option value="2">2 BHK</option>

                <option value="3">3 BHK</option>

                <option value="4">4 BHK</option>

                <option value="5">5 BHK</option>
              </select>
            </div>

            {/* Price */}

            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-semibold">Price Range</label>

              <select
                className="form-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">Any Price</option>

                <option value="under50">Under ₹50 Lakh</option>

                <option value="50-80">₹50 - ₹80 Lakh</option>

                <option value="80-120">₹80 Lakh - ₹1.2 Crore</option>

                <option value="above120">Above ₹1.2 Crore</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Property Cards */}

      <div className="container">
        <div className="row">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div key={property.id} className="col-lg-3 col-md-6 mb-4">
                {/* SAME HOME PAGE CARD */}

                <div className="card h-100 shadow-sm border-0">
                  {/* Image */}

                  <img
                    src={property.image}
                    alt={property.title}
                    className="card-img-top"
                    style={{
                      height: "210px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Card Body */}

                  <div className="card-body">
                    <h5 className="fw-bold mb-2">{property.title}</h5>

                    <p className="text-muted small mb-3">
                      <i className="bi bi-geo-alt"></i> {property.location}
                    </p>

                    <div className="d-flex justify-content-between text-muted small mb-3">
                      <span>
                        <i className="bi bi-door-open"></i> {property.bedrooms}{" "}
                        BHK
                      </span>

                      <span>
                        <i className="bi bi-rulers"></i> {property.area} sq.ft
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <h5
                        className="mb-0 fw-bold"
                        style={{
                          color: "#d4a017",
                        }}
                      >
                        {property.price}
                      </h5>

                      <Link
                        to={`/property-details/${property.id}`}
                        className="btn btn-dark btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h5>No properties found</h5>

              <p className="text-muted">Try changing your search filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyListing;

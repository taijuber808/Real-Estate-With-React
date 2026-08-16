import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProperty = data.find(
          (item) => item.id === Number(id)
        );

        setProperty(foundProperty);
      })
      .catch((error) => {
        console.log("Error fetching property:", error);
      });
  }, [id]);

  // Loading
  if (!property) {
    return (
      <div className="container text-center py-5">
        <h4>Loading property...</h4>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light">

      <div className="container">

        {/* Back Button */}

        <div className="mb-4">
          <Link
            to="/properties"
            className="btn btn-outline-dark"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Properties
          </Link>
        </div>


        {/* =========================
            Main Property Card
        ========================= */}

        <div className="card border-0 shadow-sm overflow-hidden">

          <div className="row g-0">

            {/* =========================
                Property Image
            ========================= */}

            <div className="col-lg-6">

              <img
                src={property.image}
                alt={property.title}
                className="w-100"
                style={{
                  height: "700px",
                  objectFit: "cover",
                }}
              />

            </div>


            {/* =========================
                Property Information
            ========================= */}

            <div className="col-lg-6">

              <div className="p-4 p-lg-5">

                {/* Property Type */}

                <span
                  className="badge mb-3"
                  style={{
                    background: "#d4a017",
                    fontSize: "13px",
                  }}
                >
                  {property.type}
                </span>


                {/* Title */}

                <h1 className="fw-bold mb-3">
                  {property.title}
                </h1>


                {/* Location */}

                <p className="text-muted mb-4">

                  <i className="bi bi-geo-alt me-2"></i>

                  {property.location}

                </p>


                {/* Price */}

                <h2
                  className="fw-bold mb-4"
                  style={{
                    color: "#d4a017",
                  }}
                >
                  {property.price}
                </h2>


                {/* =========================
                    Property Features
                ========================= */}

                <div className="row g-3 mb-4">

                  {/* Bedrooms */}

                  <div className="col-6">

                    <div className="border rounded p-3">

                      <i className="bi bi-door-open fs-4"></i>

                      <p className="text-muted small mb-1">
                        Bedrooms
                      </p>

                      <h6 className="fw-bold mb-0">
                        {property.bedrooms} BHK
                      </h6>

                    </div>

                  </div>


                  {/* Bathrooms */}

                  <div className="col-6">

                    <div className="border rounded p-3">

                      <i className="bi bi-droplet fs-4"></i>

                      <p className="text-muted small mb-1">
                        Bathrooms
                      </p>

                      <h6 className="fw-bold mb-0">
                        {property.bathrooms}
                      </h6>

                    </div>

                  </div>


                  {/* Area */}

                  <div className="col-6">

                    <div className="border rounded p-3">

                      <i className="bi bi-rulers fs-4"></i>

                      <p className="text-muted small mb-1">
                        Area
                      </p>

                      <h6 className="fw-bold mb-0">
                        {property.area} sq.ft
                      </h6>

                    </div>

                  </div>


                  {/* Property Type */}

                  <div className="col-6">

                    <div className="border rounded p-3">

                      <i className="bi bi-buildings fs-4"></i>

                      <p className="text-muted small mb-1">
                        Property Type
                      </p>

                      <h6 className="fw-bold mb-0">
                        {property.type}
                      </h6>

                    </div>

                  </div>

                </div>


                {/* =========================
                    Description
                ========================= */}

                <h5 className="fw-bold mb-2">
                  Property Description
                </h5>

                <p className="text-muted lh-lg">
                  {property.description}
                </p>


                {/* =========================
                    Contact Button
                ========================= */}

                <div className="d-flex gap-2 mt-4">

                  <button
                    className="btn flex-grow-1"
                    style={{
                      background: "#d4a017",
                      color: "white",
                    }}
                    onClick={() => setShowForm(true)}
                  >

                    <i className="bi bi-telephone me-2"></i>

                    Contact Agent

                  </button>

                </div>


                {/* =========================
                    Contact Form
                ========================= */}

                {showForm && (

                  <div className="card border-0 shadow-sm mt-4">

                    <div className="card-body p-4">

                      <h4 className="fw-bold mb-2">
                        Contact Agent
                      </h4>

                      <p className="text-muted mb-4">
                        Interested in {property.title}?
                        Send us your enquiry.
                      </p>


                      <form>

                        {/* Name */}

                        <div className="mb-3">

                          <label className="form-label">
                            Your Name
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            required
                          />

                        </div>


                        {/* Email */}

                        <div className="mb-3">

                          <label className="form-label">
                            Email
                          </label>

                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            required
                          />

                        </div>


                        {/* Phone */}

                        <div className="mb-3">

                          <label className="form-label">
                            Phone
                          </label>

                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter your phone number"
                            required
                          />

                        </div>


                        {/* Message */}

                        <div className="mb-3">

                          <label className="form-label">
                            Message
                          </label>

                          <textarea
                            className="form-control"
                            rows="4"
                            placeholder="I'm interested in this property..."
                            required
                          ></textarea>

                        </div>


                        {/* Form Buttons */}

                        <div className="d-flex gap-2">

                          <button
                            type="submit"
                            className="btn btn-dark"
                          >
                            Send Enquiry
                          </button>


                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowForm(false)}
                          >
                            Cancel
                          </button>

                        </div>

                      </form>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            Additional Information
        ========================= */}

        <div className="card border-0 shadow-sm mt-4">

          <div className="card-body p-4">

            <h4 className="fw-bold mb-4">
              Property Information
            </h4>


            <div className="row">

              {/* Property ID */}

              <div className="col-md-4 mb-3">

                <p className="text-muted mb-1">
                  Property ID
                </p>

                <h6 className="fw-bold">
                  #{property.id}
                </h6>

              </div>


              {/* Property Type */}

              <div className="col-md-4 mb-3">

                <p className="text-muted mb-1">
                  Property Type
                </p>

                <h6 className="fw-bold">
                  {property.type}
                </h6>

              </div>


              {/* Location */}

              <div className="col-md-4 mb-3">

                <p className="text-muted mb-1">
                  Location
                </p>

                <h6 className="fw-bold">
                  {property.location}
                </h6>

              </div>


              {/* Bedrooms */}

              <div className="col-md-4 mb-3">

                <p className="text-muted mb-1">
                  Bedrooms
                </p>

                <h6 className="fw-bold">
                  {property.bedrooms} BHK
                </h6>

              </div>


              {/* Bathrooms */}

              <div className="col-md-4 mb-3">

                <p className="text-muted mb-1">
                  Bathrooms
                </p>

                <h6 className="fw-bold">
                  {property.bathrooms}
                </h6>

              </div>


              {/* Area */}

              <div className="col-md-4 mb-3">

                <p className="text-muted mb-1">
                  Area
                </p>

                <h6 className="fw-bold">
                  {property.area} sq.ft
                </h6>

              </div>


              {/* Price */}

              <div className="col-md-4 mb-3">

                <p className="text-muted mb-1">
                  Price
                </p>

                <h6
                  className="fw-bold"
                  style={{
                    color: "#d4a017",
                  }}
                >
                  {property.price}
                </h6>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PropertyDetails;
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-subtitle">
          FIND YOUR PERFECT HOME
        </p>

        <h1>
          Find Your
          <br />
          <span>Dream Home</span>
        </h1>

        <p className="hero-description">
          Discover the perfect property
          <br />
          that fits your lifestyle and budget.
        </p>

        <Link
          to="/properties"
          className="hero-btn"
        >
          Explore Properties
        </Link>

      </div>

    </section>
  );
};

export default Hero;
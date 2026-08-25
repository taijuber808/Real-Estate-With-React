import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div
        className="hero-content"
        data-aos="fade-right"
        data-aos-duration="1200"
      >
        <p className="hero-subtitle" data-aos="fade-down" data-aos-delay="200">
          FIND YOUR PERFECT HOME
        </p>

        <h1 data-aos="fade-up" data-aos-delay="300">
          Find Your
          <br />
          <span>Dream Home</span>
        </h1>

        <p className="hero-description" data-aos="fade-up" data-aos-delay="500">
          Discover the perfect property
          <br />
          that fits your lifestyle and budget.
        </p>

        <Link
          to="/properties"
          className="hero-btn"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          Explore Properties
        </Link>
      </div>
    </section>
  );
};

export default Hero;

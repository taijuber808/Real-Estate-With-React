const Register = () => {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2>Create Account</h2>

        <p>
          Create your DreamEstate account
        </p>

        <form>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
          >
            Register
          </button>

        </form>

        <p className="auth-bottom">
          Already have an account?
          <a href="/login"> Login</a>
        </p>

      </div>

    </div>
  );
};

export default Register;
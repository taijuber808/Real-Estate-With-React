const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>Welcome Back</h2>
        <p>Login to your DreamEstate account</p>

        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-submit">
            Login
          </button>
        </form>

        <p className="auth-bottom">
          Don't have an account?
          <a href="/register"> Register</a>
        </p>

      </div>
    </div>
  );
};

export default Login;
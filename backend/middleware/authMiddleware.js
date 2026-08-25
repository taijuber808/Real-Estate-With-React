import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const token = req.headers.token;

  try {
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token is required",
      });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = verifyToken;

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};

export const isOwner = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({
      status: false,
      message: "Only owner can perform this action",
    });
  }

  next();
};

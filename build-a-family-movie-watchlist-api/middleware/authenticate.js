
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "family-movie-watchlist-secret";

export function authenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "No token provided.",
    });
  }

  const token = authorization.slice(7);

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({
      error: "Invalid or expired token.",
    });
  }
}

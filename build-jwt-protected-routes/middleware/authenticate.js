
import { verifyToken } from "../utils/jwt.js";

export default function authenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authorization.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

  req.user = decoded;
  next();
}

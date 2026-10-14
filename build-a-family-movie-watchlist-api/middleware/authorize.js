export function authorizeModification(req, res, next) {
  const role = req.user?.role;
  const requestedUserId = String(req.params.userId);
  const authenticatedUserId = String(req.user?.id);

  const isParent = role === "parent";
  const isOwnWatchlist =
    role === "child" &&
    requestedUserId === authenticatedUserId;

  if (!isParent && !isOwnWatchlist) {
    return res.status(403).json({
      error: "Access denied",
    });
  }

  next();
}
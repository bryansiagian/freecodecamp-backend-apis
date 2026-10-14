
import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";

import {
  findById,
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";

const router = express.Router();

// Semua endpoint watchlist harus terautentikasi.
router.use(authenticate);

function resolveUserId(id) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return null;
  }

  const user = findById(numericId);

  return user ? user.id : null;
}

// GET /api/watchlist/:userId
router.get("/:userId", (req, res) => {
  const userId = resolveUserId(req.params.userId);

  if (userId === null) {
    return res.status(404).json({
      error: "User not found.",
    });
  }

  const watchlist = getWatchlist(userId);

  if (watchlist === null) {
    return res.status(404).json({
      error: "User not found.",
    });
  }

  return res.status(200).json(watchlist);
});

// POST /api/watchlist/:userId/movies
router.post(
  "/:userId/movies",
  authorizeModification,
  (req, res) => {
    const userId = resolveUserId(req.params.userId);

    if (userId === null) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    const { title, genre } = req.body || {};

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof genre !== "string" ||
      !genre.trim()
    ) {
      return res.status(400).json({
        error: "Title and genre are required.",
      });
    }

    const movie = addMovie(userId, {
      title: title.trim(),
      genre: genre.trim(),
    });

    if (!movie) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.status(201).json(movie);
  },
);

// PUT /api/watchlist/:userId/movies/:movieId
router.put(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const userId = resolveUserId(req.params.userId);
    const movieId = Number(req.params.movieId);

    if (userId === null) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    if (!Number.isInteger(movieId) || movieId < 1) {
      return res.status(404).json({
        error: "Movie not found.",
      });
    }

    const updates = { ...(req.body || {}) };

    // ID dan status data yang tidak diizinkan jangan diubah sembarangan.
    delete updates.id;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "At least one field is required.",
      });
    }

    const movie = updateMovie(userId, movieId, updates);

    if (!movie) {
      return res.status(404).json({
        error: "Movie not found.",
      });
    }

    return res.status(200).json(movie);
  },
);

// DELETE /api/watchlist/:userId/movies/:movieId
router.delete(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const userId = resolveUserId(req.params.userId);
    const movieId = Number(req.params.movieId);

    if (userId === null) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    if (!Number.isInteger(movieId) || movieId < 1) {
      return res.status(404).json({
        error: "Movie not found.",
      });
    }

    const deleted = deleteMovie(userId, movieId);

    if (!deleted) {
      return res.status(404).json({
        error: "Movie not found.",
      });
    }

    return res.status(200).json({
      message: "Movie deleted successfully.",
    });
  },
);

export default router;

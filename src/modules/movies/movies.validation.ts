
import { body } from "express-validator";

// ✅ Create Movie Validation
export const addMovieValidation = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 3 })
    .withMessage("description must be at least 3 characters"),

  body("duration")
    .notEmpty()
    .withMessage("duration is required")
    .isNumeric()
    .withMessage("duration must be a number"),

  body("releaseDate")
    .notEmpty()
    .withMessage("releaseDate is required")
    .isISO8601()
    .withMessage("releaseDate must be a valid date")
    .toDate(),
];


// ✅ Update Movie Validation
export const updateMovieValidation = [
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters"),

  body("description")
    .optional()
    .isLength({ min: 3 })
    .withMessage("description must be at least 3 characters"),

  body("duration")
    .optional()
    .isNumeric()
    .withMessage("duration must be a number"),

  body("releaseDate")
    .optional()
    .isISO8601()
    .withMessage("releaseDate must be a valid date")
    .toDate(),
];

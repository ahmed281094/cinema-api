import { body } from "express-validator";

export const addHallValidation = [
  body("name")
    .notEmpty()
    .withMessage("Hall name is required")
    .isLength({ min: 2 })
    .withMessage("Hall name must be at least 2 characters"),

  body("totalRows")
    .notEmpty()
    .withMessage("totalRows is required")
    .isInt({ gt: 0 })
    .withMessage("totalRows must be a positive integer"),

  body("totalColumns")
    .notEmpty()
    .withMessage("totalColumns is required")
    .isInt({ gt: 0 })
    .withMessage("totalColumns must be a positive integer"),
];



export const updateHallValidation = [
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Hall name must be at least 2 characters"),

  body("totalRows")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("totalRows must be a positive integer"),

  body("totalColumns")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("totalColumns must be a positive integer"),
];

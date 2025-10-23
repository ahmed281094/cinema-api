import { body } from "express-validator";

export const signUpValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .optional()
    .isIn(["user"])
    .withMessage("you can only be user"),
];


export const signInValidation = [

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

];


export const updatePasswordValidation = [

  body("oldPassword")
    .notEmpty()
    .withMessage("oldPassword is required")
    .isLength({ min: 6 })
    .withMessage("oldPassword must be at least 6 characters"),

  body("newPassword")
    .notEmpty()
    .withMessage("newPassword is required")
    .isLength({ min: 6 })
    .withMessage("newPassword must be at least 6 characters"),

];


export const updateNameValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

];

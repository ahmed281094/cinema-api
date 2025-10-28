import { Router } from "express";
import { addMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from "./movies.controller.js";
import { authentication, authorization } from "../../middleWare/auth.js";
import { addMovieValidation, updateMovieValidation } from "./movies.validation.js";
import { validate } from "../../middleWare/validation.js";

const moviesRouter = Router()

moviesRouter.post("/addMovie",
    addMovieValidation,
    validate,
    authentication,
    authorization,
    addMovie
)
moviesRouter.get("/getAllMovies",
    authentication,
    getAllMovies
)

moviesRouter.get("/getMovies/:id",
    authentication,
    getMovieById
)

moviesRouter.put("/updateMovie/:id",
    updateMovieValidation,
    validate,
    authentication,
    authorization,
    updateMovie
)

moviesRouter.delete("/deleteMovie/:id",
    authentication,
    authorization,
    deleteMovie
)

export default moviesRouter

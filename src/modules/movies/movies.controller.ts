import type { Request, Response } from "express";
import { db } from "../../db/DBconnection.js";
import { movies } from "../../db/schema.js";
import { eq } from "drizzle-orm";




export const addMovie = async (req: Request, res: Response) => {
  try {
    const { title, description, duration, releaseDate } = req.body;

    const [movie] = await db
      .insert(movies)
      .values({ title, description, duration, releaseDate })
      .returning();

    return res.status(201).json({ success: true, movie });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error });
  }
}



export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies = await db.select().from(movies)
    return res.status(200).json({ success: true, allMovies });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error })
  }
}


export const getMovieById = async (req: Request, res: Response) => {
  try {

    const movieId = Number(req.params.id)

    const [movie] = await db.select().from(movies).where(eq(movies.id, movieId))
    if (!movie) {
      return res.status(404).json({ success: false, message: "movie not found" })
    }
    return res.status(200).json({ success: true, data: movie });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error })
  }

}


export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movieId = Number(req.params.id)
    const { title, description, duration, releaseDate } = req.body;

    const [movie] = await db.select().from(movies).where(eq(movies.id, movieId))
    if (!movie) {
      return res.status(404).json({ success: false, message: "movie not found" })
    }

    const updatedMovie = await db.update(movies).set({
      title: title ?? movie.title,
      description: description ?? movie.description,
      duration: duration ?? movie.duration,
      releaseDate: releaseDate ?? movie.releaseDate,
    }).where(eq(movies.id, movieId)).returning()
    return res.status(200).json({ success: true, message: "Movie updated successfully",data:updatedMovie[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error })
  }

}


export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const [movie] = await db.select().from(movies).where(eq(movies.id, id));

    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    await db.delete(movies).where(eq(movies.id, id));

    return res.status(200).json({ success: true, message: "Movie deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting movie:", error);
    return res.status(500).json({ success: false, message: "Internal server error", error });
  }
};


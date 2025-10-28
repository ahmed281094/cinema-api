import type { Request,Response } from "express"
import { db } from "../../db/DBconnection.js"
import { halls } from "../../db/schema.js"
import { eq } from "drizzle-orm"


export const addHall = async (req:Request,res:Response)=>{
try {
    const { name,totalRows,totalColumns}=req.body
    const existingHall = await db.query.halls.findFirst({
      where: eq(halls.name, name),
    });

    if (existingHall) {
      return res.status(400).json({ success: false, message: "Hall already exists" });
    }
    const [hall] = await db.insert(halls).values({
        name,
        totalRows,
        totalColumns
    }).returning()

     return res.status(201).json({ success: true,message:"hall created successfully" ,hall })
} catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error })
}
}

export const getAllHalls = async (req:Request,res:Response)=>{
try {
    const hall = await db.select().from(halls)

     return res.status(201).json({ success: true,message:"done" ,hall })
} catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error })
}
}



export const updateHall = async (req: Request, res: Response) => {
  try {
    const  hallId  = Number(req.params.id);
    const { name, totalRows, totalColumns } = req.body;

    const [existingHall] = await db.select().from(halls).where(eq(halls.id, hallId));
    if (!existingHall) {
      return res.status(404).json({ success: false, message: "Hall not found" });
    }
    await db
      .update(halls)
      .set({
        name:name ?? name ,
        totalRows:totalRows?? totalRows,
        totalColumns:totalColumns?? totalColumns ,
      })
      .where(eq(halls.id, hallId)).returning()
    const updatedHall = await db.select().from(halls).where(eq(halls.id, hallId));

    return res.json({
      success: true,
      message: "Hall updated successfully",
      data: updatedHall[0],
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};


export const deleteHall = async (req: Request, res: Response) => {
  try {
       const  hallId  = Number(req.params.id);

    const [existingHall] = await db.select().from(halls).where(eq(halls.id, hallId));
    if (!existingHall) {
      return res.status(404).json({ success: false, message: "Hall not found" });
    }
    await db.delete(halls).where(eq(halls.id, hallId))
    return res.json({
      success: true,
      message: "Hall deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error })
  }
};
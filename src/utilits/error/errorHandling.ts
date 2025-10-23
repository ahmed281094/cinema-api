import type { Request, Response, NextFunction } from "express"

export const globalErrorHandling = (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(err["cause"] || 500).json({
        message: err.message,
        stack: err.stack,

    })
}
import { NextFunction, Request, Response } from 'express';

export function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error('Database error:', error);
    const sqlMessage = error.sqlMessage || 'Unknown database error';
    res.status(400).json({ message: sqlMessage });
}
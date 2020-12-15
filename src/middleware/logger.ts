import { Request, Response, NextFunction } from 'express';

export default function logger(req: Request,
  _: Response,
  next: NextFunction
): void {
  console.log(`[ ${req.method.toUpperCase()} ] :: ${req.url} - ${new Date().toUTCString()}`);
  next();
}
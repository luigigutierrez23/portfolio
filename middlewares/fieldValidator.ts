import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
 * Validate fields with express-validator 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const validateFields = (req:Request, res:Response, next:any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

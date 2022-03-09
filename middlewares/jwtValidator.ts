import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

/** Models */
import User from "../models/user.model";

/**
 * Validate JWT
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const validateJWT = async (req: Request, res: Response, next:any) => {
  const token = req.header('tokenKey');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const payload:any = jwt.verify(token, process.env.SECRETKEY);

    //Read user
    const user = await User.findById(payload.uid);

    if (!user) {
      return res.status(401).json({
        msg: 'User not found',
      });
    }

    //Verify if user is active
    if (!user.status) {
      return res.status(401).json({
        msg: 'Inactive user',
      });
    }

    // req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token not valid',
    });
  }
};

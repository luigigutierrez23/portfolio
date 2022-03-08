import { Response, Request } from "express";
import { compareSync } from 'bcryptjs'

import User from '../models/user.model';
import { getJWT } from "../helpers/jwtHelper";


/**
 * Login user
 * @param req 
 * @param res 
 */
export const Login = async (req:Request, res:Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                msg: 'User incorrect.',
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'Inactive user',
            });
        }

        const validPassword = compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                msg: 'Password incorrect',
            });
        }

        const token = await getJWT(user.id);

        res.json({
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        msg: 'Something was wrong.',
        });
    }
}
 
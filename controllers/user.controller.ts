import { Response, Request } from "express";
import {genSaltSync, hashSync} from 'bcryptjs';

import User from "../models/user.model";

/**
 * Get all users
 * @param req 
 * @param res 
 */
export const getUsers = async (req:Request, res:Response) => {
    const query = { status: true };

    const users = await User.find(query);

    res.json({
        users,
    });
}

/**
 * Get User by id
 * @param req 
 * @param res 
 */
export const getUser = async (req:Request, res:Response) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, status:true });

    res.json(user);
}

/**
 * Create a new user
 * @param req 
 * @param res 
 */
export const createUser = async (req:Request, res:Response) => {

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    /** Encrypt password */
    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    //Save user
    await user.save();
    res.json({
        user,
    });
}

/**
 * Edit user
 * @param req 
 * @param res 
 */
export const editUser = async (req:Request, res:Response) => {
    const id = req.params.id;
    const { _id, password, ...user } = req.body;

    //TODO: Valid with DB
    if (password) {
        const salt = genSaltSync();
        user.password = hashSync(password, salt);
    }

    const existEmail = await User.findOne({ email: user.email });
    if(existEmail && (existEmail._id.toString() !== id.toString())){
        return res.status(400).json({
            message: 'Email is already exist',
        });
    }
    
    //Save changes
    const userDB = await User.findByIdAndUpdate(id, user, { new:true });
    res.json(userDB);
}

/**
 * Delete user
 * @param req 
 * @param res 
 */
export const deleteUser = async (req:Request, res:Response) => {
    const { id } = req.params;

    //Change status false and keep the record.
    const user = await User.findByIdAndUpdate(id, { status: false }, { new:true });
  
    res.json(user);
}
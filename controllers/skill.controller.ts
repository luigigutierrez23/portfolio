import { Response, Request } from "express";

import Skill from "../models/skill.model";

/**
 * Get all skills
 * @param req 
 * @param res 
 */
export const getSkills = async (req:Request, res:Response) => {
   
    const projects = await Skill.find();

    res.json({
        projects,
    });
}

/**
 * Get skill by id
 * @param req 
 * @param res 
 */
export const getSkill = async (req:Request, res:Response) => {
    const { id } = req.params;

    const project = await Skill.findOne({ _id: id });

    res.json(project);
}

/**
 * Create a new skill
 * @param req 
 * @param res 
 */
export const createSkill = async (req:Request, res:Response) => {

    const { name, email, password } = req.body;
    const project = new Skill({ name, email, password });

    //Save user
    await project.save();
    res.json({
        project,
    });
}

/**
 * Edit skill
 * @param req 
 * @param res 
 */
export const editSkill = async (req:Request, res:Response) => {
    const id = req.params.id;
    const { _id, password, ...user } = req.body;

    const existEmail = await Skill.findOne({ email: user.email });
    if(existEmail && (existEmail._id.toString() !== id.toString())){
        return res.status(400).json({
            message: 'Email is already exist',
        });
    }
    
    //Save changes
    const userDB = await Skill.findByIdAndUpdate(id, user, { new:true });
    res.json(userDB);
}

/**
 * Delete skill
 * @param req 
 * @param res 
 */
export const deleteSkill = async (req:Request, res:Response) => {
    const { id } = req.params;

    //Change status false and keep the record.
    const user = await Skill.findByIdAndUpdate(id, { status: false }, { new:true });
  
    res.json(user);
}
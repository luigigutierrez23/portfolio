import { Response, Request } from "express";

/** Models */
import Skill from "../models/skill.model";

/**
 * Get all skills
 * @param req 
 * @param res 
 */
export const getSkills = async (req:Request, res:Response) => {
   
    const skills = await Skill.find();

    res.json(skills);
}

/**
 * Get skill by id
 * @param req 
 * @param res 
 */
export const getSkill = async (req:Request, res:Response) => {
    const { id } = req.params;

    const skill = await Skill.findOne({ _id: id });

    res.json(skill);
}

/**
 * Create a new skill
 * @param req 
 * @param res 
 */
export const createSkill = async (req:Request, res:Response) => {

    const { title, description, value } = req.body;
    const skill = new Skill({ title, description, value });

    //Save user
    await skill.save();
    res.json({
        skill,
    });
}

/**
 * Edit skill
 * @param req 
 * @param res 
 */
export const editSkill = async (req:Request, res:Response) => {
    const id = req.params.id;
    const { _id, ...skill } = req.body;

    const existSkill = await Skill.findOne({ title: skill.title });
    if(existSkill && (existSkill._id.toString() !== id.toString())){
        return res.status(400).json({
            message: 'Skill is already exist',
        });
    }
    
    //Save changes
    const skillDB = await Skill.findByIdAndUpdate(id, skill, { new:true });
    res.json(skillDB);
}

/**
 * Delete skill
 * @param req 
 * @param res 
 */
export const deleteSkill = async (req:Request, res:Response) => {
    const { id } = req.params;

    //Change status false and keep the record.
    const skill = await Skill.findByIdAndUpdate(id, { status: false }, { new:true });
  
    res.json(skill);
}
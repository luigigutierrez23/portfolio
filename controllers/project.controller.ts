import { Response, Request } from "express";

import Project from "../models/project.model";

/**
 * Get all projects
 * @param req 
 * @param res 
 */
export const getProjects = async (req:Request, res:Response) => {
   
    const projects = await Project.find();

    res.json({
        projects,
    });
}

/**
 * Get project by id
 * @param req 
 * @param res 
 */
export const getProject = async (req:Request, res:Response) => {
    const { id } = req.params;

    const project = await Project.findOne({ _id: id });

    res.json(project);
}

/**
 * Create a new project
 * @param req 
 * @param res 
 */
export const createProject = async (req:Request, res:Response) => {

    const { name, email, password } = req.body;
    const project = new Project({ name, email, password });

    //Save user
    await project.save();
    res.json({
        project,
    });
}

/**
 * Edit project
 * @param req 
 * @param res 
 */
export const editProject = async (req:Request, res:Response) => {
    const id = req.params.id;
    const { _id, password, ...user } = req.body;

    const existEmail = await Project.findOne({ email: user.email });
    if(existEmail && (existEmail._id.toString() !== id.toString())){
        return res.status(400).json({
            message: 'Email is already exist',
        });
    }
    
    //Save changes
    const userDB = await Project.findByIdAndUpdate(id, user, { new:true });
    res.json(userDB);
}

/**
 * Delete project
 * @param req 
 * @param res 
 */
export const deleteProject = async (req:Request, res:Response) => {
    const { id } = req.params;

    //Change status false and keep the record.
    const user = await Project.findByIdAndUpdate(id, { status: false }, { new:true });
  
    res.json(user);
}
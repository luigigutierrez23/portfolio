import { Response, Request } from "express";

import Project from '../models/project.model';

/**
 * Get all projects
 * @param req 
 * @param res 
 */
export const getProjects = async (req:Request, res:Response) => {
   
    const projects = await Project.find({ status:true })
        .populate('categories')
        .populate('skills');

    res.json(projects);
}

/**
 * Get project by id
 * @param req 
 * @param res 
 */
export const getProject = async (req:Request, res:Response) => {
    const { id } = req.params;

    const project = await Project.findOne({ _id: id, status: true })
        .populate('categories')
        .populate('skills');

    res.json(project);
}

/**
 * Create a new project
 * @param req 
 * @param res 
 */
export const createProject = async (req:Request, res:Response) => {

    const { title, description, images, avatar, date, categories, skills, progress } = req.body;
    const project = new Project({ title, description, images, avatar, date, categories, skills, progress });

    console.log(project);
    
    //Save user
    await project.save();
    res.json(project);
}

/**
 * Edit project
 * @param req 
 * @param res 
 */
export const editProject = async (req:Request, res:Response) => {
    const id = req.params.id;
    const { _id, ...project } = req.body;
    
    //Save changes
    const projectDB = await Project.findByIdAndUpdate(id, project, { new:true });
    res.json(projectDB);
}

/**
 * Delete project
 * @param req 
 * @param res 
 */
export const deleteProject = async (req:Request, res:Response) => {
    const { id } = req.params;

    //Change status false and keep the record.
    const project = await Project.findByIdAndUpdate(id, { status: false }, { new:true });
  
    res.json(project);
}
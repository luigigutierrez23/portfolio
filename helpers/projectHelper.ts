import Project from "../models/project.model";

/**
 * Verify if project exist
 * @param id 
 */
export const existProjectById = async (id = '') => {
    const exist = await Project.findById(id);
  
    if (!exist) {
      throw new Error(`Project id: ${id} doesn't exist.`);
    }
};
  
/**
 * Verify if project exist by status
 * @param id 
 */
export const existProjectByStatus = async (id = '') => {
    const exist = await Project.findOne({_id: id, status:true});
    
    if (!exist) {
      throw new Error(`Project id: ${id} doesn't exist.`);
    }
};
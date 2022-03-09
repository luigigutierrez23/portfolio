import Skill from "../models/skill.model";

/****
 * 
 *  Skill Helpers
 * 
 */

/**
 * Verify if skill exist
 * @param id 
 */
export const existSkillById = async (id = '') => {
    const exist = await Skill.findById(id);
  
    if (!exist) {
      throw new Error(`Skill id: ${id} doesn't exist.`);
    }
};
  
/**
 * Verify if skill exist by status
 * @param id 
 */
export const existSkillByStatus = async (id = '') => {
    const exist = await Skill.findOne({_id: id, status:true});
    
    if (!exist) {
      throw new Error(`Skill id: ${id} doesn't exist.`);
    }
};
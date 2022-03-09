import Category from "../models/category.model";

/**
 * Verify if category exist
 * @param id 
 */
export const existCategoryById = async (id = '') => {
    const exist = await Category.findById(id);
  
    if (!exist) {
      throw new Error(`Category id: ${id} doesn't exist.`);
    }
};
  
/**
 * Verify if user exist by status
 * @param id 
 */
export const existCategoryByStatus = async (id = '') => {
    const exist = await Category.findOne({_id: id, status:true});
    
    if (!exist) {
      throw new Error(`Category id: ${id} doesn't exist.`);
    }
};
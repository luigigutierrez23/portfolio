import Category from "../models/category.model";
import User from "../models/user.model";

/****
 * 
 *  User Helpers
 * 
 */

/**
 * Verify if email exist
 * @param email 
 */
export const existEmail = async (email:string) => {
    const exist = await User.findOne({ email });

    if (exist) {
        throw new Error(`Email: ${email} is already registered.`);
    }
};

/**
 * Verify if user exist
 * @param id 
 */
export const existUserById = async (id = '') => {
    const exist = await User.findById(id);
  
    if (!exist) {
      throw new Error(`User id: ${id} doesn't exist.`);
    }
};

/**
 * Verify if user exist by status
 * @param id 
 */
export const existUserByStatus = async (id = '') => {
  const exist = await User.findOne({_id: id, status:true});
  
  if (!exist) {
    throw new Error(`User id: ${id} doesn't exist.`);
  }
};

/****
 * 
 *  Category Helpers
 * 
 */

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
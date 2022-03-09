import { Response, Request } from "express";

/** Models */
import Category from "../models/category.model";

/**
 * Get all categories
 * @param req 
 * @param res 
 */
export const getCategories = async (req:Request, res:Response) => {
   
    const categories = await Category.find({status: true});

    res.json(categories);
}

/**
 * Get category by id
 * @param req 
 * @param res 
 */
export const getCategory = async (req:Request, res:Response) => {
    const { id } = req.params;

    const category = await Category.findOne({ _id: id, status: true });

    res.json(category);
}

/**
 * Create a new category
 * @param req 
 * @param res 
 */
export const createCategory = async (req:Request, res:Response) => {

    const { title, description } = req.body;
    const category = new Category({  title, description });

    //Save user
    await category.save();
    res.json({
        category,
    });
}

/**
 * Edit category
 * @param req 
 * @param res 
 */
export const editCategory = async (req:Request, res:Response) => {
    const id = req.params.id;
    const { _id, ...category } = req.body;

    const existCategory = await Category.findOne({ title: category.title });
    if(existCategory && (existCategory._id.toString() !== id.toString())){
        return res.status(400).json({
            message: 'Category is already exist',
        });
    }
    
    //Save changes
    const categoryDB = await Category.findByIdAndUpdate(id, category, { new:true });
    res.json(categoryDB);
}

/**
 * Delete category
 * @param req 
 * @param res 
 */
export const deleteCategory = async (req:Request, res:Response) => {
    const { id } = req.params;

    //Change status false and keep the record.
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new:true });
  
    res.json(category);
}
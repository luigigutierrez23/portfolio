import { Schema, model } from 'mongoose';
import { Category } from '../common/types/models/category';

const schema =  new Schema<Category>({   
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
      type: String,
      required: [true, 'Description is required']
  },
  status: {
      type: Boolean,
      default: true
  }
});

schema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

const Category = model<Category>('Category', schema);

export default Category;

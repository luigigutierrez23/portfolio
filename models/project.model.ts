import { Schema, model, Types } from 'mongoose';
import { Project } from '../common/types/models/project';

const schema =  new Schema<Project>({   
  title: {
    type: String,
    required: [true, 'Name is required'],
  },
  description: {
      type: String,
      required: [true, 'Description is required']
  },
  date: {
      type: String,
      required: [true, 'Date is required']
  },
  images: {
      type: [String]
  },
  categories: {
      type: [{ type: Types.ObjectId, ref: 'Category'}],
      required:[true, 'Categories are required'] 
  },
  skills : {
    type: [{ type: Types.ObjectId, ref: 'Skill'}],
    required: [true, 'Skills are required']
  },
  status: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type:String,
  },
  progress: {
    type: Number,
    required: [true, 'Progress is required']
  }
});

schema.methods.toJSON = function () {
  const { __v, _id, ...project } = this.toObject();
  project.uid = _id;
  return project;
};

const Project = model<Project>('Project', schema);

export default Project;

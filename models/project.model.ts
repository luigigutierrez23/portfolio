import { Schema, model } from 'mongoose';
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
  category: {
      type: String,
      required:[true, 'Category is required'] 
  },
  status: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type:String,
  },
  progress: {
    type: String,
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

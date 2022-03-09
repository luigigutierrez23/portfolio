import { Schema, model } from 'mongoose';

import { Skill } from '../common/types/models/skill';

const schema =  new Schema<Skill>({   
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
      type: String,
      required: [true, 'Description is required']
  },
  value: {
      type: Number,
      required: [true, 'Value is required']
  },
  status: {
      type: Boolean,
      default: true
  }
});

schema.methods.toJSON = function () {
  const { __v, _id, ...skill } = this.toObject();
  skill.uid = _id;
  return skill;
};

const Skill = model<Skill>('Skill', schema);

export default Skill;

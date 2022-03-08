import { Schema, model } from 'mongoose';

const schema =  new Schema<User>({   
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  avatar:{
    type:String,
  }
});

schema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

const User = model<User>('User', schema);

export default User;

// module.exports = model('User', UserSchema);

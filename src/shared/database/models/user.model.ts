import mongoose, { Document, Model } from 'mongoose';

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED'
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (_, ret): void => {
      ret.id = ret._id;

      delete ret._id;
      delete ret.__v;
    }
  }
});

userSchema.path('email').validate(async (email: string): Promise<boolean> => {
  const emailCount: number = await mongoose.models.User.countDocuments({ email });

  return !emailCount;
},
  'already exists in the database.',
  CUSTOM_VALIDATION.DUPLICATED
);

export interface UserModel extends Omit<User, '_id'>, Document {}

export const User: Model<UserModel> = mongoose.model<UserModel>('User', userSchema);
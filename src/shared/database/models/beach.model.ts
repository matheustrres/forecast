import mongoose, { Document, Model } from 'mongoose';

export enum BeachPosition {
  S = 'South',
  E = 'East',
  W = 'West',
  N = 'North'
}

export interface Beach {
  _id?: string;
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
}

const beachSchema = new mongoose.Schema<Beach>({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    enum: BeachPosition,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
}, {
  toJSON: {
    transform: (_, ret): void => {
      ret.id = ret._id.toString();

      delete ret._id;
      delete ret.__v;
    }
  }
});

export interface BeachModel extends Omit<Beach, '_id'>, Document {}

export const Beach: Model<BeachModel> = mongoose.model<BeachModel>('beaches', beachSchema);
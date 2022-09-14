import mongoose, { Mongoose } from 'mongoose';
import config, { IConfig } from 'config';

const dbConfig: IConfig = config.get('app.database');

export const connectDb = async (): Promise<Mongoose> => await mongoose.connect(dbConfig.get('mongoUrl'));

export const closeDb = (): Promise<void> => mongoose.connection.close();
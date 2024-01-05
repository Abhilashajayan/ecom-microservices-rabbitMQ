import mongoose from "mongoose";

type ConnectionURI = string;

export const dbConnection = async (uri: ConnectionURI) => {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(uri);
      console.log('Database is connected');
    } catch (err) {
      console.error('Connection failed:', err);
    }
};

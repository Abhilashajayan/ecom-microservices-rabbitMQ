import mongoose from "mongoose";

type ConnectionURI = string;

export const dbConnection = async () => {
  let uri:ConnectionURI= 'mongodb+srv://abhilashajayan2001:gy0Ys7PoOhAHLJq8@cluster0.l5qc1sa.mongodb.net/'
 
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(uri);
      console.log('Database is connected');
    } catch (err) {
      console.error('Connection failed:', err);
    }
};


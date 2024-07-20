import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongoogeConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongoogeConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("Missing MongoDB Url");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, { dbName: "Imagify", bufferCommands: false });

  cached.conn = await cached.promise;
  return cached.conn;
};

import mongoose from "mongoose";

const connectDB = async ()=>{
const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chapter-blog';
await mongoose.connect(connUri);

};
export default connectDB;


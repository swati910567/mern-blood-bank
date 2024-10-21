import mongoose from "mongoose";
import colors from 'colors';

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`mongodb database error ${error}`)
    }
}
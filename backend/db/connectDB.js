import mongoose from "mongoose";

export const connectDB = async () => {
    try{
    
       const instance = await mongoose.connect(process.env.MONGODB_URI)
       console.log(`Mongo DB is connected succesfully`,instance.connection.host)
        
    } catch (error) {
        console.log(`Error connection to MongoDB :`,error)
        process.exit(1) // 1 is failure
    }

}
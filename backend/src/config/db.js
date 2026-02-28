import mongoose from "mongoose"; 

export const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("successfully connected to MongoDB")
        
    } catch (error) {
        console.log("Error to Connecting to Database ",error)
        process.exit(1) //exit with failure
        
    }

}
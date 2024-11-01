import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log("Errr connecting to MongoDB", error.message)
        process.exit(1) // 1 is failure, 0 is success
    }
}
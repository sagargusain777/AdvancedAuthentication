import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js"
import authRoutes from "./routes/auth.route.js"
dotenv.config()
const app = express();

await connectDB();
app.use(express.json());

app.use("/api/auth",authRoutes)
app.get("/",(req,res)=>{
    res.send("Hello World!")
})
app.listen(3000,()=>{
   
    console.log("Server is running in port 3000");
})




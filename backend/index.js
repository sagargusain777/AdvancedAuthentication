import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./db/connectDB.js"
import authRoutes from "./routes/auth.route.js"
dotenv.config()
const app = express();

await connectDB();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes)
app.get("/",(req,res)=>{
    res.send("Hello World!")
})
app.listen(3000,()=>{
   
    console.log("Server is running in port 3000");
})




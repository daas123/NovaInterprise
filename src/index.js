import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001 ; 

// Middlewares
app.use(express.json());
app.use(cors());

// Routes

//Error Handling Middleware

// Server running
app.listen(port,()=>{
    console.log(`server running on port: ${port}`);
});
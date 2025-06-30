import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import errorHanling from "./middlewares/errorHandler.js";
import createBuildingDatabaseTable from "./data/configDatabaseTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001 ; 

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api",userRoutes);

//Error Handling Middleware
app.use(errorHanling);

const startServer = async () => {
  try {
    // Create required tables before starting the server
    await createBuildingDatabaseTable();

    // Test DB connection (optional)
    const result = await pool.query("SELECT current_database()");
    console.log(`📦 Connected to DB: ${result.rows[0].current_database}`);

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server running on port: ${port}`);
    });
  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
};

startServer();

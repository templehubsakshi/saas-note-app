// import dotenv from "dotenv";
// import app from "./src/app.js";
// import connectDB from "./src/config/db.js";

// // Load .env variables
// dotenv.config();

// const PORT = process.env.PORT || 3000;

// // Connect to MongoDB first
// connectDB().then(() => {
//   // Start server only after DB is connected
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });
// import dotenv from "dotenv";
// import app from "./src/app.js";
// import connectDB from "./src/config/db.js";

// dotenv.config();

// // Connect DB first
// connectDB().then(() => {
//   console.log("MongoDB connected");
// });

// // Vercel serverless handler
// export default function handler(req, res) {
//   app(req, res);
// }
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./src/app.js";

let cachedDb = null;

// Connect to MongoDB (with caching to avoid multiple connections)
async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = conn;
  return conn;
}

// Vercel Serverless handler
export default async function handler(req, res) {
  try {
    await connectToDatabase(); // ensure DB is connected
    app(req, res); // call Express app
  } catch (error) {
    console.error("Serverless function error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


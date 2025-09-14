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
import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

// Connect DB first
connectDB().then(() => {
  console.log("MongoDB connected");
});

// Vercel serverless handler
export default function handler(req, res) {
  app(req, res);
}


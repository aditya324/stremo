import express from "express";
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.routes.js"
import chatRouter from "./routes/chat.route.js"
import { connectDb } from "./lib/db.js";
import cors from "cors"
import path from "path";

import cookieParser from "cookie-parser"


dotenv.config()

const app = express();


app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))


const PORT = process.env.PORT || 5000


const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRouter)

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
  connectDb()
});

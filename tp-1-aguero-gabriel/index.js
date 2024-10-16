import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import usersRoute from "./routes/usersRoute.js";
import gameRoutes from "./routes/gameRoutes.js";
import authRoutes from "./routes/authRoutes.js";

mongoose
        .connect(process.env.MONGO_DEPLOY)
        .then(() => console.log("conectado a DB"))
        .catch(() => console.log("error al conectar a la base de datos"));


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/games", gameRoutes)
app.use("/users", usersRoute)
app.use("/login", authRoutes)

const port = process.env.PORT || 3002;
app.listen(port)
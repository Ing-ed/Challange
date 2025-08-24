import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
// componentes
import sessionRouter from "./Router/sessions.router.js";
import taskRouter from "./Router/tasks.router.js"

//utilidades
import __dirname from "./utils.js";

//configuracion de variables de entorno
dotenv.config();

mongoose.connect(process.env.MONGOCREDENTIALS);

//crear servidor http
const app = express();
app.use(express.urlencoded( {extended : true}));
app.set('views', __dirname+'/views');
app.use(express.json());
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

app.get("/",(req,res) =>{
  res.send("OK, server corriendo")
})

app.use("/api/sessions",sessionRouter)
app.use("/api/tasks",taskRouter)

// app.listen(8080);

export default app
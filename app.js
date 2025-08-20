import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.use("/api/sessions",sessionRouter)
app.use("/api/tasks",taskRouter)

app.listen(8080);

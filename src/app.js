'use strict';
import chalk from "chalk";
import express from "express";
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await connectDB();

conexao.on("error", (erro)=>{
    console.error("Erro de conexão", erro);
});

console.log(chalk.green("[INFO] Successfully connected to the database"));

const app = express();
routes(app);

export default app;

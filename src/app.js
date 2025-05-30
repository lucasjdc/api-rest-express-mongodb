'use strict';
import chalk from "chalk";
import express from "express";
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await connectDB();

conexao.on("error", (erro)=>{
    console.error("Erro de conexão", erro);
});

console.log(chalk.green("[INFO] Successfully connected to the database"));

const app = express();
routes(app);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;

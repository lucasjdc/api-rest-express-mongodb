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

// Deletar libro
app.delete("/livros/:id", async (req, res) => {
    try {
        const livroRemovido = await Livro.findByIdAndDelete(req.params.id);
        if (!livroRemovido) return res.status(404).json( {message: "Livro não encontrado."});
        res.status(200).json( { message: "Livro removido com sucesso" });
    } catch (error) {
        res.status(400).json( { message: "ID inválido" });
    }
});

export default app;


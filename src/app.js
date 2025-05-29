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

// Buscar livro por autor
app.get("/livros/autor/:nome", async (req, res) => {
    try {
        const livros = await Livro.find({ autor: req.params.nome });
        if (!livros || livros.length === 0) {
            return res.status(404).json({ message: "Nenhum livro encontrado para esse autor." });            
        }
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar livros pelo autor."});
    }
});

// Atualizar livro
app.put("/livros/:id", async (req, res) => {
    try {
        const livroAtualizado = await Livro.findByIdAndUpdate(
            req.params.id,
            { titulo: req.body.titulo },
            { new: true, runValidators: true }
        );
        if (!livroAtualizado) return res.status(404).json({ message: "Livro não encontrado."});
        res.status(200).json(livroAtualizado);
    } catch (error) {
        res.status(400).json( { message: "ID inválido" });
    }
});

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


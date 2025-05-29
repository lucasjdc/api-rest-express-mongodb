'use strict';
import Livro from "../models/Livro.js";
import chalk from "chalk";

class LivroController {

    static async listarLivros(req, res) {
        try {
            const livros = await Livro.find({});
            res.status(200).json(livros);
            console.log(chalk.green(`[GET /livros] ${livros.length} livro(s) encontrado(s).`));
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(chalk.red(`[GET /livros] Erro ao buscar livros.`));
        }
    }

    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = new Livro({ titulo: req.body.titulo });
            await novoLivro.save();
            res.status(201).json(novoLivro);
            console.log(chalk.green(`[POST /livros] Novo livro cadastrado com sucesso.`));
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(chalk.red(`[GET /livros] Falha ao cadastrar o livro.`));
        }
    }

};

export default LivroController;
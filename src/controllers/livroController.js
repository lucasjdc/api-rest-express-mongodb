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

    static async listarLivrosPorAutor(req, res) {
        const autor = req.params.nome;
        try {
            const livros = await Livro.find({ autor });
            if (!livros || livros.length === 0) {
                return res.status(404).json({ message: "Nenhum livro encontrado para esse autor." });
            }
            res.status(200).json(livros);
            console.log(chalk.green(`Livro(s) do(a) autor(a) ${autor} encontrado(s).`));
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar livros pelo autor." });
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const livroAtualizado = await Livro.findByIdAndUpdate(
                req.params.id,
                { titulo: req.body.titulo },
                { new: true, runValidators: true }
            );
            if (!livroAtualizado) return res.status(404).json({ message: "Livro não encontrado." });
            res.status(200).json(livroAtualizado);
            console.log("Livro atualizado.");
        } catch (error) {
            res.status(400).json({ message: "ID inválido" });
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
            console.log(chalk.red(`[POST /livros] Falha ao cadastrar o livro.`));
        }
    }
};

export default LivroController;
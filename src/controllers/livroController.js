'use strict';
import Livro from "../models/Livro.js";
import chalk from "chalk";
import Autor from "../models/Autor.js";

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

    static async listarLivroPorId(req, res) {
        const id = req.params.id;
        try {
            const livro = await Livro.findById(id);
            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado." });
            }
            res.status(200).json(livro);
            console.log(chalk.green(`[GET /livros/${id}] Livro encontrado.`));
        } catch (error) {
            res.status(400).json({ message: "ID inválido." });
            console.log(chalk.red(`[GET /livros/${id}] Erro ao buscar livro.`));
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
        const novoLivro = req.body;
        try {
            const autorEncontrado = await Autor.findById(novoLivro.autor);         
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
            const livroCriado = await Livro.create(livroCompleto);
            res.status(201).json(novoLivro);
            console.log(chalk.green(`[POST /livros] Novo livro cadastrado com sucesso.`));
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(chalk.red(`[POST /livros] Falha ao cadastrar o livro.`));
        }
    }

    static async excluirLivro(req, res) {
        try {
            const livroRemovido = await Livro.findByIdAndDelete(req.params.id);
            if (!livroRemovido) return res.status(404).json({ message: "Livro não encontrado." });
            res.status(200).json({ message: "Livro removido com sucesso" });
        } catch (error) {
            res.status(400).json({ message: "ID inválido" });
        }
    }
};

export default LivroController;

'use strict';
import Livro from "../models/Livro.js";
import chalk from "chalk";

class LivroController {

    static async listarLivros(req, res, next) {
        try {
            const livros = await Livro.find({});
            res.status(200).json(livros);
            console.log(chalk.green(`[GET /livros] ${livros.length} livro(s) encontrado(s).`));
        } catch (error) {
            next(error);
        }
    }

    static async listarLivroPorId(req, res, next) {
        const id = req.params.id;
        try {
            const livro = await Livro.findById(id);
            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado." });
            }
            res.status(200).json(livro);
            console.log(chalk.green(`[GET /livros/${id}] Livro encontrado.`));
        } catch (error) {
            next(error);
        }
    }

    static async atualizarLivro(req, res, next) {
        try {
            const livroAtualizado = await Livro.findByIdAndUpdate(
                req.params.id,
                { titulo: req.body.titulo },
                { new: true, runValidators: true }
            );
            if (!livroAtualizado) {
                return res.status(404).json({ message: "Livro não encontrado." });
            }
            res.status(200).json(livroAtualizado);
            console.log(chalk.green(`[PUT /livros/${req.params.id}] Livro atualizado.`));
        } catch (error) {
            next(error)
        }
    }

    static async cadastrarLivro(req, res, next) {
        try {
            const livroCriado = await Livro.create(req.body);
            res.status(201).json(livroCriado);
            console.log(chalk.green(`[POST /livros] Novo livro cadastrado com sucesso: ${livroCriado._id}`));
        } catch (error) {
            next(error); // erros de required e cast vão direto pro manipulador
        }
    }

    static async excluirLivro(req, res, next) {
        try {
            const livroRemovido = await Livro.findByIdAndDelete(req.params.id);
            if (!livroRemovido) {
                return res.status(404).json({ message: "Livro não encontrado." });
            }
            res.status(200).json({ message: "Livro removido com sucesso" });
            console.log(chalk.green(`[DELETE /livros/${req.params.id}] Livro removido.`));
        } catch (error) {
            next(error);
        }
    }

    static async listarLivroPorEditora(req, res, next) {
        const editora = req.query.editora;

        if (!editora) {
            return res.status(400).json({ message: "Editora não informada na query." });
        }

        try {
            const livrosPorEditora = await Livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
            console.log(chalk.green(`[GET /livros?editora=${editora}] ${livrosPorEditora.length} livro(s) encontrado(s).`));
        } catch (error) {
            next(error);
        }
    }
};

export default LivroController;

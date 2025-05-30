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
            console.log(chalk.red(`[GET /livros] Erro ao buscar livros: ${error.message}`));
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
            res.status(400).json({ message: "ID inválido.", error: error.message });
            console.log(chalk.red(`[GET /livros/${id}] Erro ao buscar livro: ${error.message}`));
        }
    }

    static async atualizarLivro(req, res) {
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
            res.status(400).json({ message: "ID inválido", error: error.message });
            console.log(chalk.red(`[PUT /livros/${req.params.id}] Erro ao atualizar livro: ${error.message}`));
        }
    }

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await Autor.findById(novoLivro.autor);
            if (!autorEncontrado) {
                return res.status(404).json({ message: "Autor não encontrado." });
            }

            // Se o schema do Livro espera só o ID do autor, podemos criar direto assim:
            const livroCriado = await Livro.create(novoLivro);

            res.status(201).json(livroCriado);
            console.log(chalk.green(`[POST /livros] Novo livro cadastrado com sucesso: ${livroCriado._id}`));
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(chalk.red(`[POST /livros] Falha ao cadastrar o livro: ${error.message}`));
        }
    }

    static async excluirLivro(req, res) {
        try {
            const livroRemovido = await Livro.findByIdAndDelete(req.params.id);
            if (!livroRemovido) {
                return res.status(404).json({ message: "Livro não encontrado." });
            }
            res.status(200).json({ message: "Livro removido com sucesso" });
            console.log(chalk.green(`[DELETE /livros/${req.params.id}] Livro removido.`));
        } catch (error) {
            res.status(400).json({ message: "ID inválido", error: error.message });
            console.log(chalk.red(`[DELETE /livros/${req.params.id}] Erro ao remover livro: ${error.message}`));
        }
    }

    static async listarLivroPorEditora(req, res) {
        const editora = req.query.editora;

        if (!editora) {
            return res.status(400).json({ message: "Editora não informada na query." });
        }

        try {
            const livrosPorEditora = await Livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
            console.log(chalk.green(`[GET /livros?editora=${editora}] ${livrosPorEditora.length} livro(s) encontrado(s).`));
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na busca` });
            console.log(chalk.red(`[GET /livros?editora=${editora}] Erro ao buscar livros por editora: ${error.message}`));
        }
    }
};

export default LivroController;

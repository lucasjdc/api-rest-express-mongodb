'use strict';
import Autor from "../models/Autor.js";
import chalk from "chalk";

class AutorController {

    static async listarAutores(req, res) {
        try {
            const autores = await Autor.find({});
            res.status(200).json(autores);
            console.log(chalk.green(`[GET /autores] ${autores.length} autor(es) encontrado(s).`));
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(chalk.red(`[GET /autores] Erro ao buscar autores.`));
        }
    }

    static async listarAutorPorId(req, res) {
        const id = req.params.id;
        try {
            const autor = await Autor.findById(id);
            if (!autor) {
                return res.status(404).json({ message: "Autor não encontrado." });
            }
            res.status(200).json(autor);
            console.log(chalk.green(`[GET /autores/${id}] Autor encontrado.`));
        } catch (error) {
            res.status(400).json({ message: "ID inválido." });
            console.log(chalk.red(`[GET /autores/${id}] Erro ao buscar autor.`));
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = new Autor(req.body);
            await novoAutor.save();
            res.status(201).json(novoAutor);
            console.log(chalk.green(`[POST /autores] Novo autor cadastrado com sucesso.`));
        } catch (error) {
            res.status(400).json({ message: error.message });
            console.log(chalk.red(`[POST /autores] Falha ao cadastrar o autor.`));
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const autorAtualizado = await Autor.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!autorAtualizado) return res.status(404).json({ message: "Autor não encontrado." });
            res.status(200).json(autorAtualizado);
            console.log(chalk.green(`[PUT /autores/${req.params.id}] Autor atualizado.`));
        } catch (error) {
            res.status(400).json({ message: "ID inválido" });
            console.log(chalk.red(`[PUT /autores/${req.params.id}] Erro ao atualizar autor.`));
        }
    }

    static async excluirAutor(req, res) {
        try {
            const autorRemovido = await Autor.findByIdAndDelete(req.params.id);
            if (!autorRemovido) return res.status(404).json({ message: "Autor não encontrado." });
            res.status(200).json({ message: "Autor removido com sucesso" });
            console.log(chalk.green(`[DELETE /autores/${req.params.id}] Autor removido.`));
        } catch (error) {
            res.status(400).json({ message: "ID inválido" });
            console.log(chalk.red(`[DELETE /autores/${req.params.id}] Erro ao remover autor.`));
        }
    }
};

export default AutorController;

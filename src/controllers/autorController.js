import Autor from "../models/Autor.js";
import chalk from "chalk";

class AutorController {

    static async listarAutores(req, res) {
        try {
            const autores = await Autor.find({});
            console.log(chalk.green(`[GET /autores] ${autores.length} autor(es) encontrado(s).`));
            res.status(200).json(autores);
        } catch (error) {
            console.log(chalk.red(`[GET /autores] Erro ao buscar autores: ${error.message}`));
            res.status(500).json({ message: error.message });
        }
    }    

    static async listarAutorPorId(req, res) {
        const id = req.params.id;
        try {
            const autor = await Autor.findById(id);
            if (!autor) {
                return res.status(404).json({ message: "Autor não encontrado." });
            }
            console.log(chalk.green(`[GET /autores/${id}] Autor encontrado.`));
            res.status(200).json(autor);
        } catch (error) {
            console.log(chalk.red(`[GET /autores/${id}] Erro ao buscar autor: ${error.message}`));
            if (error.name === 'CastError') {
                // Erro no formato do ID, retorna 400
                return res.status(400).json({ message: "ID inválido." });
            }
            // Qualquer outro erro é erro interno do servidor
            return res.status(500).json({ message: "Erro interno de servidor." });
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = new Autor(req.body);
            await novoAutor.save();
            console.log(chalk.green(`[POST /autores] Novo autor cadastrado com sucesso.`));
            res.status(201).json(novoAutor);
        } catch (error) {
            console.log(chalk.red(`[POST /autores] Falha ao cadastrar o autor: ${error.message}`));
            res.status(400).json({ message: error.message });
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const autorAtualizado = await Autor.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!autorAtualizado) {
                return res.status(404).json({ message: "Autor não encontrado." });
            }
            console.log(chalk.green(`[PUT /autores/${req.params.id}] Autor atualizado.`));
            res.status(200).json(autorAtualizado);
        } catch (error) {
            console.log(chalk.red(`[PUT /autores/${req.params.id}] Erro ao atualizar autor: ${error.message}`));
            res.status(400).json({ message: "ID inválido" });
        }
    }

    static async excluirAutor(req, res) {
        try {
            const autorRemovido = await Autor.findByIdAndDelete(req.params.id);
            if (!autorRemovido) {
                return res.status(404).json({ message: "Autor não encontrado." });
            }
            console.log(chalk.green(`[DELETE /autores/${req.params.id}] Autor removido.`));
            res.status(200).json({ message: "Autor removido com sucesso" });
        } catch (error) {
            console.log(chalk.red(`[DELETE /autores/${req.params.id}] Erro ao remover autor: ${error.message}`));
            res.status(400).json({ message: "ID inválido" });
        }
    }
}

export default AutorController;

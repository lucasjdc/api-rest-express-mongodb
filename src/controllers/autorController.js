import NaoEncontrado from "../erros/NaoEncontrado.js";
import Autor from "../models/Autor.js";
import chalk from "chalk";

class AutorController {

    static async listarAutores(req, res, next) {
        try {
            const autores = await Autor.find({});
            console.log(chalk.green(`[GET /autores] ${autores.length} autor(es) encontrado(s).`));
            res.status(200).json(autores);
        } catch (error) {
            next(error);
        }
    }    

    static async listarAutorPorId(req, res, next) {        
        try {
            const id = req.params.id;
            const autorResultado = await Autor.findById(id);
            if (autorResultado !== null) {
                console.log(chalk.green(`[GET /autores/${id}] Autor encontrado.`));
            res.status(200).json(autorResultado);
            } else {
                next(new NaoEncontrado("Id do autor não localizado."));
            }           
        } catch (error) {
            next(error);           
        }
    }

    static async cadastrarAutor(req, res, next) {
        try {
            const novoAutor = new Autor(req.body);
            await novoAutor.save();
            console.log(chalk.green(`[POST /autores] Novo autor cadastrado com sucesso.`));
            res.status(201).json(novoAutor);
        } catch (error) {
            next(error);
        }
    }

    static async atualizarAutor(req, res, next) {
        try {
            const autorAtualizado = await Autor.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!autorAtualizado) {
                next(new NaoEncontrado("Autor não encontrado."));                
            }
            console.log(chalk.green(`[PUT /autores/${req.params.id}] Autor atualizado.`));
            res.status(200).json(autorAtualizado);
        } catch (error) {
           next(error);
        }
    }

    static async excluirAutor(req, res, next) {
        try {
            const autorRemovido = await Autor.findByIdAndDelete(req.params.id);
            if (!autorRemovido) {
                next(new NaoEncontrado("Autor não encontrado."));
            }
            console.log(chalk.green(`[DELETE /autores/${req.params.id}] Autor removido.`));
            res.status(200).json({ message: "Autor removido com sucesso" });
        } catch (error) {
            next(error);
        }
    }
}

export default AutorController;

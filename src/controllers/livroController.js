'use strict';
import Livro from "../models/Livro.js";

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

};

export default LivroController;
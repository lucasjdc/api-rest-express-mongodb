'use strict';
import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const frase = "do livro é obrigatório";

const livroSchema = new mongoose.Schema({
    
    titulo: { 
        type: String,
        required: [true, "O título " + frase] 
    },
    autor: autorSchema,
    editora: {
        type: String,
        required: [true, "A editora " + frase]
    }
}, { versionKey: false });

const Livro = mongoose.model("Livro", livroSchema);

export default Livro;

import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    
    titulo: { 
        type: String,
        required: [true, "O título do livro é obrigatório"] 
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores",
        required: [true, "O(a) autor(a) é obrigatorio"]
    },
    editora: {
        type: String,
        required: [true, "A editora é obrigatório"]
    }
}, { versionKey: false });

const Livro = mongoose.model("Livro", livroSchema);

export default Livro;

'use strict';
import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    titulo: { type: String, required: true }
}, { versionKey: false });

const Livro = mongoose.model("Livro", livroSchema);

export default Livro;

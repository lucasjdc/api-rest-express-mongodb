'use strict';
import express from "express";

const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "Aplicações web real-time com Node.js"
    },
    {
        id: 2,
        titulo: "Meteor: Criando aplicações web real-time com JavaScript"
    }
]

app.get("/",(req, res)=>{
    res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadadstrado com sucesso");
});

export default app;
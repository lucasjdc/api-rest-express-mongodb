import chalk from "chalk";
import express from "express";
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await connectDB();

conexao.on("error", (erro)=>{
    console.error("Erro de conexão", erro);
});

console.log(chalk.green("[INFO] Successfully connected to the database"));

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "JSON malformado." });
    }
    next(err);
});

routes(app);

app.use(manipuladorDeErros);

export default app;

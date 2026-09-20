import express from "express";
import cors from "cors";
const server = express();
const door = 8080;
import pool from "./src/service/conexao.js"
import rotasDoadores from "./routes/doador_routes.js";
import rotasTelefones from "./routes/telefone_routes.js";
import rotasEnderecos from "./routes/endereco_routes.js";
import rotaCadastro from "./routes/cadastro_rota.js";


server.use(express.json());
server.use(express.Router());
server.use(cors());

server.use("/doador", rotasDoadores);
server.use("/telefone", rotasTelefones);
server.use("/endereco", rotasEnderecos);
server.use("/cadastro", rotaCadastro);

const PORT = pool.port || door;
server.listen(PORT, ()=>{
    console.log(`Servidor ligado no caminho http://localhost:${PORT}`);
});
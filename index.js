import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import pool from "./src/service/conexao.js";
import rotasGoogle from "./routes/google_rotas.js";
import rotasDoadores from "./routes/doador_routes.js";
import rotasTelefones from "./routes/telefone_routes.js";
import rotasEnderecos from "./routes/endereco_routes.js";
import rotaCadastro from "./routes/cadastro_rota.js";
import rotaLogin from "./routes/login_rota.js";

const server = express();
const door = 8080;

server.use(cors());
server.use(helmet());

const limitador = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, 
    message: { erro: "Muitas requisições originadas deste IP, tente novamente mais tarde." },
    standardHeaders: true, 
    legacyHeaders: false,
});

server.use(limitador);

server.use(express.json());
server.use(express.Router());

server.use("/doador", rotasDoadores);
server.use("/telefone", rotasTelefones);
server.use("/endereco", rotasEnderecos);
server.use("/cadastro", rotaCadastro);
server.use("/login", rotaLogin);
server.use("/auth", rotasGoogle);

const PORT = pool.port || door;
server.listen(PORT, ()=>{
    console.log(`Servidor ligado no caminho http://localhost:${PORT}`);
});
import express from "express";
import cadastroCompleto from "../src/service/cadastro_completo_dao.js";
import { validarDadosCadastro } from "../src/middleware/validar_cadastro.js"
let rota = express.Router();

rota.post("/", validarDadosCadastro, async (req, res) => {
    try {
        const resultado = await cadastroCompleto(req.body);
        
        res.status(201).json({
            mensagem: "Cadastro completo realizado com sucesso!",
            idUsuario: resultado.id
        });
    } catch (erro) {
        res.status(500).json({
            erro: "Não foi possível concluir o cadastro. Verifique os dados e tente novamente."
        });
    }
});

export default rota;
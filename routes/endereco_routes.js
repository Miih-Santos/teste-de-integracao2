import express from "express";
let rota = express.Router();
import {consultarEnderecos,consultarEnderecoId} from "../DAO/endereco_doador/consultar_endereco.js";
import { verificarAutenticacao } from '../src/middleware/autenticacao.js';

rota.get("/", verificarAutenticacao, async (req,res)=>{
    try{
        let resp = await consultarEnderecos();
        res.status(200).json({registros:resp})
    } catch(error){
        res.status(500).json({erro: "Erro ao buscar endereços de clientes"})
    }
});

rota.get("/:id", verificarAutenticacao, async (req,res)=>{
    const {id} = req.params;
    try{
        let resp = await consultarEnderecoId(id);
        res.status(200).json({registros:resp})
    } catch(error){
        res.status(500).json({erro: "Erro ao buscar endereço de cliente"})
    }
});

export default rota;
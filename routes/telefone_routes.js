import express from "express";
let rota = express.Router();
import {consultarTelefones,consultarTelefoneId} from "../DAO/telefone_doador/consultar_telefone.js";
import { verificarAutenticacao } from '../src/middleware/autenticacao.js';

rota.get("/", verificarAutenticacao, async (req,res)=>{
    try{
        let resp = await consultarTelefones();
        res.status(200).json({registros:resp})
    } catch(error){
        res.status(500).json({erro: "Erro ao buscar telefone de clientes"})
    }
});

rota.get("/:id", verificarAutenticacao, async (req,res)=>{
    const {id} = req.params;
    try{
        let resp = await consultarTelefoneId(id);
        res.status(200).json({registros:resp})
    } catch(error){
        res.status(500).json({erro: "Erro ao buscar telefone de cliente"})
    }
});

export default rota;

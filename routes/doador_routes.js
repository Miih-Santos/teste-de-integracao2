import express from "express";
import { consultarDoadores, consultarDoadorId } from "../DAO/doador/consultar_doador.js";
let rota = express.Router();

rota.get("/", async (req, res) => {
    try {
        let resp = await consultarDoadores();
        res.status(200).json({ Doadores: resp })
    } catch (err) {
        res.status(404).json(
            { erro: "Erro ao buscar doadores" }
        )
    } 
});

rota.get("/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let resp = await consultarDoadorId(id);
        res.status(200).json({ Doador: resp })
    } catch (err) {
        res.status(404).json(
            { erro: "Erro ao buscar doador por ID" }
        )
    }
});

export default rota;
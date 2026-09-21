import express from 'express';
import {autenticarDoador}  from "../src/service/login.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
        }

        const resultado = await autenticarDoador(email, senha);

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token: resultado.token,
            usuario: resultado.usuario
        });

    } catch (error) {
        return res.status(401).json({ erro: error.message });
    }
});

export default router;
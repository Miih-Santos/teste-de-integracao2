import express from "express";
import passport from "../src/config/passport.js";
import jwt from "jsonwebtoken";

const rota = express.Router();

rota.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

rota.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req, res) => {
        const usuario = req.user;
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET || "sua_chave_secreta",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            mensagem: "Autenticação via Google realizada com sucesso",
            token: token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    }
);

export default rota;
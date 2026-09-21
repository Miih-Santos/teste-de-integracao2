import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "../service/conexao.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const nome = profile.displayName;

                const [rows] = await pool.query("SELECT * FROM cliente_doador_tbl WHERE email = ?", [email]);

                let usuario = rows[0];

                if (!usuario) {
                    const [result] = await pool.query(
                        "INSERT INTO cliente_doador_tbl (nome, email, senha, dataCadastro, ativo) VALUES (?, ?, ?, NOW(), true)",
                        [nome, email, "OAUTH_GOOGLE_USER"]
                    );
                    usuario = { id: result.insertId, nome, email };
                }

                return done(null, usuario);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;
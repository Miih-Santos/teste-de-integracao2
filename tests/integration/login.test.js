import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }
    
    if (email === "vinicius@email.com" && senha === "SenhaForte123!") {
        return res.status(200).json({ 
            mensagem: "Login efetuado com sucesso", 
            token: "seu_token_jwt_simulado" 
        });
    }
    
    return res.status(401).json({ erro: "Credenciais inválidas" });
});

describe("Testes de Integração - Fluxo de Login", () => {
    it("Deve retornar 400 se o usuário esquecer de enviar o email ou a senha", async () => {
        const resposta = await request(app)
            .post("/login")
            .send({ email: "vinicius@email.com" }); 

        expect(resposta.status).toBe(400);
        expect(resposta.body.erro).toBe("Email e senha são obrigatórios");
    });

    it("Deve retornar 401 se a senha ou email estiverem incorretos", async () => {
        const resposta = await request(app)
            .post("/login")
            .send({ email: "vinicius@email.com", senha: "senha_errada" });

        expect(resposta.status).toBe(401);
        expect(resposta.body.erro).toBe("Credenciais inválidas");
    });

    it("Deve retornar 200 e receber um token JWT se as credenciais forem válidas", async () => {
        const resposta = await request(app)
            .post("/login")
            .send({ email: "vinicius@email.com", senha: "SenhaForte123!" });

        expect(resposta.status).toBe(200);
        expect(resposta.body.mensagem).toBe("Login efetuado com sucesso");
        expect(resposta.body).toHaveProperty("token"); 
    });
});
import request from "supertest";
import express from "express";
import { validarDadosCadastro } from "../../src/middleware/validar_cadastro.js"; 

const app = express();
app.use(express.json());

app.post("/cadastro", validarDadosCadastro, (req, res) => {
    res.status(201).json({ mensagem: "Cadastro simulado com sucesso", idUsuario: 1 });
});

describe("Testes de Integração - Fluxo de Cadastro", () => {
    
    it("Deve retornar 400 (Bad Request) se a senha for fraca e não tiver DDD", async () => {
        const payloadInvalido = {
            doador: {
                nome: "Carlos Silva",
                email: "carlos@email.com",
                senha: "123",
                ativo: true
            },
            endereco: { rua: "Rua A", bairro: "Bairro B", cidade: "SP", estado: "SP" },
            telefone: { ddd: "", numero: "999999999" } // sem id propositalmente
        };

        const resposta = await request(app).post("/cadastro").send(payloadInvalido);

    
        expect(resposta.status).toBe(400);
        expect(resposta.body.erro).toBe("Dados de cadastro inválidos");
        
        const errosDetectados = resposta.body.detalhes.map(d => d.campo);
        expect(errosDetectados).toContain("doador.senha");
        expect(errosDetectados).toContain("telefone.ddd");
    });

    it("Deve retornar 201 (Created) se todos os dados respeitarem os padrões", async () => {
        const payloadValido = {
            doador: {
                nome: "Carlos Silva",
                email: "carlos@email.com",
                senha: "SenhaForte123!", 
                ativo: true
            },
            endereco: { rua: "Rua Teste", bairro: "Bairro B", cidade: "Cidade C", estado: "SP" },
            telefone: { ddd: "11", numero: "999999999" }
        };

        const resposta = await request(app).post("/cadastro").send(payloadValido);

        expect(resposta.status).toBe(201);
        expect(resposta.body.mensagem).toBe("Cadastro simulado com sucesso");
    });
});
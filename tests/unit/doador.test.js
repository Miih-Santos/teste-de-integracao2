import { jest } from '@jest/globals';
import { postarCliente } from "../../DAO/doador/postar_doador.js";

describe("Testes de Unidade - DAO Doador", () => {
    it("Deve executar a query de inserção e retornar o ID gerado", async () => {
        const mockConexao = {
            query: jest.fn().mockResolvedValue([{ insertId: 99 }]) 
        };

        const dadosDoador = {
            nome: "João Silva",
            email: "joao@email.com",
            senha: "senha_hasheada",
            dataCadastro: "2026-09-20 22:30:00",
            ativo: true
        };

        const idRetornado = await postarCliente(mockConexao, dadosDoador);

        expect(mockConexao.query).toHaveBeenCalledTimes(1);
        expect(mockConexao.query).toHaveBeenCalledWith(
            expect.any(String),
            ["João Silva", "joao@email.com", "senha_hasheada", "2026-09-20 22:30:00", true]
        );
        expect(idRetornado).toBe(99);
    });
});
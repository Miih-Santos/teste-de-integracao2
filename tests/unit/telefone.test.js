import { jest } from '@jest/globals';
import { postarTelefone } from "../../DAO/telefone_doador/postar_telefone.js";

describe("Testes de Unidade - DAO Telefone", () => {
    it("Deve executar a query de inserção de telefone vinculada ao doador", async () => {
        const mockConexao = {
            query: jest.fn().mockResolvedValue([])
        };

        const dadosTelefone = {
            ddd: "11",
            numero: "912345678"
        };
        const idDono = 55; 

        await postarTelefone(mockConexao, dadosTelefone, idDono);

        expect(mockConexao.query).toHaveBeenCalledTimes(1);
        expect(mockConexao.query).toHaveBeenCalledWith(
            expect.any(String),
            ["11", "912345678", 55]
        );
    });
});
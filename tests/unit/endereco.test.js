import { jest } from '@jest/globals';
import { postarEndereco } from "../../DAO/endereco_doador/postar_endereco.js";

describe("Testes de Unidade - DAO Endereço", () => {
    it("Deve executar a query de inserção de endereço vinculada ao doador", async () => {
        const mockConexao = {
            query: jest.fn().mockResolvedValue([]) 
        };

        const dadosEndereco = {
            rua: "Avenida Paulista, 1500",
            bairro: "Bela Vista",
            cidade: "São Paulo",
            estado: "SP"
        };
        const idDono = 55; 

        await postarEndereco(mockConexao, dadosEndereco, idDono);

        expect(mockConexao.query).toHaveBeenCalledTimes(1);
        expect(mockConexao.query).toHaveBeenCalledWith(
            expect.any(String),
            ["Avenida Paulista, 1500", "Bela Vista", "São Paulo", "SP", 55]
        );
    });
});
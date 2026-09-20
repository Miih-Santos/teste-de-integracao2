import pool from "../../src/service/conexao.js"

async function consultarEnderecos(){
    let querySQL = `SELECT * FROM endereco_cliente`;
    try{
        let [registros] = await pool.query(querySQL);
        return registros;
    } catch(error){
        console.error(`Erro ao buscar endereços de doadores`);
    } 
}

async function consultarEnderecoId(id){
    let querySQL = `SELECT * FROM endereco_cliente WHERE id = ${id}`;
    try{
        let [registro] = await pool.query(querySQL);
        return registro;
    } catch(error){
        console.error(`Erro ao buscar endereço específico`);
    } 
}

export {consultarEnderecoId,consultarEnderecos};
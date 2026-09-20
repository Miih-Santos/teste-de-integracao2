import pool from "../../src/service/conexao.js"

async function consultarTelefones(){
    let querySQL = `SELECT * FROM telefone_cliente`;
    try{
        let [registros] = await pool.query(querySQL);
        return registros;
    } catch(error){
        console.error(`Erro ao buscar telefones de doadores`);
    } 
}

async function consultarTelefoneId(id){
    let querySQL = `SELECT * FROM telefone_cliente WHERE id = ${id}`;
    try{
        let [registro] = await pool.query(querySQL);
        return registro;
    } catch(error){
        console.error(`Erro ao buscar telefone`);
    } 
}

export {consultarTelefones,consultarTelefoneId};
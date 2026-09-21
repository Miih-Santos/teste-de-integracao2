import pool from "../../src/service/conexao.js";

async function consultarDoadores(){
    let querySQL = `SELECT * FROM cliente_doador_tbl`
    try{
        let [registros] = await pool.query(querySQL);
        return registros;
    } catch(error){
        console.error(`Erro ao tentar buscar doadores: ${error}`)
    } 
};

async function consultarDoadorId(id){
    let querySQL = `SELECT * FROM cliente_doador_tbl WHERE id = ${id}`;
    try{
        let [registro] = await pool.query(querySQL);
        return registro;
        
    } catch(error){
        console.error(`Erro ao tentar buscar doadores: ${error}`)
    }
};

async function consultarDoadorEmail(email) {
    try {
        const query = 'SELECT * FROM cliente_doador_tbl WHERE email = ?'
        const [registro] = await pool.query(query, [email]);
        return registro[0];
    } catch (error) {
        throw new Error(`Erro ao buscar doador: ${error.message}`);
    } 
}
export {consultarDoadores, consultarDoadorId, consultarDoadorEmail};
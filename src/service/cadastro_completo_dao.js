import pool from "./conexao.js"
import bcrypt from "bcrypt";
import { postarCliente } from "../../DAO/doador/postar_doador.js";
import { postarEndereco } from "../../DAO/endereco_doador/postar_endereco.js";
import { postarTelefone } from "../../DAO/telefone_doador/postar_telefone.js";

async function cadastroCompleto(dadosCadastro){
    const {doador, telefone, endereco} = dadosCadastro;
    let conexao = await pool.getConnection();
    try{
        const saltRounds = 10;
        const senhaHasheada = await bcrypt.hash(doador.senha, saltRounds)
        doador.senha = senhaHasheada; //hasheamento de senha e início da parte de transação

        await conexao.beginTransaction();

        const idDoador = await postarCliente(conexao, doador);
        await postarEndereco(conexao, endereco, idDoador);
        await postarTelefone(conexao, telefone, idDoador);

        await conexao.commit();
        return {sucess:true, id:idDoador}
    } catch(error){
        await conexao.rollback();
        console.error(`Erro de transação, realizando rollback`, error)
        throw error;
    } finally{
        conexao.release();
    }
}

export default cadastroCompleto;
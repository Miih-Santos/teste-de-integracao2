async function postarTelefone(conexao, telefone, idDoador){
    let querySQL = `INSERT INTO telefone_cliente (ddd, numero, id_dono_tel) VALUES (?,?,?)`;
    await conexao.query(querySQL, [telefone.ddd, telefone.numero, idDoador]);
};

export {postarTelefone};
async function postarEndereco(conexao, endereco, idDoador){

    let querySQL = `INSERT INTO endereco_cliente (rua, bairro, cidade, estado, dono_endereco) VALUES (?,?,?,?,?)`;
    await conexao.query(querySQL, [endereco.rua, endereco.bairro, endereco.cidade, endereco.estado, idDoador]);
};

export {postarEndereco};

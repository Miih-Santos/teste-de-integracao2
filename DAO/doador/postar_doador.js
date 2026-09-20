async function postarCliente(conexao, {nome, email, senha, dataCadastro, ativo}){
    let querySQL = `INSERT INTO cliente_doador_tbl (nome, email, senha, dataCadastro, ativo) VALUES (?,?,?,?,?)`;
    let [doador] = await conexao.query(querySQL, [nome, email, senha, dataCadastro, ativo]);
    return doador.insertId;
};

export {postarCliente};


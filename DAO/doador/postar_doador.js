async function postarCliente(conexao, {nome, email, senha, dataCadastro, ativo}){
    let dataFinal = dataCadastro || new Date(); // Pega a data atual se não vier
    let ativoFinal = ativo !== undefined ? ativo : true; // Garante true se não vier

    let querySQL = `INSERT INTO cliente_doador_tbl (nome, email, senha, dataCadastro, ativo) VALUES (?, ?, ?, ?, ?)`;
    let [doador] = await conexao.query(querySQL, [nome, email, senha, dataFinal, ativoFinal]);
    return doador.insertId;
};

export {postarCliente};

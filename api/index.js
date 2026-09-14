import express from "express";
const server = express();
const door = 8080;
import pool from "../src/service/conexao.js"
server.use(express.json());

server.get("/doador", async (req,res)=>{
    const conexao = await pool.getConnection();
    try{
        const [registros] = await conexao.query(`SELECT * FROM cliente_doador_tbl`);
        res.status(200).json({resposta: registros})
    } catch(err){
        console.error(err)
        res.status(500).json({erro:"Erro ao fazer consulta"})
    } finally {
        conexao.release();
    }
})

server.post("/doador", async (req,res)=>{
    const {nome, email, senha} = req.body;
    const conexao = await pool.getConnection();
    try{const query = `INSERT INTO cliente_doador_tbl (nome, email, senha) VALUES (?,?,?)`
        const [customer] = await conexao.query(query, [nome, email, senha])
        res.status(201).json({
            mensagem: "Doador criado com sucesso!",
            id: customer.insertId, 
            dados: { nome, email, senha }
        })
    } catch(err){
        console.error(err)
        res.status(500).json({erro:"Erro ao criar cliente"})
    } finally {
        conexao.release(); 
    }
})

const PORT = pool.port || door;
server.listen(PORT, ()=>{
    console.log(`Servidor ligado no caminho http://localhost:${PORT}`)
})
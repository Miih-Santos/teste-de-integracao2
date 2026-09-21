import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {consultarDoadorEmail} from "../../DAO/doador/consultar_doador.js";


async function autenticarDoador(email, senha) {
    let usuario = await consultarDoadorEmail(email);

    if (!usuario) {
        throw new Error('E-mail ou senha inválidos.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw new Error('E-mail ou senha inválidos.');
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    };
}

export {autenticarDoador};
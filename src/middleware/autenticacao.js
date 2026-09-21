import jwt from 'jsonwebtoken';

function verificarAutenticacao(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ erro: 'Token não fornecido.' });
        }

        const partes = authHeader.split(' ');
        if (partes.length !== 2) {
            return res.status(401).json({ erro: 'Erro no formato do token.' });
        }

        const [scheme, token] = partes;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ erro: 'Token mal formatado.' });
        }

        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        

        req.usuarioId = decodificado.id;
        req.usuarioEmail = decodificado.email;

        return next();

    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
}

export {verificarAutenticacao};
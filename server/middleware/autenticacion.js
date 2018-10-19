const jwt = require('jsonwebtoken');

// ============================
// Verifica token
// ============================

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.data;
        next();
    });


};

// ============================
// Verifica admin rol
// ============================

let verificaRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'Usuairo no es administrador'
            }
        })
    }


}

/**
 * VErifica token IMG
 */

let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.data;
        next();
    });

}

module.exports = {
    verificaToken,
    verificaRole,
    verificaTokenImg
}
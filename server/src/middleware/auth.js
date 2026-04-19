const jwt = require('jsonwebtoken')
function authmiddleware(req, res, next) {

    const authheader = req.headers['authorization']
    if (!authheader) {
        return res.status(401).json({ error: 'Token não enviado' })
    }
    const token = authheader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido ou expirado' })
        }
        req.user = decoded.userId
        req.username = decoded.name
        next()
    })
}
module.exports = authmiddleware
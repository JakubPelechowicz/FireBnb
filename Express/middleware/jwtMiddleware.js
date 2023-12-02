const jwtMiddleware = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwtMiddleware.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
            console.error(`JWT verification failed: ${error}`);
            return res.sendStatus(403);
        }

        req.user = user;

        next();
    });
}

module.exports = authenticateToken;
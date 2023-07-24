const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader && !authHeader.startsWith("Bearer")) {
            res.status(401).send({ error: "Unauthorized!!!!!!!!" })
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req['userId'] = decoded.id
        next()

    } catch (error) {
        res.status(401).send({ error: "Unauthorized!!!!!!!!!" })
    }
}

module.exports = authMiddleware;
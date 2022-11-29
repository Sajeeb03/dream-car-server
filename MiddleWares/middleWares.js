const verifyToken = (jwt) => {
    const verifyJWT = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ message: "Unauthorized Access" })
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: "Forbidden access." })
            }
            req.decoded = decoded;
            next();
        })
    }
    return verifyJWT;
}

const isAdmin = (Users) => {
    const verifyAdmin = async (req, res, next) => {
        try {
            const decodedEmail = req.decoded.email;
            const user = await Users.findOne({ email: decodedEmail });
            if (user.role !== "admin") {
                return res.status(403).send({ message: "Forbidden access.(not admin)" })
            }
            next();
        } catch (error) {
            res.send({
                message: error.message
            })
        }
    }
    return verifyAdmin;
}

//verify the buyer
const isBuyer = (Users) => {
    const verifyBuyer = async (req, res, next) => {
        try {
            const decodedEmail = req.decoded.email;
            const user = await Users.findOne({ email: decodedEmail });
            if (user.role !== "buyer") {
                return res.status(403).send({ message: "Forbidden access.(Not a seller)" })
            }
            next();
        } catch (error) {
            res.send({
                message: error.message
            })
        }
    }
    return verifyBuyer;
}

const isSeller = (Users) => {
    const verifySeller = async (req, res, next) => {
        try {
            const decodedEmail = req.decoded.email;
            const user = await Users.findOne({ email: decodedEmail });
            if (user.role !== "seller") {
                return res.status(403).send({ message: "Forbidden access.(Not a seller)" })
            }
            next();
        } catch (error) {
            res.send({
                message: error.message
            })
        }
    }
    return verifySeller;
}

module.exports = { verifyToken, isAdmin, isBuyer, isSeller };
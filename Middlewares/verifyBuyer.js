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

module.exports = isBuyer;
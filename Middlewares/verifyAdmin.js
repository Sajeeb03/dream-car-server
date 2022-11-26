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

module.exports = isAdmin;
const checkBuyer = (app, Users) => {
    app.get("/users/buyer/:email", async (req, res) => {
        try {
            const { email } = req.params;
            const user = await Users.findOne({ email: email })
            res.send({ isBuyer: user.role === "buyer" })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = checkBuyer;
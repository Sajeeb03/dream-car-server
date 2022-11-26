const checkSeller = (app, Users) => {
    app.get("/users/seller/:email", async (req, res) => {
        try {
            const { email } = req.params;
            const user = await Users.findOne({ email: email })
            res.send({ isSeller: user.role === "seller" })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = checkSeller;
//check admin route
const checkAdmin = (app, Users) => {
    app.get("/users/admin/:email", async (req, res) => {
        try {
            const { email } = req.params;
            const user = await Users.findOne({ email: email })
            res.send({ isAdmin: user.role === "admin" })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = checkAdmin;
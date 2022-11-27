const getUsers = (app, Users, verifyJWT, VerifyAdmin) => {
    app.get("/users/:role", verifyJWT, VerifyAdmin, async (req, res) => {
        try {
            const { role } = req.params;
            const query = { role: role }
            const result = await Users.find(query).toArray();
            res.send({
                success: true,
                data: result
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = getUsers;
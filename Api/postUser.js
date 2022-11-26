const postUser = (app, Users) => {
    app.put('/users', async (req, res) => {
        try {
            const { email } = req.query;
            const user = req.body;
            filter = { email: email }
            updateUser = {
                $set: user
            }
            const result = await Users.updateOne(filter, updateUser, { upsert: true })
            res.send({
                success: true,
                message: "user added"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })

}

module.exports = postUser;
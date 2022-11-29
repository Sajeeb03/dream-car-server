const { ObjectId } = require("mongodb");

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

//get users
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

const deleteUser = (app, Users, verifyJWT, verifyAdmin) => {
    app.delete("/users/:id", verifyJWT, verifyAdmin, async (req, res) => {
        try {
            const { id } = req.params;
            const query = { _id: ObjectId(id) }
            const result = await Users.deleteOne(query);
            res.send({
                success: true,
                message: "user deleted"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

//get sellers details
const getSellerDetails = (app, verifyJWT, verifySeller, Users) => {
    app.get('/seller/:email', verifyJWT, verifySeller, async (req, res) => {
        const { email } = req.params;
        const query = { email: email };
        const result = await Users.findOne(query);
        res.send(result)
    })
}


module.exports = { postUser, getUsers, deleteUser, getSellerDetails };
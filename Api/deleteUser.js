const deleteUser = (app, Users, verifyJWT, verifyAdmin, ObjectId) => {
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

module.exports = deleteUser;
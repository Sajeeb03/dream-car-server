const verification = (app, Users, Products, verifyJWT, verifyAdmin, ObjectId) => {
    app.put("/seller/:id", verifyJWT, verifyAdmin, async (req, res) => {
        try {
            const { id } = req.params;
            // console.log(id)
            // console.log(req.decoded.email)
            const query = { _id: ObjectId(id) };
            const updateUser = {
                $set: req.body
            }
            const result = await Users.updateOne(query, updateUser, { upsert: true })
            const filter = { sellerId: id }
            const productsUpdate = await Products.updateMany(filter, updateUser, { upsert: true })
            res.send({
                success: true,
                message: "Verified"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = verification;
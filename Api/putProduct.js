const putProduct = (app, Products, Advertise, verifyJWT, verifySeller, ObjectId) => {
    app.put('/cars/:id', verifyJWT, verifySeller, async (req, res) => {
        try {
            const { id } = req.params;
            const filter = { _id: ObjectId(id) }
            const updateProduct = {
                $set: req.body
            }
            const result = await Products.updateOne(filter, updateProduct, { upsert: true })
            const deleteItem = await Advertise.deleteOne({ carId: id })
            res.send({
                success: true,
                message: "Status updated"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })

}

module.exports = putProduct;
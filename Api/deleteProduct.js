const deleteProduct = (app, Products, Advertise, verifyJWT, verifySeller, ObjectId) => {
    app.delete("/cars/:id", verifyJWT, verifySeller, async (req, res) => {
        try {
            const { id } = req.params;
            const query = { _id: ObjectId(id) };
            const result = await Products.deleteOne(query);
            const deleteItem = await Advertise.deleteOne({ carId: id });
            res.send({
                success: true,
                message: "Deletion successful"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = deleteProduct;
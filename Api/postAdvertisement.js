

const postAdvertisement = (app, Advertise, Products, verifyJWT, verifySeller, ObjectId) => {
    app.post("/advertise", verifyJWT, verifySeller, async (req, res) => {
        try {
            const product = req.body;
            const result = await Advertise.insertOne(product);
            const id = product.carId;
            const filter = { _id: ObjectId(id) }
            const updatingProduct = await Products.updateOne(filter, { $set: { advertised: true } }, { upsert: true })

            res.send({
                success: true,
                message: "Advertized"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = postAdvertisement;
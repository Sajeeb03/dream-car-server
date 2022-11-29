const { ObjectId } = require("mongodb");


const postAdvertisement = (app, Advertise, Products, verifyJWT, verifySeller) => {
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

//get all advertisements
const getAdvertisement = (app, Advertise) => {
    app.get('/advertise', async (req, res) => {
        try {
            const result = await Advertise.find({}).toArray();
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


module.exports = { postAdvertisement, getAdvertisement };
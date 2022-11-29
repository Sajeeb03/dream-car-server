const { ObjectId } = require("mongodb");

const postOrder = (app, Orders, verifyJWT, verifyBuyer) => {
    app.post("/orders", verifyJWT, verifyBuyer, async (req, res) => {
        try {
            const product = req.body;
            const result = await Orders.insertOne(product)
            res.send({
                success: true,
                message: "Order placed"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

const getOrders = (app, Orders, verifyJWT, verifyBuyer) => {
    app.get("/orders", verifyJWT, verifyBuyer, async (req, res) => {
        const { email } = req.query;
        try {
            const result = await Orders.find({ email: email }).toArray();
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

const getOrder = (app, Orders, verifyJWT, verifyBuyer) => {
    app.get("/orders/:id", verifyJWT, verifyBuyer, async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Orders.findOne({ _id: ObjectId(id) })
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
module.exports = { postOrder, getOrders, getOrder };
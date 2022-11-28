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

module.exports = postOrder;
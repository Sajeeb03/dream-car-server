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
module.exports = getOrders;
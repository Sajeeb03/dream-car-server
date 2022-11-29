const { ObjectId } = require("mongodb");

const getClientSecret = (app, verifyJWT, stripe) => {
    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
        const { total } = req.body;
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total * 100,
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true
                },
            })
            res.send(clientSecret = paymentIntent.client_secret);
        } catch (error) {
            res.send(
                {
                    success: false,
                    message: error.message
                }
            )
        }
    })
}

//post payment to out database
const savePayment = (app, Payments, Orders, verifyJWT) => {
    app.post("/payments/:id", verifyJWT, async (req, res) => {
        try {
            const bill = req.body;
            const { id } = req.params;
            const result = await Payments.insertOne(bill);
            const updateOrder = await Orders.updateOne({ _id: ObjectId(id) }, { $set: { paid: true } }, { upsert: true })
            res.send({
                success: true,
                message: "Added to database"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}
module.exports = { getClientSecret, savePayment };
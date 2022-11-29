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

module.exports = { getClientSecret };
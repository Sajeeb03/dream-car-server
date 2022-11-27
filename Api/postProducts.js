const postProducts = (app, Products, verifyJWT, verifySeller) => {
    app.post('/cars', verifyJWT, verifySeller, async (req, res) => {
        try {
            const product = req.body;
            const result = await Products.insertOne(product);
            res.send({
                success: true,
                message: 'Car added.'
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = postProducts;
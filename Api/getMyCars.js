const getMyCars = (app, Products, verifyJWT, verifySeller) => {
    app.get("/cars", verifyJWT, verifySeller, async (req, res) => {
        try {
            const email = req.query.email;
            const query = { sellerEmail: email };
            const result = await Products.find(query).toArray();
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

module.exports = getMyCars;
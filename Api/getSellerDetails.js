const getSellerDetails = (app, verifyJWT, verifySeller, Users) => {
    app.get('/seller/:email', verifyJWT, verifySeller, async (req, res) => {
        const { email } = req.params;
        const query = { email: email };
        const result = await Users.findOne(query);
        res.send(result)
    })
}

module.exports = getSellerDetails;
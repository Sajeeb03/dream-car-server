const getCars = (app, Products, verifyJWT) => {
    app.get("/cars/:category", verifyJWT, async (req, res) => {
        try {
            const { category } = req.params;
            const query = { category: category };
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

module.exports = getCars;
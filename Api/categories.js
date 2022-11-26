const categories = (app, Categories) => {
    app.get("/categories", async (req, res) => {
        try {
            const result = await Categories.find({}).toArray();
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

module.exports = categories;

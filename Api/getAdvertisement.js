const getAdvertisement = (app, Advertise) => {
    app.get('/advertise', async (req, res) => {
        try {
            const result = await Advertise.find({}).toArray();
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

module.exports = getAdvertisement;
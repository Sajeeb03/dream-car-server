const { ObjectId } = require("mongodb")

const postReport = (app, Reports, verifyJWT) => {
    app.post("/reports", verifyJWT, async (req, res) => {
        try {
            const result = await Reports.insertOne(req.body)
            res.send({
                success: true,
                message: "Reported To The Admin."
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

const getReports = (app, Reports, verifyJWT, verifyAdmin) => {
    app.get('/reports', verifyJWT, verifyAdmin, async (req, res) => {
        try {
            const result = await Reports.find({}).toArray();
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



const deleteReport = (app, Reports, Products, Advertise, verifyJWT, verifyAdmin) => {
    app.delete("/reports/:id", verifyJWT, verifyAdmin, async (req, res) => {
        try {
            const id = req.params.id;
            const result = await Reports.deleteOne({ carId: id });
            const product = await Products.deleteOne({ _id: ObjectId(id) })
            const adv = await Advertise.deleteOne({ carId: id })
            res.send({
                success: true,
                message: "Product deleted"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }

    })
}


module.exports = { postReport, getReports, deleteReport };
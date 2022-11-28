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

module.exports = postReport;
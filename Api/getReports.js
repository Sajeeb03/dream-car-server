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

module.exports = getReports;
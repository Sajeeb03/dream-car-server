const deleteReport = (app, Reports, verifyJWT, verifyAdmin) => {
    app.delete("/reports/:id", verifyJWT, verifyAdmin, async (req, res) => {
        try {
            const id = req.params.id;
            const result = await Reports.deleteOne({ id: id });
            res.send({
                success: true,
                message: "Report deleted"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }

    })
}

module.exports = deleteReport;
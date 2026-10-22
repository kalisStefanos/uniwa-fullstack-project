export function createReportController(reportService){
    return{
        async getReport(req, res, next){
            try{
                const report = await reportService.getReport(req.params.rid, req.user.id)
                res.status(200).json(report);
            }catch(err){
                next(err)
            }
        },

        async getReports(req, res, next){
            try{
                const reports = await reportService.getReports(req.params.bid, req.user.id)
                res.status(200).json(reports)
            }catch(err){
                next(err)
            }
        },
        
        async createReport(req, res, next){
            try{
                const {expenseIds, description} = req.body
                const report = await reportService.createReport(
                    req.params.bid,
                    req.user.id,
                    {expenseIds, description} ,
                )
                res.status(201).json(report);

            }catch(err){
                next(err)
            }
        },
    }
}
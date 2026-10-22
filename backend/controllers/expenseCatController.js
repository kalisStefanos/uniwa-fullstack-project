export function createExpenseCatController(expenseCatService){
    return{
        async getExpenseCategories(req, res, next){
            try{
                const categories = await expenseCatService.getExpenseCategories(
                    req.params.bid, 
                    req.user.id
                )

                res.status(200).json(categories);
            }catch(err){
                next(err)
            }
        },

        async createExpenseCategory(req, res, next){
            try{
                const input = {
                    areaWeight: parseFloat(req.body.areaWeight),
                    floorWeight: parseFloat(req.body.floorWeight),
                    name: req.body.name
                }
                const category = await expenseCatService.createExpenseCategory(
                    req.params.bid,
                    input,
                    req.user.id
                )
                res.status(200).json(category)
            }catch(err){
                next(err)
            }
        }
    }
}
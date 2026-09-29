export function createBillController(billService){
    return{
        async getBill(req, res, next){
            try{
                const bill = await billService.getBill(req.params.bid, req.user.id)
                res.status(200).json(bill);
            }catch(err){
                next(err)
            }
        },

        async getBillsByApartment(req, res, next){
            try{
                const bills = await billService.getBillsByApartment(req.params.aid, req.user.id)
                res.status(200).json(bills);
            }catch(err){
                next(err)
            }
        }
    }
}
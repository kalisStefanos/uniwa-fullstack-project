export default function errorHandler(err, req, res, next) {
    
    if(err.isOperational){
        return res.status(err.statusCode).json({ error: err.message })
    }
    
    console.error("[DEBUG]:", err);
    
    return res.status(500).json({
        error: 'Internal Server Error. Try again later.',
    })
}

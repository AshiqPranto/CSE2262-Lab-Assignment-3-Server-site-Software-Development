const verifyAdmin = (req,res,next) => {
    
    if(req.admin)
    {
        // console.log(req.admin);
        next();
    }
    else{
        // console.log(req.admin);
        var error = new Error('You are not authenticated to do this operation');
        next(error);
    }
}

module.exports = verifyAdmin;
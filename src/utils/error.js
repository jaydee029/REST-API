class customError extends Error{
    constructor({statuscode,message}){
        super();
        this.statuscode=statuscode;
        this.message=message;
    }
}

const handleError=(err,req,res,next)=>{
    let {statuscode,message}=err;

    console.log(message)

    if(!statuscode){
        statuscode=500;
    }

    res.status(statuscode).json({
        status:"error",
        statuscode,
        message
    })

}

module.exports={
    customError,
    handleError
}
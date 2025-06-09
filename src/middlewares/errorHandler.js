// Central Error Handling
const errorHanling = (err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({
        status : 500,
        message : "Something went Worng",
        error: err.message
    });
}

export default errorHanling
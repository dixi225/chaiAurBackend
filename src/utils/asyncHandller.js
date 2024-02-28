
export const asyncHandller= (func)=>async(req,res,next)=>{
    try{
        await func(req,res,next)
    }catch(err){
        res.staus(err.code||500).json({
            success:false,
            messege:err.messege
        })
    }
}

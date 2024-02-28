
export const success=(statusCode,response)=>{
    return{
        status:"ok",
        statusCode:statusCode,
        response:response
    }
}


export const error=(statusCode,err)=>{
    return{
        status:"err",
        statusCode:statusCode,
        error:err
    }
}

// class Apierror extends Error{
//     constructor(statusCode,
//         messege="Something Went Wrong",
//         error=[],
//         stack=""){
//             super(messege)
//             this.statusCode=statusCode
//             this.data=null
//             this.success=false
//             this.errors=error
//     }
// }
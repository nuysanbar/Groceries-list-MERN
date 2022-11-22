const apiRequest=async(url,optionsObj=null,errMsg=null)=>{
    try{
    const Response=await fetch(url,optionsObj);
    if(!Response.ok) throw Error("please reload the page");
    }catch(err){
        errMsg=err.message;
    }finally{
        return errMsg;
    }
}
export default apiRequest;
export const internalErrorResp = (error) =>{
  return {
    success:false,
    err:error,
    data:{},
    message:`Internal server error`
  };
}
export const customErrorRes = (error) =>{
  if(error.message && !error.explanation){
    return internalErrorResp(error);
  }
  return {
    success:false,
    err : error.explanation,
    data:{},
    message:error.message
  };
}

export const successResponse = (data, message) =>{
  return {
    success:true,
    message,
    data,
    error:{},
  }
}
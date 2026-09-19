import { StatusCodes } from "http-status-codes";

import { customErrorRes } from "../utils/common/responseObject.js";

export const validate = (schema) => {
  return async (req, res, next) =>{
    try{
      await schema.parse(req.body);
      next();
    }catch(e){
      console.log("Validation error in zod validator", e);
      res.status(StatusCodes.BAD_REQUEST).json(customErrorRes({
        message:'Validation error',
        explanation:''
      }))
    } 
  }
}
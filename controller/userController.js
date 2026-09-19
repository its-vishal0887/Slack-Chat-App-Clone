import { StatusCodes } from 'http-status-codes';

import { signUpService } from '../services/userService.js';
import {
  customErrorRes,
  internalErrorResp,
  successResponse
} from '../utils/common/responseObject.js';

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const user = await signUpService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, `user created successfully`));
  } catch (e) {
    console.log('User controller error', e);
    if (e.statusCode) {
      return res.status(e.statusCode).json(customErrorRes(e));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResp(e));
  }
};

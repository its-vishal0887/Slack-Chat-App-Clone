import { StatusCodes } from 'http-status-codes';
import { customErrorRes, internalErrorResp } from '../utils/common/responseObject';
import jwt from 'jsonwebtoken';
import { JWT_SECREAT } from '../config/serverConfig';
import userRepo from '../repositories/userRepo';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorRes({
          explanation: 'Invalid data sent from the client',
          message: 'No auth token provided'
        })
      );
    }

    const response = jwt.verify(token, JWT_SECREAT);
    if (!response) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorRes({
          explanation: 'Invalid data sent from the client',
          message: 'No auth token provided'
        })
      );
    }
    const user = await userRepo.getById(response.id);
    req.user = user.id;
    next();
  } catch (e) {
    console.log("Auth middleware error", e);
    if(e.name === 'JsonWebTokenError'){
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorRes({
          explanation: 'Invalid data sent from the client',
          message: 'No auth token provided'
        })
      );
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResp(e));
  }
};

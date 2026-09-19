import jwt from 'jsonwebtoken';

import { JWT_SECREAT } from '../../config/serverConfig.js';

export const createJWT = (incomingPayload) => {
  return jwt.sign(incomingPayload, JWT_SECREAT, {
    expiresIn:"2h",
  });
};

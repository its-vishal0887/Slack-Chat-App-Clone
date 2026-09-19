import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepo from '../repositories/userRepo.js';
import { createJWT } from '../utils/common/authUtils.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

export const signUpService = async (data) => {
  try {
    const newUser = await userRepo.create(data);
    return newUser;
  } catch (e) {
    console.log('user service error', e);
    if (e.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: e.errors
        },
        e.message
      );
    }
    if (e.name === 'MongoServerError' && e.code === 11000) {
      throw new ValidationError(
        {
          error: ['A user with same email or username already exists']
        },
        'A user with same email or username already exists'
      );
    }
  }
};

export const signInService = async (data) => {
  try {
    const user = await userRepo.getByEmail(data.email);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data send from client',
        message: 'no registered user found with this email',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isMatch = bcrypt.compareSync(data.password, user.password);

    if (!isMatch) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Invalid password, please try again',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    return {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      token: createJWT({
        id: user._id,
        email: user.email
      })
    };
  } catch (e) {
    console.log('User services error', e);
    throw e;
  }
};

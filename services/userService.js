import userRepo from '../repositories/userRepo.js';
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

import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { signup } from '../../controller/userController.js';
import { userSighUpSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'GET /users' });
});

router.post('/signup', validate(userSighUpSchema), signup);

export default router;

import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { body } from 'express-validator/check';
import { formattedValidationResult } from '../util/helpers';
// import User from '@Models/User';
import { User } from '../models';
import { BASE_PATH } from '../util/constants';
import { ERR_CODE } from '../util/enums';

export const validate = (method: string) => {
  switch (method) {
    case 'login':
      return [
        body('account')
          .isEmail()
          .withMessage('must be a valid email address'),
        body('password')
          .isLength({ min: 8, max: 16 })
          .withMessage('must be between 8 and 16 characters')
      ];
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationError = formattedValidationResult(req);
  if (!validationError.isEmpty()) {
    return res.status(400).json({ errors: validationError.array() });
  }
  const { account, password } = req.body;
  const UserRepo = getRepository(User);
  let user = await UserRepo.findOne({ account });
  if (user) {
    const isPwMatched = await bcrypt.compare(password, user.password);
    if (!isPwMatched) return res.json({ code: ERR_CODE.Login_PwNotMatched });
  } else {
    const hash = await bcrypt.hash(password, 10);
    const name =
      'Chef_' +
      Math.random()
        .toString()
        .substring(2, 6);
    const newUser = UserRepo.create({
      account,
      password: hash,
      name
    });
    user = await UserRepo.save(newUser);
  }
  passport.authenticate('local', (err, user) => {
    if (err || !user) return next(err || new Error('user not found'));
    req.logIn(user, err => {
      if (err) return next(err);
      const returnTo = req.session.returnTo || BASE_PATH;
      req.session.returnTo = undefined;
      res.json({
        code: ERR_CODE.Success,
        url: returnTo
      });
    });
  })(req, res, next);
};

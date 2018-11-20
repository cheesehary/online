import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../models';

passport.serializeUser((user: User, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id: string, done) => {
  getRepository(User)
    .findOne(id)
    .then(user => done(undefined, user), err => done(err));
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'account',
      passwordField: 'password'
    },
    (account, password, done) => {
      const UserRepo = getRepository(User);
      UserRepo.findOne({ account }).then(
        user => {
          if (!user) {
            return done(undefined, false, { message: 'incorrect account' });
          }
          bcrypt.compare(password, user.password).then(
            result => {
              if (result) {
                done(undefined, user);
              } else {
                done(undefined, false, { message: 'incorrect password' });
              }
            },
            err => done(err)
          );
        },
        err => done(err)
      );
    }
  )
);

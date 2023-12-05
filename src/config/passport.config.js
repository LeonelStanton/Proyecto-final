import passport from 'passport';

import { JWT_SECRET } from '../utils.js';

import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.signedCookies['access_token'];;
  }
  return token;
}

export const init = () => {
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET,
  }, (payload, done) => {
    return done(null, payload);
  }));
};
/*
export const init = () => {
  passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return done(new Error('User already register 😨'));
      }
      const newUser = await UserModel.create({
        ...req.body,
        provider: 'Register',
        password: createHash(password),
      });
      done(null, newUser);
    } catch (error) {
      done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
    }
  }));

  passport.use('github', new GithubStrategy(githubOpts, async (accessToken, refreshToken, profile, done) => {
    let email = profile._json.email;
    let user = await UserModel.findOne({ email });
    if (user) {
      return done(null, user);
    }
    user = {
      first_name: profile._json.name,
      last_name: '',
      email,
      age: 18,
      password: '',
      provider: 'Github',
    };

    const newUser = await UserModel.create(user);
    done(null, newUser);
  }));

  passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return done(new Error('Correo o contraseña invalidos 😨'));
      }
      const isPassValid = isValidPassword(password, user);
      if (!isPassValid) {
        return done(new Error('Correo o contraseña invalidos 😨'));
      }
      console.log('Here');
      done(null, user);
    } catch (error) {
      done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (uid, done) => {
    const user = await UserModel.findById(uid);
    done(null, user);
  });
}^
*/
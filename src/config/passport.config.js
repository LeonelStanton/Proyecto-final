import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { createHash, isValidPassword } from '../utils.js';
import UserModel from '../dao/models/user.model.js';

const opts = {
  usernameField: 'email',
  passReqToCallback: true,
};

const githubOpts = {
    clientID: 'Iv1.33c49b6ce0978a4d', // Este dato debe ser pasado por parametro
    clientSecret: '5d36f85337f209be560ac487b82731988e7510a1', // Este dato debe ser pasado por parametro
    callbackURL: "http://localhost:8080/api/sessions/github/callback", // Este dato debe ser pasado por parametro
  };

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
}
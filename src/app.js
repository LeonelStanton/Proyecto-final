import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import {__dirname} from './utils.js';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import MongoStore from 'connect-mongo';
import { URI } from './db/mongodb.js';
import { init as initPassport } from './config/passport.config.js';
import productsRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';
import indexRouter from './routers/index.router.js';
import chatRouter from './routers/chat.router.js';
import sessionsRouter from './routers/sessions.router.js';
import jwtRouter from './routers/jwt.router.js';



const app = express();

const COOKIE_SECRET = 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@';
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


initPassport();


app.use(passport.initialize());


const hbs = expressHandlebars.create();
hbs.handlebars.registerHelper('isEqualThan', function(valueA, valueB, options) {
    if (valueA === valueB) {
      return options.fn(this);
    }
    return options.inverse(this);
});
hbs.handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context);
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/', indexRouter, chatRouter);
app.use('/api', productsRouter, cartRouter,jwtRouter);

export default app;

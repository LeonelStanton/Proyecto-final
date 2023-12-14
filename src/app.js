import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import { init as initPassport } from './config/passport.config.js';
import productsRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';
import indexRouter from './routers/index.router.js';
import authRouter from './routers/auth.router.js';
import config from './config.js';
import { getDirname } from './utils/utils.js';

const __dirname = getDirname(import.meta.url);



const app = express();

const COOKIE_SECRET = config.cookieSecret;
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

app.use('/', indexRouter);
app.use('/api', productsRouter, cartRouter,authRouter);

export default app;

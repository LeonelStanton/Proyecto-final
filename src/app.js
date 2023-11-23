import express from 'express';
import passport from 'passport';
import expressSession from 'express-session';
import {__dirname} from './utils.js';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import MongoStore from 'connect-mongo';
import { URI } from './db/mongodb.js';
import { init as initPassportConfig } from './config/passport.config.js'
import productsRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';
import indexRouter from './routers/index.router.js';
import chatRouter from './routers/chat.router.js';
import sessionsRouter from './routers/sessions.router.js';

const app = express();

const SESSION_SECRET = 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@';

app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 120,
  }), 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassportConfig();

app.use(passport.initialize());
app.use(passport.session());

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
app.use('/api', productsRouter, cartRouter,sessionsRouter);

export default app;

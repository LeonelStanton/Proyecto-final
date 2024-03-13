import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import expressHandlebars from 'express-handlebars';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { init as initPassport } from './config/passport.config.js';
import productsRouter from './routers/products.router.js';
import usersRouter from './routers/users.router.js';
import cartRouter from './routers/carts.router.js';
import indexRouter from './routers/index.router.js';
import authRouter from './routers/auth.router.js';
import errorMiddleware from './middlewares/error.middleware.js';
import config from './config.js';
import { getDirname } from './utils/utils.js';

// import { addLogger } from './config/logger.config.js';
import { addLogger } from './middlewares/logger.middleware.js';

const __dirname = getDirname(import.meta.url);
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Ecommerce API',
      description: 'Esta es la documentación de la API del ecommerce.',
    },
  },
  apis: [path.join(__dirname, 'docs', '**', '*.yaml')],
};
const specs = swaggerJsDoc(swaggerOptions);



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

app.use(addLogger) 
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
app.use('/api', productsRouter, cartRouter,authRouter, usersRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use(errorMiddleware)


export default app;

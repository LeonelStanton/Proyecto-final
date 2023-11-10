import express from 'express';
import {__dirname} from './utils.js';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import productsRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';
import indexRouter from './routers/index.router.js';
import chatRouter from './routers/chat.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

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
app.use('/api', productsRouter, cartRouter);

export default app;

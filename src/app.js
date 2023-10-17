import express from 'express'
import {__dirname} from './utils.js'
import handlebars from 'express-handlebars'
import path from 'path';
import productsRouter from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'
import indexRouter from './routers/index.router.js'

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../public')))
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')
app.use('/', productsRouter, cartRouter, indexRouter)

export default app;


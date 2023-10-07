import express from 'express'
import productsRouter from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'

const app = express();
const PORT=8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', productsRouter, cartRouter)


app.listen(PORT,()=>{
    console.log(`Server is running in ${PORT}`)
})
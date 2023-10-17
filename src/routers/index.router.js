import { Router } from "express";
import { emitFromApi} from '../socket.js'
import {getProducts, saveProducts} from '../utils.js'

const router = Router();


router.get("/", (req, res) => {
   
      
      const products = getProducts();
     
       
        res.status(200).render("index",{products} )
  
  });

router.get("/realtimeproducts",(req,res)=>{
    res.status(200).render("realTimeProducts");
  
   
  })
  
  router.post("/realtimeproducts",(req,res)=>{
    const products = getProducts();
   emitFromApi.emit('actual-products', { products });
  
  })
  
  
  router.delete("/realtimeproducts",(req,res)=>{
    const products = getProducts();
    emitFromApi.emit('actual-products', { products });
  })

  export default router
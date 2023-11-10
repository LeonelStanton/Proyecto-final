import mongoose, { Schema } from 'mongoose';

const productItemSchema = new Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId, ref:'Products',    
},

    quantity: {
        type: Number, default: 0,  
    },
  },{ _id: false});
  

const cartSchema = new Schema({
  products: {
    type: [productItemSchema],
    default: [] 
}
});

/*cartSchema.pre('getCartById', function() {
  this.populate('products.product');
});*/

export default mongoose.model('Cart', cartSchema);
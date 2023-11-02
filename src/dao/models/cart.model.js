import mongoose, { Schema } from 'mongoose';

const product = new Schema({
  pid: {
    type: String,
    required: true,        
},
    quantity: {
        type: Number, default: 0,  
    },
  },{ _id: false});
  

const cartSchema = new Schema({
  products: {
    type: [product],
    default: [] 
}
});

export default mongoose.model('Cart', cartSchema);
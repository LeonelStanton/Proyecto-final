import mongoose, { Schema }  from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
   
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String, 
       
        required: true
    },
 
 
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
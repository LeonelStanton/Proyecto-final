import mongoose, { Schema }  from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String,enum: ["admin", "user", "premium"], default: 'user'},
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Cart',
  },
  provider: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
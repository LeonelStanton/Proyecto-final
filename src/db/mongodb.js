import mongoose from 'mongoose';

export const URI = 'mongodb+srv://leonel:UtN834vlGJ7ouTik@cluster0.k3edcne.mongodb.net/ecommerce';

export const initDB = async () => {
  try {
  
    await mongoose.connect(URI);
    console.log('Database conected 🚀');
  } catch (error) {
    console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
  }
}
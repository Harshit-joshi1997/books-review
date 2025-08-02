import mongoose from "mongoose";


const BookSchema = new mongoose.Schema({
title: {
         type: String,
         required: true,
         },

author: {
         type: String,
         required: true,
         unique: true 
        },
price: {
         type: String,
         required: true
         },
published:{
         type: String,
         required: true 

         },
img: {
         type: String,
         required: true
        
}
},
{timestamps: true});

  export const Book = mongoose.model('Book', BookSchema);



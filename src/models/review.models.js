import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
review_text: { 
    type: String,
     required: true 
    },
  rating: { 
    type: Number,
     required: true,
      min: 1,
      max: 5 
    },
  reviewer: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true 
    },
  book:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Book', 
     required: true
     }
},
{timestamps: true});

export const Review = mongoose.model('Review', reviewSchema);
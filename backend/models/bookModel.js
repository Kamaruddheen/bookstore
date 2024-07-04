import mongoose from "mongoose";

// Define the schema for Book
const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create a model named "Book" based on bookSchema
export const Book = mongoose.model("Book", bookSchema);

import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Default route (localhost/homepage)
app.get("/", (request, response) => {
  return response.status(234).send("Welcome to Bookstore");
});

// POST: Route to create a new book
app.post("/books", async (request, response) => {
  try {
    // Check if required fields are provided
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Create a new book object
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // Insert new book into database
    const book = await Book.create(newBook);

    // Respond with the created book object
    return response.status(200).send(book);
  } catch (error) {
    // Handle errors
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET: Route to get all books from the database
app.get("/books", async (request, response) => {
  try {
    // Retrieve all books from the database
    const books = await Book.find({});

    // Respond with a JSON object containing count and data
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    // Handle errors
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET: Route to get one book by ID from the database
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Retrieve one book by its ID from the database
    const book = await Book.findById(id);

    // Respond with the retrieved book object
    return response.status(200).send(book);
  } catch (error) {
    // Handle errors
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// UPDATE: Route to update a book by ID
app.put("/books/:id", async (request, response) => {
  try {
    // Check if required fields are provided
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;

    // Update the book in the database
    const result = await Book.findByIdAndUpdate(id, request.body);

    // If no book found with the given ID, return a 404 error
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    // Respond with a success message
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    // Handle errors
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// DELETE: Route to delete a book by ID from the database
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Delete the book from the database
    const result = await Book.findByIdAndDelete(id);

    // If no book found with the given ID, return a 404 error
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    // Respond with a success message
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    // Handle errors
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log("App is listening to port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

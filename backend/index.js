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

// Route to create a new book
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

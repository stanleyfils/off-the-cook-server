// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const router = express.Router();

// ********* require Author and Book models in order to use them *********
// const Recipe = require('../models/Recipe.model');
const recipeBook = require("../models/RecipeBook.model");

// ****************************************************************************************
// POST - create a book

// <form action="/books" method="POST">
router.post("/addRecipeBook", (req, res, next) => {
  console.log(req.body);
  const { title, description } = req.body;
  recipeBook
    .create({ title, description })
    .then((bookDoc) => res.status(200).json(bookDoc))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route to get all the books

router.get("/recipeBooks", (req, res, next) => {
  recipeBook
    .find()
    .then((booksFromDB) => res.status(200).json(booksFromDB))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to delete the book

// <form action="/books/{{this._id}}/delete" method="post">
router.post("/recipeBooks/:recipeBookId/delete", (req, res, next) => {
  recipeBook
    .findByIdAndRemove(req.params.recipeBookId)
    .then(() => res.json({ message: "Successfully removed!" }))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to save recipe book updates

// <form action="/books/{{foundBook._id}}/update" method="POST">
router.post("/recipeBooks/:recipeBookId/update", (req, res, next) => {
  recipeBook
    .findByIdAndUpdate(req.params.recipeBookId, req.body, { new: true })
    .then((updatedBook) => res.status(200).json(updatedBook))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the recipe book details

router.get("/recipeBooks/:recipeBookId", (req, res, next) => {
  console.log("searching for recipeBook: ", req.params.recipeBookId);
  recipeBook
    .findById(req.params.recipeBookId)
    .populate("recipes")
    .then((foundBook) => {
      console.log({ foundBook });
      res.status(200).json(foundBook);
    })
    .catch((err) => next(err));
});

module.exports = router;

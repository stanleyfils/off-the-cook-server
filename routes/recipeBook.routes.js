// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router();

// ********* require Author and Book models in order to use them *********
const Recipe = require('../models/Recipe.model');
const RecipeBook = require('../models/RecipeBook.model');

// ****************************************************************************************
// POST - create a book

// <form action="/books" method="POST">
router.post('/recipeBooks', (req, res) => {
	// console.log(req.body);
	recipeBook
		.create(req.body)
		.then((bookDoc) => res.status(200).json({ recipeBook: bookDoc }))
		.catch((err) => next(err));
});

// ****************************************************************************************
// GET route to get all the books

router.get('/recipeBooks', (req, res) => {
	recipeBook
		.find()
		.then((booksFromDB) => res.status(200).json({ recipeBook: booksFromDB }))
		.catch((err) => next(err));
});

// ****************************************************************************************
// POST route to delete the book

// <form action="/books/{{this._id}}/delete" method="post">
router.post('/recipeBooks/:recipeBookId/delete', (req, res) => {
	recipeBook
		.findByIdAndRemove(req.params.bookId)
		.then(() => res.json({ message: 'Successfully removed!' }))
		.catch((err) => next(err));
});

// ****************************************************************************************
// POST route to save the updates

// <form action="/books/{{foundBook._id}}/update" method="POST">
router.post('/recipeBooks/:id/update', (req, res) => {
	recipeBook
		.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((updatedBook) => res.status(200).json({ recipeBook: updatedBook }))
		.catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the book details

router.get('/recipeBooks/:someBookId', (req, res) => {
	recipeBook
		.findById(req.params.someBookId)
		.populate('recipe')
		.then((foundBook) => res.status(200).json({ recipeBook: foundBook }))
		.catch((err) => next(err));
});

module.exports = router;

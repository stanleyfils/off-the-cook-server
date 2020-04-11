// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const recipeRouter = express.Router();

// ********* require Recipe model in order to use it for CRUD *********
const Recipe = require('../models/Recipe.model');

// ****************************************************************************************
// POST route to create a new recipe in the DB

// <form action="/authors" method="POST">
recipeRouter.post('/recipes', (req, res, next) => {
	console.log(req.body);
	Recipe.create(req.body).then((recipeDoc) => res.status(200).json(recipeDoc)).catch((err) => next(err));
});

// ****************************************************************************************
// GET all recipes from the DB

recipeRouter.get('/recipes', (req, res, next) => {
	recipe
		.find() // <-- .find() method gives us always an ARRAY back
		.then((recipesFromDB) => res.status(200).json({ recipes: recipesFromDB }))
		.catch((err) => next(err));
});

// ****************************************************************************************
// POST route to delete the recipe

recipeRouter.post('/recipes/:recipeId/delete', (req, res) => {
	recipe
		.findByIdAndRemove(req.params.recipeId)
		.then(() => res.json({ message: 'Successfully removed!' }))
		.catch((err) => next(err));
});

// ****************************************************************************************
// POST route to save the recipe updates

recipeRouter.post('/recipes/:id/update', (req, res) => {
	recipe
		.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((updatedBook) => res.status(200).json({ recipeBook: updatedBook }))
		.catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the recipe details

recipeRouter.get('/recipes/:someRecipeId', (req, res) => {
	recipeBook
		.findById(req.params.someRecipeId)
		.populate('recipe')
		.then((foundBook) => res.status(200).json({ recipeBook: foundBook }))
		.catch((err) => next(err));
});

module.exports = recipeRouter;

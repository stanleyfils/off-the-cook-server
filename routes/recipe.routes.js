// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const recipeRouter = express.Router();

// ********* require Recipe model in order to use it for CRUD *********
const Recipe = require("../models/Recipe.model");
const axios = require("axios");

// ****************************************************************************************
// POST route to create a new recipe in the DB

// *********<form action="/authors" method="POST">
recipeRouter.post("/addRecipe", (req, res, next) => {
  console.log(req.body);
  Recipe.create(req.body)
    .then((recipeDoc) => res.status(200).json(recipeDoc))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET all recipes from the DB

recipeRouter.get("/recipes", (req, res, next) => {
  Recipe.find() // <-- .find() method gives us always an ARRAY back
    .then((recipesFromDB) => res.status(200).json(recipesFromDB))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to delete a recipe

recipeRouter.post("/recipes/:recipeId/delete", (req, res) => {
  Recipe.findByIdAndRemove(req.params.recipeId)
    .then(() => res.json({ message: "Recipe successfully removed!" }))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to update a recipe

recipeRouter.post("/recipes/:recipeId/update", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.recipeId, req.body, { new: true })
    .then((updatedRecipe) => res.status(200).json(updatedRecipe))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the recipe details

recipeRouter.get("/recipes/:recipeId", (req, res) => {
  Recipe.findById(req.params.recipeId)
    .populate("recipe")
    .then((foundRecipe) => res.status(200).json(foundRecipe))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the recipe from external API

recipeRouter.post("/searchRecipes", (req, res, next) => {
  axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${req.body.param}&apiKey=${process.env.API_KEY}`
    )
    .then((recipesFromAPI) => {
      console.log(recipesFromAPI);
      res.status(200).json(recipesFromAPI.data.results);
    })
    .catch((err) => res.status(400).json({ message: err }));
});

// GET route for getting the ingredients for a recipe
recipeRouter.post("/get-ingredients/:id", (req, res, next) => {
  const { id } = req.params;
  axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.API_KEY}`
    )
    .then((ingredients) => {
      res.status(200).json(ingredients.data);
    })
    .catch((err) =>
      console.log("Error while getting the ingredients on server side: ", err)
    );
});

module.exports = recipeRouter;

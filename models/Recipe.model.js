const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
	{
		title: { type: String, require: true },
		prepTime: String,
		cookTime: String,
		servings: Number,
		ingredients: { type: String, required: true },
		directions: String,
		nutrition: String
		// image: URL
	},
	{
		timestamp: true
	}
);

module.exports = model('Recipe', recipeSchema);

//add author

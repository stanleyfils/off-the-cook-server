const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeBookSchema = new Schema(
	{
		title: { type: String, require: true },
		description: String
		// image: URL
	},
	{
		timestamp: true
	}
);

module.exports = model('recipeBook', recipeBookSchema);

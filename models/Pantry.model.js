const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const pantrySchema = new Schema(
	{
		title: { type: String, require: true }
	},
	{
		timestamp: true
	}
);

module.exports = model('Pantry', pantrySchema);

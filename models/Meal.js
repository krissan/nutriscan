const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Meal Schema
const MealSchema = new schema({
    meal: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    }
});

module.exports = Meal = mongoose.model('meal', MealSchema);
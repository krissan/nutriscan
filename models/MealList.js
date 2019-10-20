const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Meal Schema
const MealListSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'users'
    },
    MealList: [{
        type: schema.Types.ObjectId,
        ref: '  meal'}],
    ddate: {
        type: String,
        required: true,
        default: Date.now
    }
});

module.exports = MealList = mongoose.model('meallist', MealListSchema);
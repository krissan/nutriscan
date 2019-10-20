const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');

const Meallist = require('../../models/MealList');
const Meal = require('../../models/Meal');
const User = require('../../models/User');


// @route POST api/meals
// @desc create a meal
// Private
router.post('/', [
        auth,
        [check('text', 'Text is required').not().isEmpty()]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const newMeal = new Meal({
                name: req.body.name,
                calories: req.body.calories
            });

            const mealObj = await Meal.findOne({name: req.body.name});

            if(!mealObj.isEmpty()) {
                return res.status(400).json({msg: 'Meal already exists'})
            }

            console.log(1);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        const meal = await newMeal.save();
        res.json(meal);
    }
);

// @route   GET api/meal/:meal_id
// @desc    Get meal
// @access  Public
router.get('/id', auth, async (req, res) => {
    try {

        const meal = await Meal.findById(req.query.id);

        if (!meal){
            return res.status(400).json({msg: 'This meal no longer exists'});
        }

        res.json(meal);
    } catch(err)
    {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'meal not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   GET api/meal
// @desc    Get meal
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const meal = await Meal.findOne({name: req.body.name});

        if (!meal){
            return res.status(400).json({msg: "Can't Find meal"});
        }

        res.json(meal);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   Delete api/meal/:id
// @desc    Delete a meal
// @access  Private
router.delete('/:id', auth, async(req,res) => {
    try {
        const meal = await Meal.findOneAndRemove({id: req.params.id});
        res.json(meal);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
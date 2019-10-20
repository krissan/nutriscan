const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult } = require('express-validator/check');

const Meallist = require('../../models/MealList');
const Meal = require('../../models/Meal');
const User = require('../../models/User');

// @route   GET api/meallist/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        //console.log(1);
        const meallist = await Meallist.findOne({user: req.user.id, ddate: req.query.ddate}).populate('user', ['name']);
        /*console.log(2);
        console.log(meallist);
*/
        if (meallist == null){
            return res.json({msg: 'There is no meal list for date or user'});
        }

        console.log(meallist)

        res.json(meallist);
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

function isJSON (something) {
    if (typeof something != 'string')
        something = JSON.stringify(something);

    try {
        JSON.parse(something);
        return true;
    } catch (e) {
        return false;
    }
}

//@route POST api/meallist
//@desc  Create or update user meallist
//@access Private
router.post('/', [auth, [
    check('ddate', 'Date is required').not().isEmpty(),
    check('meallist', 'Meal list is required').not().isEmpty()
]], async (req, res) =>  {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const ddate = req.body.ddate + '';


        //Build Meallist object
        const mealListObj = {};
        mealListObj.user = req.user.id;

        if(req.body.meallist) {
            if(isJSON(req.body.meallist)){
                mealListObj.MealList = req.body.meallist;
            }
            else
            {
                mealListObj.MealList = JSON.parse(req.body.meallist);
            }

            for (i = 0; i < mealListObj.MealList.length;i++)
            {
                try {
                    let userMeal = Meal.findOne({meal: mealListObj.MealList[i].meal, calories: mealListObj.MealList[i].calories});
                    if(!userMeal.obj) {
                        userMeal = new Meal(mealListObj.MealList[i]);
                        await userMeal.save(function (err) {
                            if (err) return console.log(err)});
                        mealListObj.MealList[i] = userMeal;
                    }
                }
                catch (err)
                {
                    console.error(err.message);
                    res.status(500).send('Server Error');
                }
            }

        }
        if(ddate) {
            mealListObj.ddate = ddate;
        }
        
        try {
            let userMealList = Meallist.findOne({user: mealListObj.user, ddate: mealListObj.ddate });
            if(userMealList.obj)
            {
                //update
                userMealList = await Meallist.findOneAndUpdate({user: req.user.id}, {$set: mealListObj}, {new: true});
                return res.json(userMealList);
            }

            //create
            userMealList = new Meallist(mealListObj);
            await userMealList.save(function (err) {
                if (err) return console.log(err)});

            res.json(userMealList);
        }
        catch (err)
        {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//@route GET api/meallist
//@desc  Get all users meallists
//@access Public
router.get('/', auth, async (req, res) => {
    try {
        const meallists = await Meallist.find({user: req.user}).populate('user', ['name']);

        if (!meallists){
            return res.status(400).json({msg: 'There is no meal lists'});
        }

        res.json(meallists)
    } catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/meallist
// @desc    meallist
// @access  Private
router.delete('/:id', auth, async(req,res) => {
    try{
        // Remove Meal List
        await Meallist.findByIdAndRemove(req.params.id);
        res.json({msg: 'User deleted'});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/meallist/meal/:meal_id
// @desc    Delete meallist meal
// @access  Private
router.delete('/meal/:meal_id', auth, async(req,res) => {
    try{
        // Get Meal List
        const userMealList = Meallist.findone({user: req.user.id, ddate: ddate });
       
        // Get remove index
        const removeIndex = meallist.meal.map(item => item.id).indexOf(req.params.meal_id);

        meallist.meal.splice(removeIndex, 1);

        await meallist.save();

        res.json(meallist);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   Put api/meallist/meal
// @desc    Add mealist meal
// @accesss Private
router.put('/meal', [auth, [
    check('Name', 'Name is required').not().isEmpty(),
    check('Calories', 'Calories is required').not().isEmpty()    
]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {
        name,
        calories
    } = req.body;

    const mealObj = {
        name,
        calories
    }

    try {
        let mealRef = await meal.findOne({name: req.body.name})
        if (!mealRef){
            //create
            mealRef = new Meal(mealObj);
            await Meal.save();
        }
        res.json(mealRef);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    console.log(mealRef);

    try {
        const meallist = await meallist.findOne({user: req.user.id, ddate: req.body.ddate})
        meallist.push(mealRef);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);





module.exports = router;
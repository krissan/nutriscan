const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User')

// @route POST api/users
// @desc  Register user
// @access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password',
          'Please enter a password with 6 or more characters').isLength({min:6}),
          check('birthdate',
          'Please enter a valid birth date').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password, birthdate} = req.body;
    try {
        let user = await User.findOne({ email });
        
        if(user) {
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        // See if user exists
        user = new User({
            name,
            email,
            password,
            birthdate
        });
        const salt = await bcrypt.genSalt(10);

        // Encrypt password
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err,token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch(err)
    {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
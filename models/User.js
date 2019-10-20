const mongoose = require("mongoose");
const schema = mongoose.Schema;

//User Schema
const UserSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('users', UserSchema);
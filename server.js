const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/meallist', require('./routes/api/meallist'));
app.use('/api/meal', require('./routes/api/meal'));

//Serve Static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
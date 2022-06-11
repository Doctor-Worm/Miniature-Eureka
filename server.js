const express = require('express');

const PORT = 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
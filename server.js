const express = require('express');

const PORT = 3001;
const app = express();
const routes = require('./routes');

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.use(routes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
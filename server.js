const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1', '8.8.8.8']);


const express = require('express');

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if(err) {
        console.log('Database initialization error:', err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node running on ${port}`)});
    }
}); 



// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const NodeCache = require( "node-cache" );
const fetch = require('node-fetch');

const myCache = new NodeCache({ stdTTL: 15 })

// defining the Express app
const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

const nbaFeed = 'https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json';
const mlbFeed = 'https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json';

app.get("/nba", async (req, res) => {
    try {
        // check if Cache has the key
        if(myCache.has('sbnba')) {
            console.log('return from cache')
           return res.send(myCache.get('sbnba'))
        } else {
            console.log('return from api')
            fetch(nbaFeed).then((response) => response.json() ).then((json) => {

                myCache.set('sbnba', json)
                res.send(json)

            });
        }
    }
    catch (err) {
        next(err);
    }
});


app.get("/mlb", async (req, res) => {
    try {
        // check if Cache has the key
        if(myCache.has('sbmlb')) {
            console.log('return from cache')
           return res.send(myCache.get('sbmlb'))
        } else {
            console.log('return from api')
            fetch(mlbFeed).then((response) => response.json() ).then((json) => {

                myCache.set('sbmlb', json)
                res.send(json)

            });
        }
    }
    catch (err) {
        next(err);
    }
});


  
// return error message
app.use((err, req, res, next) => {
    res.send("There was an error");
})

// starting the server
app.listen(5001, () => {
    console.log('listening on port 5001');
});



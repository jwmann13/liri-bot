require("dotenv").config();

const axios = require('axios');

const Spotify = require('node-spotify-api')

const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

function commands(command, ...args) {
    switch (command) {
        case 'concert-this':
            args.forEach(el => {
                axios.get(`https://rest.bandsintown.com/artists/${el}/events?app_id=codingbootcamp`).then(response => {
                    console.log(response.data);

                }, error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an object that comes back with details pertaining to the error that occurred.
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    console.log(error.config);

                })
            })
            break;

        case 'spotify-this-song':
            spotify.search({
                type: 'track',
                query: 'All the Small Things'
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(data);
            });
            break;

        case 'movie-this':

            break;

        case 'do-what-it-says':

            break;

        default:
            break;
    }
}

commands(process.argv[2], ...process.argv.slice(3))
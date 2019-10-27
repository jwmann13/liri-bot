const Moment = require('moment')
const axios = require('axios');
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);
const omdbKey = keys.omdb.id;


const commands = {
    concert(concertInput) {
         // call to bandsintown api
         axios.get(`https://rest.bandsintown.com/artists/${concertInput}/events?app_id=codingbootcamp`).then(response => {
            // if there are no events
            if (response.data == false) {
                console.log('There are no events for this artist');
            // if there is no region to log, log without it
            } else if (response.data[0].venue.region == false) {
                console.log(`\n${response.data[0].lineup[0]} plays at ${response.data[0].venue.name} in ${response.data[0].venue.city}, ${response.data[0].venue.country} on ${Moment(response.data[0].datetime).format('MM/DD/YYYY hh:mm')}`);
            // log all relevant data
            } else {
                console.log(`\n${response.data[0].lineup[0]} plays at ${response.data[0].venue.name} in ${response.data[0].venue.city}, ${response.data[0].venue.region}, ${response.data[0].venue.country} on ${Moment(response.data[0].datetime).format('MM/DD/YYYY hh:mm')}`);
            }
        // error handling
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
    },

    spotify(songInput) {
        // spotify api search
        spotify.search({
            type: 'track',
            query: songInput
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            // log relevant data
            console.log(`\n"${data.tracks.items[0].name}" by ${data.tracks.items[0].artists[0].name} off of ${data.tracks.items[0].album.name}\n${data.tracks.items[0].external_urls.spotify}`);
        });
    },

    movie(movieInput) {
        // call to omdb api
        axios.get(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${movieInput}`).then(response => {
                
            // if there is no ratings list, log without
            if (response.data.Ratings == false) {
                console.log(`\nTitle: ${response.data.Title}\nYear: ${response.data.Year}\nimdb Rating: N/A\nRotten Tomatoes Score: N/A\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}`);
            // log all relevant data
            } else {
                console.log(`\nTitle: ${response.data.Title}\nYear: ${response.data.Year}\nimdb Rating: ${response.data.Ratings[0]['Value']}\nRotten Tomatoes Score: ${response.data.Ratings[1]['Value']}\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}`);
            }
        // error handling
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
    }
}

module.exports = commands;
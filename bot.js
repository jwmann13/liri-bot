require("dotenv").config();

const axios = require('axios');

const fs = require('fs');

const Moment = require('moment')

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

const omdbKey = keys.omdb.id;

function commands(command, ...args) {
    switch (command) {
        case 'concert-this':
            let prevArgConcert = '';
            args.forEach(el => {
                el = prevArgConcert + el;
                prevArgConcert = el;
            })

            axios.get(`https://rest.bandsintown.com/artists/${prevArgConcert}/events?app_id=codingbootcamp`).then(response => {
                if (response.data == false) {
                    console.log('There are no events for this artist');
                } else if (response.data[0].venue.region == false) {
                    console.log(`\n${response.data[0].lineup[0]} plays at ${response.data[0].venue.name} in ${response.data[0].venue.city}, ${response.data[0].venue.country} on ${Moment(response.data[0].datetime).format('MM/DD/YYYY hh:mm')}`);
                } else {
                    console.log(`\n${response.data[0].lineup[0]} plays at ${response.data[0].venue.name} in ${response.data[0].venue.city}, ${response.data[0].venue.region}, ${response.data[0].venue.country} on ${Moment(response.data[0].datetime).format('MM/DD/YYYY hh:mm')}`);
                }
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
            break;

        case 'spotify-this-song':
            let prevArgSpotify = '';
            args.forEach(el => {
                el = prevArgSpotify + el;
                prevArgSpotify = el + ' ';
            })

            spotify.search({
                type: 'track',
                query: prevArgSpotify
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                // console.log(data);
                console.log(`\n"${data.tracks.items[0].name}" by ${data.tracks.items[0].artists[0].name} off of ${data.tracks.items[0].album.name}\n${data.tracks.items[0].external_urls.spotify}`);

            });
            break;

        case 'movie-this':
            let prevArgMovie = '';
            args.forEach(el => {
                el = prevArgMovie + el;
                prevArgMovie = el + ' ';
            })

            axios.get(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${prevArgMovie}`).then(response => {
                // console.log(response);
                
                if (response.data.Ratings == false) {
                    console.log(`\nTitle: ${response.data.Title}\nYear: ${response.data.Year}\nimdb Rating: N/A\nRotten Tomatoes Score: N/A\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}`);
                } else {
                    console.log(`\nTitle: ${response.data.Title}\nYear: ${response.data.Year}\nimdb Rating: ${response.data.Ratings[0]['Value']}\nRotten Tomatoes Score: ${response.data.Ratings[1]['Value']}\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}`);
                }

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
            break;

        case 'do-what-it-says':
            fs.readFile('random.txt', 'utf-8', (error, data) => {
                if (error) {
                    return console.log(error);
                }

                let dataArr = data.split(',');
                commands(...dataArr);
            })
            break;

        default:
            break;
    }
}

commands(process.argv[2], ...process.argv.slice(3))
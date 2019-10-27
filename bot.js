require("dotenv").config();

const fs = require('fs');

const commandObj = require('./commands.js')

function commands(command, ...args) {
    switch (command) {
        case 'concert-this':
            // concatenate all arguments after initial command
            let prevArgConcert = '';
            args.forEach(el => {
                el = prevArgConcert + el;
                prevArgConcert = el;
            })

            if (prevArgConcert == false) {
                commandObj.concert('Warren G')
            } else {
                commandObj.concert(prevArgConcert);
            }
            break;

        case 'spotify-this-song':
            let prevArgSpotify = '';
            args.forEach(el => {
                el = prevArgSpotify + el;
                prevArgSpotify = el + ' ';
            })

            if (prevArgSpotify == false) {
                commandObj.spotify('The sign Ace of base')
            } else {
                commandObj.spotify(prevArgSpotify);
            }
            break;

        case 'movie-this':
            let prevArgMovie = '';
            args.forEach(el => {
                el = prevArgMovie + el;
                prevArgMovie = el + ' ';
            })

            if (prevArgMovie == false) {
                commandObj.movie('Mr. Nobody');
            } else {
                commandObj.movie(prevArgMovie);
            }
            break;

        case 'do-what-it-says':
            // read random.txt
            fs.readFile('random.txt', 'utf-8', (error, data) => {
                if (error) {
                    return console.log(error);
                }

                // split by comma and pass spread array to commands function
                let dataArr = data.split(',');
                commands(...dataArr);
            })
            break;

        default:
            break;
    }
}

commands(process.argv[2], ...process.argv.slice(3))
# LIRI-Bot

LIRI Bot is a command tool that retrieves information on concerts from Bandsintown, songs from Spotify, and movies from OMDB APIs. It was created as a homework assignment for the Georgia Tech Coding Bootcamp in October 2019.

View a demo at: https://youtu.be/gzw-rYBgja0

## Getting Started

### Installing

To install LIRI Bot clone this repo
```
git clone git@github.com:jwmann13/liri-bot.git
```

### Prerequisites

LIRI Bot requires four node packages that are included in the package.json ```npm install``` will download the appropriate packages. However, if for some reason the package.json does not include the appropriate dependecies run:
```
npm install node-spotify-api
npm install dotenv
npm install moment
npm install axios
```

## Features

LIRI Bot runs through node and offers three different commands:
```
node bot.js concert-this [artist name]
node bot.js spotify-this-song [song title]
node bot.js movie-this [movie title]
```
There is one more command
```
node bot.js do-what-it-says
```

which will run the command inside the random.txt. At this time it is defaulted to
```
node bot.js spotify-this-song "I Want it That Way"
```

LIRI Bot will log all commands into the log.txt file in the form
```[command], [all passed arguments]```

## Authors

* __Jeffrey Mann__ - all contributions

## License

This project is licensed under the MIT License

Copyright 2019 Jeffrey Mann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
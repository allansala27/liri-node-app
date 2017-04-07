// require files
var keysFile = require("./keys.js");
var fs = require("fs");
var spotify = require('spotify');
var Twitter = require('twitter');
var request = require("request");

// store keys in a variable
var twitterKeys = keysFile.twitterKeys;

// take in commands
var argument = process.argv[2];

// functions
var getTweets = function (twitterAccount)  {
	var client = new Twitter(twitterKeys);
	var params = {screen_name: twitterAccount};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (tweets.length < 20) {
    		for (var i = 0; (i < tweets.length); i++) {
    			console.log("Tweet: " + tweets[i].text);
    			console.log("	-" + tweets[i].created_at);
    			console.log("---------------------------------------------------------------")
    		}
    	}
    	else {
    		for (var i = 0; (i < 20); i++) {
    			console.log("Tweet: " + tweets[i].text);
    			console.log("	-" + tweets[i].created_at);
    			console.log("---------------------------------------------------------------")
    		}
    	}
	});
}

var getSong = function (songTitle) {
	spotify.search({ type: 'track', query: songTitle }, function(err, data) {
    	var artist = data.tracks.items[0].album.artists[0].name;
    	var album = data.tracks.items[0].album.name;
    	console.log("Artist(s): " + artist);
    	console.log("Song: " + data.tracks.items[0].name);
    	console.log("Preview: " + data.tracks.items[0].preview_url);
    	console.log("Album: "+ album);
	});
}

var getMovie = function (movieTitle) {
	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json";
	request(queryUrl, function(error,response,body) {
		if (!error && response.statusCode === 200) {
		console.log("Movie: " + movieTitle.split("+").join(" "));
  		console.log("Released on: " + JSON.parse(body).Year);
  		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
  		console.log("Produced in: " + JSON.parse(body).Country);
  		console.log("Language: " + JSON.parse(body).Language);
  		console.log("Plot: " + JSON.parse(body).Plot);
  		console.log("Starring: " + JSON.parse(body).Actors);
  		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
  		}
	});
}

var doThis = function () {
	fs.readFile("random.txt", "utf8", function(error, data) {
		var dataArr = data.split(",");
		switch(dataArr[0]) {
            case "my-tweets" :
                getTweets(dataArr[1]);
                break;
            case "spotify-this-song" :
                getSong(dataArr[1]);
                break;
            case "movie-this" :
                getMovie(dataArr[1]);
                break;
        }        
	});
}

// switch statements to handle arguments
switch(argument) {
    case "my-tweets" :
        getTweets(process.argv[3]);
        break;
    case "spotify-this-song" :
        getSong(process.argv.splice(3));
        break;
    case "movie-this" :
        getMovie(process.argv.splice(3).join("+"));
        break;
    case "do-what-it-says" :
        doThis();
        break;
    default :
        console.log("Not a valid command. Try Again.");                
}

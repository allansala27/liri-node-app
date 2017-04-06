// get access to exports
var keysFile = require("./keys.js");

// store keys in a variable
var twitterKeys = keysFile.twitterKeys;

// take in commands
var argument = process.argv[2];

if(argument === "my-tweets") {
	var Twitter = require('twitter'); 
	var client = new Twitter(twitterKeys);
	var twitterAccount = process.argv[3];
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

if(argument === "spotify-this-song") {
	var spotify = require('spotify');
	var song = process.argv.splice(3);
	spotify.search({ type: 'track', query: song }, function(err, data) {
    	var artist = data.tracks.items[0].album.artists[0].name;
    	var album = data.tracks.items[0].album.name;
    	console.log("Artist(s): " + artist);
    	console.log("Song: " + data.tracks.items[0].name);
    	console.log("Preview: " + data.tracks.items[0].preview_url);
    	console.log("Album: "+ album);
	});
}

if(argument === "movie-this") {
	var movie = process.argv.splice(3).join("+");
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
	var request = require("request");
	request(queryUrl, function(error,response,body) {
		if (!error && response.statusCode === 200) {
		console.log("Movie: " + movie.split("+").join(" "));
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

if(argument === "do-what-it-says") {
	var fs = require("fs");
	fs.readFile("random.txt", "utf8", function(error, data) {
		console.log("node liri.js do-what-it-says " + data);
	});
}
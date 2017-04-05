// get access to exports
var keysFile = require("./keys.js");

// store keys in a variable
var twitterKeys = keysFile.twitterKeys;

// take in commands
var argument = process.argv[2];

if(argument === "my-tweets") {
	//do this
}

if(argument === "spotify-this-song") {
	//do this
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

if(argument === "do-what-it-says"){
	//do this
}
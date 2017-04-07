# HW - {liri-node-app}

## Description

- A command line Application. First navigate to the file via command line. Type "node liri.js" followed by any of the four commands: 
	- "my-tweets" followed by a space then a twitter account name
		- example: "node liri.js my-tweets nba"
	- "spotify-this-song" followed by a space then a song name
		- example: "node liri.js spotify-this-song 3005"
	- "movie-this" followed by a space and movie title
		- example: "node liri.js movie-this armageddon"
	- "do-what-it-says"
		- This will run whatever is written to the random.txt file
		- Full description in code explanation

## Requirements

- Use of Twitter npm and keys
- Use of Spotify npm
- File System node package


## Technologies Used

- Twitter npm
- Spotify npm
- File System node package
- Javascript for node functionality

## Code Explaination

- The first thing I did was declare the required npm packages to install at the top of the Javascript file.
	- Only after these packages have been installed is when the application will work.
- I obtained twitter keys and secrets from the website and saved them on a separated document called "keys.js" and made them into an exportable object.
- I then created a variable to store the command line argument that will be passed into a switch statement that will run the corresponding function.
- The getTweets function will run when the argument is "my-tweets".
	- This function takes in a twitter account as an argument.
	- Using the Twitter npm and keys, I am able to use the client.get method to retrieve data based on the twitter account passed in. 
	- I then use an if/else condition to check if up to 20 tweets can be retrieved or not.
	- In the conditionals, there are for loops to print out the most recent tweets and their time of creation.
- The getSong function will run when the argument is "spotify-this-song".
	- This function takes in a song title as an argument.
	- Using the Spotify npm, I am able to use the spotify.search method to retrieve data based on the song passed in.
	- Since there are many songs of the same title I just decided to print the information of the first song in the search query since it tended to be the most popular one.
	- From there it was just a matter of parsing through the object returned to find the Artist, preview link, and album name.
- The getMovie function will run when the argument is "movie-this".
	- This function takes in a movie title as an argument.
	- Using the OMDB api query search parameter url, I created a request using the query url with the movie title in it. 
	- From there it was a matter of parsing through the object returned to output the appropriate information.
- The doThis function will run when the argument is "do-what-it-says".
	- Using the fs npm, I am able to use the fs.readFile method to read from "random.txt".
	- I split the data read from random.txt at the comma and pushed the strings into an array.
	- Using that array I created a similar switch statement to the one which is handling the command line arguments.
		- The switch statement also calls the same functions based on what the 0 index is in the array.
		- The only difference is the argument passed in which would be the 1 index in the array.
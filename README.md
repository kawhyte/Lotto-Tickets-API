///SET-UP////



//Install dependencies 

npm install --save  


//Seed MongoDb

Make sure that you MongoDB is installed and running on your machine

macOS - https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-os-x/

Import data from JSON file (lotto-data.json)to your database with teh followinng command :


mongoimport --db lotto --collection tickets --drop --file lotto-data.json --jsonArray;


// Run with "node index.js"





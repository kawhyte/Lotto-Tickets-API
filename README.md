///How to set-up and run the Lotto App////

//Install dependencies 

1. npm install --save  


//Seed MongoDb

2. Make sure that you MongoDB is installed and running on your machine

macOS - https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-os-x/

3. Import sample data from JSON file (lotto-data.json)to your database with teh followinng command :

mongoimport --db lotto --collection tickets --drop --file seed_data/lotto-data.json --jsonArray


4. Set an enviroment variable (eg. In cmd/Terminal - export Lotto_jwtPrivateKey=password)

5. Run with "node index.js"





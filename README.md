
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Face" src="https://res.cloudinary.com/babyhulk/image/upload/w_48,h_48,f_auto/v1589318555/hero-image/avatar-01.png" width="60" />
  </a>
</p>
<Lotto API
</h1>

An API for the Florida Lottery Scratch-off game


## 🚀 Tech Stack

**Client:** HTML, CSS

**Server:** Node, Express, MongoDB

## Demo

https://lottoticketapi.herokuapp.com/api-docs/


## Screenshots

![Florida Lottery API](https://res.cloudinary.com/babyhulk/image/upload/v1636152959/project/Screen_Shot_2021-11-05_at_3.55.47_PM.png)



## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.kennywhyte.com/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/IAmKennyWhyte)



## How to set-up and run 

**Install dependencies** 

1. npm install --save  


## Seed MongoDb

2. Make sure that you MongoDB is installed and running on your machine

macOS - https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-os-x/

3. Import sample data from JSON file (lotto-data.json)to your database with teh followinng command :

mongoimport --db lotto --collection tickets --drop --file seed_data/lotto-data.json --jsonArray


4. Set an enviroment variable (eg. In cmd/Terminal - export Lotto_jwtPrivateKey=password)

5. Run with "node index.js"



[MIT]


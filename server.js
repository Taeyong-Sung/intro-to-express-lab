// import modules
import { collectibles, shoes } from "./data.js";
import express from "express";
// create Express app

const app = express();

// configure the app (app.set)

// mount Middleware (app.use)

// mount routes

// 1. Be Polite, Greet the User
app.get("/greetings/:name", function (req, res) {
  res.send(`<h1>Hello There, ${req.params.name}.</h1>`);
});
// 2. Rolling the Dice
app.get("/roll/:number", function (req, res) {
  let diceValue = Math.floor(Math.random() * parseInt(req.params.number) + 1);
  if (isNaN(diceValue)) {
    res.send(`You must specify a number`);
  } else {
    res.send(`You rolled a ${diceValue}`);
  }
});
// 3. I Want THAT One!
app.get("/collectibles/:item", function (req, res) {
  let idx = parseInt(req.params.item);
  if (idx > collectibles.length - 1) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    res.send(
      `So, you want the ${collectibles.at(idx).name}? For ${
        collectibles.at(idx).price
      }, it can be yours!`
    );
  }
});
// 4. Filter Shoes by Query Parameters

app.get("/shoes", function (req, res) {
  if (req.query['min-price'] && req.query['max-price'] && req.query.type) {
    const minPrice = req.query['min-price'];
    const maxPrice = req.query['max-price'];
    const shoeType = req.query.type;
    let filteredShoes = shoes.filter((shoe) => {
      return (
        shoe.price >= minPrice &&
        shoe.price <= maxPrice &&
        shoe.type === shoeType
      );
    });
    res.send(filteredShoes);
  } else {
    res.send(shoes);
  }
});

// tell the app to listen on port 3000

app.listen(3000, function () {
  console.log("Listening on port 3000");
});

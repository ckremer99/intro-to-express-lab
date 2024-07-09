const express = require("express");
const app = express();

const PORT = 3000;

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/greetings/:username", (req, res) => {
  const name = req.params.username;
  res.send(`<h1>Hello there, ${name}.</h1>`);
});

app.get("/roll/:maxNumber", (req, res) => {
  const maxNumber = Number(req.params.maxNumber);
  console.log(typeof maxNumber);
  if (isNaN(maxNumber)) {
    res.send("<h1>You must enter a number</h1>");
  } else {
    randomNumber = Math.floor(Math.random() * maxNumber);
    res.send(`<h1>You rolled a ${randomNumber}</h1>`);
  }
});

app.get("/collectibles/:indexParameter", (req, res) => {
  const index = Number(req.params.indexParameter);
  if (isNaN(index)) {
    res.send("<h1>Index is not a number</h1>");
  } else if (index >= collectibles.length) {
    res.send("<h1>This item is not yet in stock. Check back soon!</h1>");
  } else {
    const itemName = collectibles[index].name;
    const itemPrice = collectibles[index].price;
    res.send(
      `<h1>So you want the ${itemName}? For $${itemPrice} it can be yours.</h1>`
    );
  }
});

app.get("/shoes", (req, res) => {
    const min_price = Number(req.query.min_price);
    const max_price = Number(req.query.max_price);
    const type = req.query.type;

    const filteredShoes = shoes.filter((shoe) => {
        return (shoe.type === type && shoe.price <= max_price && shoe.price >= min_price)
    })
    
    res.send(filteredShoes);
});

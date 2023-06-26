"use strict";
console.log("you chose the Product!");

// global varaibles
// querySelector returns the first element in the document that matches
const ProductContainer = document.querySelector("section");
const resultsButton = document.querySelector("section + div");
const image1 = document.querySelector("section img:first-child");
const image2 = document.querySelector("section img:nth-child(2)");

let clicks = 0;
const maxClicksAllowed = 5;

let allProducts = [];

function getRandomNumber() {
  return Math.floor(Math.random() * allProducts.length);
}

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

function renderProducts() {
  // we need to generate a number to reference the Product we want to render onto the page
  let Product1 = getRandomNumber();
  let Product2 = getRandomNumber();

  // how could we prevent Product1 being the same number a Product2?
  while (Product1 === Product2) {
    Product2 = getRandomNumber();
  }

  // now we have two random numbers lets set the attributes of our images in the document.
  image1.src = allProducts[Product1].src;
  image2.src = allProducts[Product2].src;
  image1.alt = allProducts[Product1].name;
  image2.alt = allProducts[Product2].name;
  allProducts[Product1].views++;
  allProducts[Product2].views++;
}

function handleProductClick(event) {
  if (event.target === productContainer) {
    alert("Please click on an image");
  } else {
    clicks++;
    // console.log(clicks);
    let clickedProduct = event.target.alt;
    for (let i = 0; i < allProducts.length; i++) {
      if (clickedProduct === allProducts[i].name) {
        allProducts[i].clicks++;
        break;
      }
    }
    if (clicks === maxClicksAllowed) {
      productContainer.removeEventListener("click", handleProductClick);
      productContainer.className = "no-voting";
      resultsButton.addEventListener("click", renderResults);
      resultsButton.className = "clicks-allowed";
    } else {
      renderProducts();
    }
  }
}

function renderResults() {
  // console.log("Your results are in!");
  let ul = document.querySelector("ul");
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

const cruising = new Product("", "assets/images/.jpg");
const float = new Product("", "assets/images/.jpg");
const hand = new Product("", "assets/images/.jpg");
const kissing = new Product("", "assets/images/.jpg");
const sassy = new Product("", "assets/images/.jpg");
const smiling = new Product("", "assets/images/.jpg");
const sweater = new Product("", "assets/images/.jpg");
const away = new Product("", "assets/images/.jpg");

renderProducts();

productContainer.addEventListener("click", handleProductClick);


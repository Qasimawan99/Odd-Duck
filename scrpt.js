"use strict";
console.log("you chose the Product!");

// global varaibles
// querySelector returns the first element in the document that matches
const ProductContainer = document.querySelector("section");
const resultsButton = document.querySelector("section + div");
const image1 = document.querySelector("section img:first-child");
const image2 = document.querySelector("section img:nth-child(2)");
const image3 = document.querySelector("section img:nth-child(3)");

let clicks = 0;
const maxClicksAllowed = 25;

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
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();


  // how could we prevent product1 being the same number a product2?
  while (product1 === product2 || product1 === product3 || product2 === product3) {
    product1 = getRandomNumber();
    product2 = getRandomNumber();
    product3 = getRandomNumber();
  }

  // now we have two random numbers lets set the attributes of our images in the document.
  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image3.src = allProducts[product3].src;
  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;
  allProducts[product1].views++;
  allProducts[product2].views++;
  allProducts[product3].views++;
}

function handleProductClick(event) {
  if (event.target === ProductContainer) {
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
      ProductContainer.removeEventListener("click", handleProductClick);
      ProductContainer.className = "no-voting";
      resultsButton.addEventListener("click", renderResults);
      resultsButton.className = "clicks-allowed";
    } else {
      renderProducts();
    }
  }
}

function renderResults() {
  // console.log("The results are ready!");
  let ul = document.querySelector("ul");
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

//const bag = new Product("bag", "images/bag.jpg");
//const banana = new Product("banana", "images/banana.jpg");
//const bathroom = new Product("bathroom", "images/bathroom.jpg");
//const boots = new Product("boots", "images/boots.jpg");
//const breakfast = new Product("breakfast", "images/breakfast.jpg");
//const bubblegum = new Product("bubblegum", "images/bubblegum.jpg");
//const chair = new Product("chair", "images/chair.jpg");
//const cthulhu = new Product("cthulhu", "images/cthulhu.jpg");
//const dog = new Product("dog-duck", "images/dog-duck.jpg");
//const dragon = new Product("dragon", "images/dragon.jpg");
//const pen = new Product("pen", "images/pen.jpg");
//const pet = new Product("pet-sweep", "images/pet-sweep.jpg");
//const scissors = new Product("scissors", "images/scissors.jpg");
//const shark = new Product("shark", "images/shark.jpg");
//const sweep = new Product("sweep", "images/sweep.png");
//const tauntaun = new Product("tauntaun", "images/tauntaun.jpg");
//const unicorn = new Product("unicorn", "images/unicorn.jpg");
//const water = new Product("water-can", "images/water-can.jpg");
//const wine = new Product("wine-glass", "images/wine-glass.jpg");

//renderProducts();

ProductContainer.addEventListener("click", handleProductClick);

function renderChart() {
  const productNames = [];
  const productViews = [];
  const productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }

  // console.log(productNames);
  // console.log(productViews);
  // console.log(productClicks);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: "clicks",
        data: productClicks,
        backgroundColor: ["#42032C"],
        borderColor: ["#D36B00"],
        borderWidth: 1,
      },
      {
        label: "views",
        data: productViews,
        backgroundColor: ["#D36B00"],
        borderColor: ["#42032C"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
  };

  const productChart = document.getElementById("chart");
  const myChart = new Chart(productChart, config);
  setLocalStorage();
}

function setLocalStorage() {
  localStorage.setItem("products", JSON.stringify(allProducts));
}

function checkLocalStorage() {
  const localProducts = JSON.parse(localStorage.getItem("products"));
  // console.log(localProducts);
  if (localProducts) {
    allProducts = localProducts;
  } else {
    const bag = new Product("bag", "images/bag.jpg");
const banana = new Product("banana", "images/banana.jpg");
const bathroom = new Product("bathroom", "images/bathroom.jpg");
const boots = new Product("boots", "images/boots.jpg");
const breakfast = new Product("breakfast", "images/breakfast.jpg");
const bubblegum = new Product("bubblegum", "images/bubblegum.jpg");
const chair = new Product("chair", "images/chair.jpg");
const cthulhu = new Product("cthulhu", "images/cthulhu.jpg");
const dog = new Product("dog-duck", "images/dog-duck.jpg");
const dragon = new Product("dragon", "images/dragon.jpg");
const pen = new Product("pen", "images/pen.jpg");
const pet = new Product("pet-sweep", "images/pet-sweep.jpg");
const scissors = new Product("scissors", "images/scissors.jpg");
const shark = new Product("shark", "images/shark.jpg");
const sweep = new Product("sweep", "images/sweep.png");
const tauntaun = new Product("tauntaun", "images/tauntaun.jpg");
const unicorn = new Product("unicorn", "images/unicorn.jpg");
const water = new Product("water-can", "images/water-can.jpg");
const wine = new Product("wine-glass", "images/wine-glass.jpg");
  }
}


checkLocalStorage();
renderProducts();
// create the setLocalStorage function and invoke at the bottom of renderChart()
// create the checklocalStorage()
// comment out the new instances and place in the else part of if statement
// invoke the checkLocalStorage()
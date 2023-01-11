// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];

// Crear algoritmo que genere desde Javascript los elementos HTML necesarios para mostrar una lista de productos con su descripción, precio unitario y un input de unidades para cada uno.

var productList = document.getElementById("product-list");

var createName = product => {
  var productName = document.createElement("p");
  productName.setAttribute("class", "name")
  productName.textContent = product.description + " - ";
  productList.appendChild(productName);
}

var createPrice = product => {
  var productPrice = document.createElement("p");
  productPrice.setAttribute("class", "price")
  productPrice.textContent = " " + product.price + " €/ud";
  productList.appendChild(productPrice);
}

var createInputUnits = product => {
  var productUnits = document.createElement("input");
  productUnits.setAttribute("type", "number");
  productUnits.setAttribute("min", 0);
  productUnits.setAttribute("max", product.stock);
  productUnits.addEventListener("change", (event) => product.units = event.target.valueAsNumber);
  productList.appendChild(productUnits)
}

var showProducts = products => {

  for (var product of products) {
    createName(product);
    createPrice(product);
    createInputUnits(product);
  };
  
};

showProducts(products);



// Calcular subtotal, impuestos y total al pulsar el botón calcular

var calculateSubtotal = products => {
  var subtotal = 0;
  for (var product of products) {
    subtotal += product.price * product.units;
  }
  return subtotal;
};

console.log(calculateSubtotal(products))

var calculateTax = products => {
  var tax = 0;
  for (var product of products) {
    if (product.tax === LOWER_TYPE) {
      tax += product.price * product.units * 0.04;
    } else if (product.tax === REGULAR_TYPE) {
      tax += product.price * product.units * 0.21;
    }
  }
  console.log(tax)
  return tax;
};

var calculateTotal = products => {
  return calculateSubtotal(products) + calculateTax(products);
};

var printTotal = (products) => {
  document.getElementById("total").innerText = calculateTotal(products);
  document.getElementById("tax").innerText = calculateTax(products);
  document.getElementById("subtotal").innerText = calculateSubtotal(products);

};


// Eventos
document.getElementById("calculate").addEventListener("click", () => printTotal(products));
var products = [  {name: "Product 1", skinType: ["normal", "oily"], ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"]},
  {name: "Product 2", skinType: "oily", ingredients: ["Ingredient 2", "Ingredient 4", "Ingredient 5"]},
  {name: "Product 3", skinType: "dry", ingredients: ["Ingredient 1", "Ingredient 3", "Ingredient 6"]},
  {name: "Product 4", skinType: "combination", ingredients: ["Ingredient 4", "Ingredient 5", "Ingredient 6"]},
];

var productCheckboxes = [];

function displayProducts(products) {
  var productList = document.getElementById("productList");
  var checkboxes = productList.getElementsByTagName("input");

  // Create a map of the current checkbox state
  var checkboxState = {};
  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    checkboxState[checkbox.value] = checkbox.checked;
  }

  productList.innerHTML = "";
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "productCheckbox";
    checkbox.value = product.name;

    // Restore the previous checkbox state, if applicable
    if (checkboxState[product.name]) {
      checkbox.checked = true;
    }

    checkbox.addEventListener("click", enableAddButton);
    var label = document.createElement("label");
    label.innerHTML = product.name + " (" + product.skinType + ")";
    li.appendChild(checkbox);
    li.appendChild(label);
    productList.appendChild(li);
  }
}


function searchProducts() {
  var searchBar = document.getElementById("searchBar");
  var searchTerm = searchBar.value.toLowerCase();
  var filteredProducts = products.filter(function(product) {
    return product.name.toLowerCase().includes(searchTerm);
  });
  displayProducts(filteredProducts);
  disableAddButton();
}

function enableAddButton() {
  var addButton = document.getElementById("addButton");
  addButton.disabled = false;
}

function disableAddButton() {
  var addButton = document.getElementById("addButton");
  addButton.disabled = true;
}

function saveCheckboxState() {
  var productList = document.getElementById("productList");
  var checkboxes = productList.getElementsByTagName("input");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      var productName = checkboxes[i].value;
      if (!productCheckboxes.includes(productName)) {
        productCheckboxes.push(productName);
      }
    } else {
      var productName = checkboxes[i].value;
      var index = productCheckboxes.indexOf(productName);
      if (index > -1) {
        productCheckboxes.splice(index, 1);
      }
    }
  }
}

function goToConflictCheckPage() {
  saveCheckboxState();
  var selectedProducts = [];
  var productList = document.getElementById("productList");
  var checkboxes = productList.getElementsByTagName("input");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      var productName = checkboxes[i].value;
      var selectedProduct = products.find(function(product) {
        return product.name == productName;
      });
      selectedProducts.push(selectedProduct);
    }
  }
  if (selectedProducts.length == 0) {
    alert("Please select at least one product.");
  } else {
    sessionStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    window.location.href = "conflictCheckPage.html";
  }
}

displayProducts(products);

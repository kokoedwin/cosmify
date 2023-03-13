var products = [
  {name: "Product 1", skinType: "normal", ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"]},
  {name: "Product 2", skinType: "oily", ingredients: ["Ingredient 2", "Ingredient 4", "Ingredient 5"]},
  {name: "Product 3", skinType: "dry", ingredients: ["Ingredient 1", "Ingredient 3", "Ingredient 6"]},
  {name: "Product 4", skinType: "combination", ingredients: ["Ingredient 4", "Ingredient 5", "Ingredient 6"]},
];

function displayProducts(products) {
  var productList = document.getElementById("productList");
  productList.innerHTML = "";
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var li = document.createElement("li");
    li.innerHTML = product.name + " (" + product.skinType + ")";
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
}

function goToConflictCheckPage() {
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

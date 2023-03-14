function displaySelectedProducts() {
  var productList = document.getElementById("productList");
  productList.innerHTML = "";
  var selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts"));
  for (var i = 0; i < selectedProducts.length; i++) {
    var product = selectedProducts[i];
    var li = document.createElement("li");
    li.innerHTML = product.name + " (" + product.skinType + ")";
    productList.appendChild(li);
  }
}

function checkForConflicts() {
  var selectedProducts = JSON.parse(sessionStorage.getItem("selectedProducts"));
  var ingredientSet = new Set();
  for (var i = 0; i < selectedProducts.length; i++) {
    var product = selectedProducts[i];
    for (var j = 0; j < product.ingredients.length; j++) {
      var ingredient = product.ingredients[j];
      if (ingredientSet.has(ingredient)) {
        document.getElementById("conflictResult").innerHTML = "There is a conflict between the selected products.";
        return;
      }
      ingredientSet.add(ingredient);
    }
  }
  document.getElementById("conflictResult").innerHTML = "There are no conflicts between the selected products.";
}

function goToSelectionPage() {
  sessionStorage.removeItem("selectedProducts");
  window.location.href = "productSelectionPage.html";
}

displaySelectedProducts();

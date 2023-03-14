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
  var ingredientMap = new Map();
  for (var i = 0; i < selectedProducts.length; i++) {
    var product = selectedProducts[i];
    for (var j = 0; j < product.ingredients.length; j++) {
      var ingredient = product.ingredients[j];
      if (ingredientMap.has(ingredient)) {
        var conflictingProduct = ingredientMap.get(ingredient);
        var conflictMsg = "There is a conflict between " + product.name + " and " + conflictingProduct.name + " due to ingredient: " + ingredient + ".";
        document.getElementById("conflictResult").innerHTML = conflictMsg;
        return;
      }
      ingredientMap.set(ingredient, product);
    }
  }
  document.getElementById("conflictResult").innerHTML = "There are no conflicts between the selected products.";
}


function goToSelectionPage() {
  sessionStorage.removeItem("selectedProducts");
  window.location.href = "productSelectionPage.html";
}

displaySelectedProducts();

var conflictMap = {
  "Ingredient1": new Set(["Ingredient2", "Ingredient3"]),
  "Ingredient2": new Set(["Ingredient1", "Ingredient4"]),
  "Ingredient3": new Set(["Ingredient1"]),
  "Ingredient4": new Set(["Ingredient2"])
};


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
  var conflictingIngredientsMap = new Map();
  for (var i = 0; i < selectedProducts.length; i++) {
    var product = selectedProducts[i];
    for (var j = 0; j < product.ingredients.length; j++) {
      var ingredient = product.ingredients[j];
      if (ingredientMap.has(ingredient)) {
        var conflictingProduct = ingredientMap.get(ingredient);
        var conflictingIngredients = conflictingIngredientsMap.get(conflictingProduct) || new Set();
        conflictingIngredients.add(ingredient);
        conflictingIngredientsMap.set(conflictingProduct, conflictingIngredients);
        var conflictMsg = "There is a conflict between " + product.name + " and " + conflictingProduct.name + " due to ingredients: " + Array.from(conflictingIngredients).join(", ") + ".";
        document.getElementById("conflictResult").innerHTML = conflictMsg;
        return;
      }
      ingredientMap.set(ingredient, product);
      var conflictingIngredients = conflictMap[ingredient] || new Set();
      for (var conflictingIngredient of conflictingIngredients) {
        if (ingredientMap.has(conflictingIngredient)) {
          var conflictingProduct = ingredientMap.get(conflictingIngredient);
          var conflictingIngredients = conflictingIngredientsMap.get(conflictingProduct) || new Set();
          conflictingIngredients.add(ingredient);
          conflictingIngredientsMap.set(conflictingProduct, conflictingIngredients);
          var conflictMsg = "There is a conflict between " + product.name + " and " + conflictingProduct.name + " due to ingredients: " + Array.from(conflictingIngredients).join(", ") + ".";
          document.getElementById("conflictResult").innerHTML = conflictMsg;
          return;
        }
      }
    }
    conflictingIngredientsMap.set(product, new Set());
  }
  document.getElementById("conflictResult").innerHTML = "There are no conflicts between the selected products.";
}


function goToSelectionPage() {
  sessionStorage.removeItem("selectedProducts");
  window.location.href = "productSelectionPage.html";
}

displaySelectedProducts();

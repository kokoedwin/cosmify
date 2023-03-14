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
  var conflicts = new Set();
  for (var i = 0; i < selectedProducts.length; i++) {
    var product = selectedProducts[i];
    for (var j = 0; j < product.ingredients.length; j++) {
      var ingredient = product.ingredients[j];
      if (ingredientMap.has(ingredient)) {
        var conflictingProduct = ingredientMap.get(ingredient);
        var conflict = [product.name, conflictingProduct.name, ingredient].sort();
        var conflictKey = conflict.join("_");
        if (!conflicts.has(conflictKey)) {
          conflicts.add(conflictKey);
        }
      }
      ingredientMap.set(ingredient, product);
      var conflictingIngredients = conflictMap[ingredient] || new Set();
      for (var conflictingIngredient of conflictingIngredients) {
        if (ingredientMap.has(conflictingIngredient)) {
          var conflictingProduct = ingredientMap.get(conflictingIngredient);
          var conflict = [product.name, conflictingProduct.name, conflictingIngredient].sort();
          var conflictKey = conflict.join("_");
          if (!conflicts.has(conflictKey)) {
            conflicts.add(conflictKey);
          }
        }
      }
    }
  }
  if (conflicts.size > 0) {
    var conflictMsg = "The following conflicts have been detected between selected products:";
    conflicts.forEach(function(conflictKey) {
      var conflict = conflictKey.split("_");
      conflictMsg += "\n- " + conflict[0] + " and " + conflict[1] + " due to ingredient: " + conflict[2];
    });
    document.getElementById("conflictResult").innerHTML = conflictMsg;
  } else {
    document.getElementById("conflictResult").innerHTML = "There are no conflicts between the selected products.";
  }
}



function goToSelectionPage() {
  sessionStorage.removeItem("selectedProducts");
  window.location.href = "productSelectionPage.html";
}

displaySelectedProducts();

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
  var conflicts = [];
  for (var i = 0; i < selectedProducts.length; i++) {
    var product = selectedProducts[i];
    for (var j = 0; j < product.ingredients.length; j++) {
      var ingredient = product.ingredients[j];
      if (ingredientMap.has(ingredient)) {
        var conflictingProduct = ingredientMap.get(ingredient);
        var conflict = {
          product1: product,
          product2: conflictingProduct,
          ingredients: [ingredient]
        };
        if (!conflicts.some(function(existingConflict) {
          return existingConflict.product1 === conflict.product1 &&
            existingConflict.product2 === conflict.product2;
        })) {
          conflicts.push(conflict);
        } else {
          var existingConflict = conflicts.find(function(existingConflict) {
            return existingConflict.product1 === conflict.product1 &&
              existingConflict.product2 === conflict.product2;
          });
          if (existingConflict.ingredients.indexOf(ingredient) === -1) {
            existingConflict.ingredients.push(ingredient);
          }
        }
      }
      ingredientMap.set(ingredient, product);
      var conflictingIngredients = conflictMap[ingredient] || new Set();
      for (var conflictingIngredient of conflictingIngredients) {
        if (ingredientMap.has(conflictingIngredient)) {
          var conflictingProduct = ingredientMap.get(conflictingIngredient);
          var conflict = {
            product1: product,
            product2: conflictingProduct,
            ingredients: [conflictingIngredient, ingredient]
          };
          if (!conflicts.some(function(existingConflict) {
            return existingConflict.product1 === conflict.product1 &&
              existingConflict.product2 === conflict.product2;
          })) {
            conflicts.push(conflict);
          } else {
            var existingConflict = conflicts.find(function(existingConflict) {
              return existingConflict.product1 === conflict.product1 &&
                existingConflict.product2 === conflict.product2;
            });
            if (existingConflict.ingredients.indexOf(conflictingIngredient) === -1) {
              existingConflict.ingredients.push(conflictingIngredient);
            }
            if (existingConflict.ingredients.indexOf(ingredient) === -1) {
              existingConflict.ingredients.push(ingredient);
            }
          }
        }
      }
    }
  }
  if (conflicts.length > 0) {
    var conflictMsg = "The following conflicts have been detected between selected products:";
    for (var i = 0; i < conflicts.length; i++) {
      var conflict = conflicts[i];
      conflictMsg += "\n- " + conflict.product1.name + " and " + conflict.product2.name + " due to ingredient(s): " + conflict.ingredients.join(", ");
      for (var j = 0; j < conflict.ingredients.length; j++) {
        var ingredient = conflict.ingredients[j];
        var conflictingIngredients = conflictMap[ingredient] || new Set();
        for (var conflictingIngredient of conflictingIngredients) {
          if (conflict.ingredients.indexOf(conflictingIngredient) === -1 &&
              conflict.product2.ingredients.includes(conflictingIngredient)) {
            conflictMsg += " and " + conflictingIngredient;
          }
        }
      }
    }
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

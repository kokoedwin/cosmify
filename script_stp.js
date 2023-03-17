function goToProductSelectionPage() {
  var skinTypeForm = document.getElementById("skinTypeForm");
  var skinType = "";
  for (var i = 0; i < skinTypeForm.skinType.length; i++) {
    if (skinTypeForm.skinType[i].checked) {
      skinType = skinTypeForm.skinType[i].value;
      break;
    }
  }
  if (skinType == "") {
    alert("Please select a skin type.");
  } else {
    sessionStorage.setItem("skinType", skinType);
    window.location.href = "productSelectionPage.html";
  }
}


// Skin type selection page JavaScript

// Define global variables for the selected skin type and skin type options
let selectedSkinType = "";
const skinTypeOptions = document.querySelectorAll(".skin-type-option");

// Function to select a skin type option
function selectSkinType(skinType) {
  // Deselect any previously selected option
  skinTypeOptions.forEach(option => {
    option.classList.remove("selected");
  });

  // Select the clicked option and save the skin type value
  const selectedOption = document.getElementById(skinType);
  selectedOption.classList.add("selected");
  selectedSkinType = skinType;

  // Enable the Continue button
  const continueButton = document.getElementById("continueButton");
  continueButton.disabled = false;
}

// Function to navigate to the product selection page
function goToProductSelectionPage() {
  // Check if a skin type option has been selected
  if (selectedSkinType) {
    // Redirect to the product selection page with the selected skin type value in the URL
    //window.location.href = "productselection.html?skintype=" + selectedSkinType;
    window.location.href = "productSelectionPage.html"
  } else {
    // Display an error message if no skin type option has been selected
    alert("Please select a skin type option before continuing.");
  }
}

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

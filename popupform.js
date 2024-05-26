var popupicon = document.getElementById("popupicon");
if (popupicon) {
  popupicon.addEventListener("click", function (e) {
    var popup = e.currentTarget.parentNode;
    function isOverlay(node) {
      return !!(
        node &&
        node.classList &&
        node.classList.contains("popup-overlay")
      );
    }
    while (popup && !isOverlay(popup)) {
      popup = popup.parentNode;
    }
    if (isOverlay(popup)) {
      popup.style.display = "none";
    }
  });
}

var scrollAnimElements = document.querySelectorAll("[data-animate-on-scroll]");
var observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        const targetElement = entry.target;
        targetElement.classList.add("animate");
        observer.unobserve(targetElement);
      }
    }
  },
  {
    threshold: 0.15,
  }
);

var inputFields = document.querySelectorAll("input[type=text], input[type=number], input[type=email]");

// Add an input event listener to each input field
inputFields.forEach(function (inputField) {
  inputField.addEventListener("input", function () {
    removeError(inputField);
  });
});

var jobRoleField = document.querySelector(".job-roleposition-field1");
jobRoleField.addEventListener("change", function () {
  removeError(jobRoleField);
});

var submitbtn = document.querySelector(".submit1");
submitbtn.addEventListener("click", function () {
  // Reset error messages
  var errorMessages = document.querySelectorAll(".error-message");
  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].remove();
  }

  // Validate Name field
var nameField = document.querySelector(".name-field3");
var namePattern = /^[A-Za-z\s'-]+$/;

if (!namePattern.test(nameField.value.trim())) {
  displayError(nameField, "Valid name is required");
}

// var nameField = document.querySelector(".name-field3");
// var nameValue = nameField.value.trim();

// if (nameValue === "") {
//   displayError(nameField, "Name is required");
// } else {
//   // Regular expression for basic email validation
//   var namePattern = /^[A-Za-z\s'-]+$/;

//   if (!namePattern.test(nameValue)) {
//     displayError(nameField, "Invalid Name");
//   }
// }

// Wait for the DOM to be fully loaded before running this code
document.addEventListener("DOMContentLoaded", function() {
    var nameField = document.querySelector(".name-field3");
    var namePattern = /^[A-Za-z\s'-]+$/;
  
    if (!nameField) {
      console.error("Element with class 'name-field3' not found.");
      return; // Exit if the element is not found
    }
  
    // Trim whitespace from the input value and test it against the pattern
    if (!namePattern.test(nameField.value.trim())) {
      displayError(nameField, "Valid name is required");
    }
  });
  

  // Validate Job Role/Position field
  if (jobRoleField.value === "") {
    displayError(jobRoleField, "Job Role/Position is required");
  }

  // Validate Mobile Number field
  var mobileField = document.querySelector(".mobile-number-field3");
  var mobileNumber = mobileField.value.trim();

  if (mobileNumber === "") {
    displayError(mobileField, "Mobile Number is required");
  } else if (mobileNumber.length < 10) {
    displayError(mobileField, "Mobile Number should be at least 10 digits");
  }

  // Validate Email field
  var emailField = document.querySelector(".mobile-number-field3[type=email]");
  var emailValue = emailField.value.trim();

  if (emailValue === "") {
    displayError(emailField, "Email Address is required");
  } else {
    // Regular expression for basic email validation
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(emailValue)) {
      displayError(emailField, "Invalid Email Address");
    }
  }

//   var fileInput = document.querySelector("#file-input");
//   if (!fileInput.files.length) {
//     displayError(fileInput, "Upload CV/Resume is required");
//   }


var fileInputContainer = document.querySelector(".upload-cv-resumer-button-container");
var fileInput = document.querySelector("#file-input");
if (!fileInput.files[0]) {
  displayError(fileInputContainer, "Upload CV/Resume is required");
} else {
  removeError(fileInputContainer); // Remove the error if a file is selected
}

  
  
  // Check if there are any error messages
  if (document.querySelectorAll(".error-message").length === 0) {
    // Submit the form if there are no errors
    postFormDetails();
    // alert("Form submitted successfully!")
        var popup = document.getElementById("formSubmissionSuccessMessag");
        if (!popup) return;
        var popupStyle = popup.style;
        if (popupStyle) {
          popupStyle.display = "flex";
          popupStyle.zIndex = 100;
          popupStyle.backgroundColor = "rgba(41, 41, 41, 0.7)";
          popupStyle.alignItems = "center";
          popupStyle.justifyContent = "center";
        }
        popup.setAttribute("closable", "");
        
        var onClick =
          popup.onClick ||
          function (e) {
            if (e.target === popup && popup.hasAttribute("closable")) {
              popupStyle.display = "none";
            }
          };
        popup.addEventListener("click", onClick);

        // Automatically hide the popup after 3 seconds (3000 milliseconds)
        setTimeout(function () {
          popupStyle.display = "none";
        }, 3000);
      }
});

// Function to display error messages
function displayError(inputField, errorMessage) {
  var errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerText = errorMessage;
  inputField.parentNode.appendChild(errorDiv);
}

function removeError(inputField) {
  var errorMessage = inputField.parentNode.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function showFileInput() {
    const fileInput = document.getElementById("file-input");
    fileInput.style.display = "none";
    // Trigger a click event on the file input to open the file dialog
    fileInput.click();
}

function handleFileUpload(event) {
    // alert("hii")
    const fileInput = event.target;
    const selectedFile = fileInput.files[0];
    let fileInputContainer = document.querySelector(".upload-cv-resumer-button-container");
    removeError(fileInputContainer);
    
    if (selectedFile) {       
        // Check if the file size is greater than 2MB (in bytes)
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
        if (selectedFile.size > maxSizeInBytes) {
            alert("File size exceeds 2MB. Please select a smaller file.");
            // Clear the file input
            fileInput.value = "";
            return; // Do not proceed with further actions
        }

        // Display the selected file name
        const selectedFileNameElement = document.getElementById("selected-file-name");
        selectedFileNameElement.innerText = `Selected File: ${selectedFile.name}`;
        selectedFileNameElement.style.display = "block";

        // You can access the selected file here and perform other actions as needed.
        console.log('Selected File:', selectedFile.name);
    }

    // Hide the file input again
    fileInput.style.display = "none";
}

$(document).ready(function () {
    $('.submit1').submit(function (e) {
        e.preventDefault();
       
    });
});


function resetFormFields() {
    var inputFields = document.querySelectorAll("input[type=text], input[type=number], input[type=email], input[type=file] , select");
    inputFields.forEach(function (inputField) {
      inputField.value = ""; // Reset the field value
    });  

     document.getElementById("selected-file-name").innerText='';  
  }
  

function postFormDetails(){
    var formData = new FormData();

    // Get the selected file
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];

    if (!file) {
        // alert('Please select a file to upload.');
        return;
    }

    let currentTime = new Date();
    let time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
    $("#postedTime").val(currentTime+time);    
    // Read the file as a data URL and encode it as base64
    var reader = new FileReader();
    reader.onload = function () {
        var base64Data = btoa(reader.result);
        formData.append('fileData', base64Data);
        formData.append('contentType', file.type);
        formData.append('fileName', file.name);

        // Add additional fields to FormData
        formData.append('name', $('#name').val());
        formData.append('jobRole', $('#jobRole').val());
        formData.append('email', $('#email').val());
        formData.append('mobile', $('#mobile').val());

        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbzBV0dw4qWkwo0qkbBtGMMgZGSJtwsj9o4Fea9QTUxZuO7w8kDsohBlfhd0ifil2wtaLw/exec',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                // alert('File uploaded successfully to Google Drive.');
                resetFormFields();
            },
            error: function () {
                alert('An error occurred while uploading the file.');
            },
        });
    };
    reader.readAsBinaryString(file);
}

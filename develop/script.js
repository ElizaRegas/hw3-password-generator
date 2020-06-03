// variables
var generateBtn = document.querySelector("#generate");
var acceptedPasswordLength = [];

// Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");

//   passwordText.value = password;

// }

// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
  // WHEN I click the button to generate a password
  // THEN I am presented with a series of prompts for password criteria
  var requestedPasswordLength = prompt(
    "How many characters would you like your password to be?"
  );
  // making sure the input value is a number
  var numberCheck = isNaN(requestedPasswordLength);
  if (numberCheck === false) {
    acceptedPasswordLength.push(requestedPasswordLength);
    console.log(acceptedPasswordLength);
  } else {
    alert("Not a valid input. Please try again.");
    console.log("nope");
  }
  // WHEN prompted for the length of the password
  // THEN I choose a length of at least 8 characters and no more than 128 characters
  if (requestedPasswordLength > 129 || requestedPasswordLength < 8) {
    alert("Passwords must be between 8 and 128 characters. Please try again");
    console.log("try again");
  }

  var finalPasswordLength = acceptedPasswordLength.pop();

  if (finalPasswordLength < 129 && finalPasswordLength > 7) {
    console.log("running gatherInfo");
    gatherInfo();
  }
  function gatherInfo() {
    // WHEN prompted for password criteria
    // THEN I select which criteria to include in the password
    // WHEN prompted for character types to include in the password
    // THEN I choose lowercase, uppercase, numeric, and/or special characters

    // prompt information
    var capitalLetters = confirm("Do you want to include capital letters?");

    if (capitalLetters) {
      alert("Capital letters will be included!");
    } else {
      alert("No capital letters for you!");
    }

    var lowerCaseLetters = confirm("Do you want to include lower case letters?");

    if (lowerCaseLetters) {
    }

    var numbers = confirm("Do you want to include numbers?");

    if (numbers) {
    }

    var specialCharacters = confirm(
      "Do you want to include special characters?"
    );

    if (specialCharacters) {
    }
  }
}

// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected

// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria

// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

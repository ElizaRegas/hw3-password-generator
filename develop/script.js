// variables
var generateBtn = document.querySelector("#generate");
var acceptedPasswordLength = "";
var selectedCapitalLetters = [];
var selectedLowerCaseLetters = [];
var selectedNumbers = [];
var selectedSpecialCharacters = [];
var concatArray = [];
var semiFinalPassword = [];

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
    acceptedPasswordLength = requestedPasswordLength;
  } else {
    alert("Not a valid input. Please try again.");
  }
  // WHEN prompted for the length of the password
  // THEN I choose a length of at least 8 characters and no more than 128 characters
  if (acceptedPasswordLength > 129 || acceptedPasswordLength < 8) {
    alert("Passwords must be between 8 and 128 characters. Please try again");
  } else {
    gatherInfo();
  }

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
    selectedCapitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    console.log(selectedCapitalLetters);
  } else {
    alert("No capital letters for you!");
  }

  var lowerCaseLetters = confirm("Do you want to include lower case letters?");
  if (lowerCaseLetters) {
    alert("Lower case letters coming right up!");
    selectedLowerCaseLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    console.log(selectedLowerCaseLetters);
  } else {
    alert("Lower case letters just aren't your thing, huh?!");
  }

  var numbers = confirm("Do you want to include numbers?");
  if (numbers) {
    alert("You can count on it!");
    selectedNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    console.log(selectedNumbers);
  } else {
    alert("All of the cool kids are doing it, but whatever...");
  }

  var specialCharacters = confirm("Do you want to include special characters?");
  if (specialCharacters) {
    alert("You're special, just like your characters!");
    selectedSpecialCharacters =  ["!", "#", "$", "%", "&", "'", "(", ")", "*", 
    "+", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "\", ^", "_", "`", 
    "{", "|", "}", "~"];
    console.log(selectedSpecialCharacters);
  } else {
    alert("Boooooorrrriiiiinnnnnggg!");
  }
  combineArrays();
}

// make an array of selected arrays
function combineArrays() {
  // const new_array = old_array.concat([value1[, value2[, ...[, valueN]]]])
  concatArray = concatArray.concat(selectedSpecialCharacters, selectedNumbers,
    selectedLowerCaseLetters, selectedCapitalLetters)
    randomCharacters();
}
// randomly choose the amount of characters from array
function randomCharacters() {
  var passwordLengthNumber = parseInt(acceptedPasswordLength)
  for (i = 0; i < passwordLengthNumber; i++) {
    var randomIndex = getRandomInt(0, concatArray.length);
    var randomValue = concatArray[randomIndex];
    semiFinalPassword.push(randomValue);
  }
  console.log(semiFinalPassword);
  arrayValidation();
}

// MDN formula for getting a random integer between 2 values
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// check password to make sure all arrays are represented
function arrayValidation() {
  // check to see if the 4 arrays are empty
  var isLengthGreaterThanZero = selectedCapitalLetters.length > 0;
    // if not empty, check to make sure semiFinalPassword contains at least 1 value
    if (isLengthGreaterThanZero) {
      for (i = 0; i <selectedCapitalLetters.length; i++) {
        var capitalLetter = selectedCapitalLetters[i];
        var isStatementTrue = semiFinalPassword.includes(capitalLetter);
        if (isStatementTrue) {
          console.log("passed");
          break;
        }
      }
    }
      // if it doesn't contain a value, generate a new semiFinalPassword
}

// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected

// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria

// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
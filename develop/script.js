// variables
var generateBtn = document.querySelector("#generate");
var acceptedPasswordLength = "";
var selectedCapitalLetters = [];
var selectedLowerCaseLetters = [];
var selectedNumbers = [];
var selectedSpecialCharacters = [];
var concatArray = [];
var semiFinalPassword = [];

// Add event listener to begin the process of generating a password
generateBtn.addEventListener("click", resetApplication);

function generatePassword() {
  // prompt to ask the user how long their password should be
  var requestedPasswordLength = prompt(
    "How many characters would you like your password to be?"
  );
  // making sure the input value is a number
  var numberCheck = isNaN(requestedPasswordLength);
  // if the user input is NOT NOT a number, then accept the user input
  if (numberCheck === false) {
    acceptedPasswordLength = requestedPasswordLength;
  } else {
    alert("Not a valid input. Please enter a number between 8 and 128.");
    resetApplication();
  }

  // check to make sure the password length is between 8 and 128
  if (acceptedPasswordLength > 129 || acceptedPasswordLength < 8) {
    alert("Passwords must be between 8 and 128 characters. Please try again");
    resetApplication();
  } else {
    gatherInfo();
  }
}

function gatherInfo() {
  // prompt for capital letters
  var capitalLetters = confirm("Do you want to include capital letters?");
  if (capitalLetters) {
    alert("Capital letters will be included!");
    selectedCapitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  } else {
    alert("No capital letters for you!");
  }
  console.log(selectedCapitalLetters);

  // prompt for lower case letters
  var lowerCaseLetters = confirm("Do you want to include lower case letters?");
  if (lowerCaseLetters) {
    alert("Lower case letters coming right up!");
    selectedLowerCaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  } else {
    alert("Lower case letters just aren't your thing, huh?!");
  }
  console.log(selectedLowerCaseLetters);

  // prompt for numbers
  var numbers = confirm("Do you want to include numbers?");
  if (numbers) {
    alert("You can count on it!");
    selectedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  } else {
    alert("All of the cool kids are doing it, but whatever...");
  }
  console.log(selectedNumbers);

  // prompt for special characters
  var specialCharacters = confirm("Do you want to include special characters?");
  if (specialCharacters) {
    alert("You're special, just like your characters!");
    selectedSpecialCharacters =  ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "\", ^", "_", "`", "{", "|", "}", "~"];
  } else {
    alert("Boooooorrrriiiiinnnnnggg!");
  }
  console.log(selectedSpecialCharacters);
  combineArrays();
}

// make an array of selected types of characters
function combineArrays() {
  concatArray = concatArray.concat(selectedSpecialCharacters, selectedNumbers,
    selectedLowerCaseLetters, selectedCapitalLetters)
    randomCharacters();
}

// randomly choose the amount of characters from array
function randomCharacters() {
  // password length met all criteria- now convert it from a string into a number
  var passwordLengthNumber = parseInt(acceptedPasswordLength)
  for (i = 0; i < passwordLengthNumber; i++) {
    // generate a random index number for the stored password character possibilities
    var randomIndex = getRandomInt(0, concatArray.length);
    // locate that random index number in our concatArray
    var randomValue = concatArray[randomIndex];
    // push the value to our temporary holding array that still needs to be tested
    semiFinalPassword.push(randomValue);
  }
  
  var testResults = masterValidation();
  console.log(testResults);
  if (testResults === true) {
    var finalPassword = semiFinalPassword.join('');
    writePassword(finalPassword);
  } else {
    semiFinalPassword = [];
    console.log(semiFinalPassword);
    randomCharacters();
  }
}

// MDN formula for getting a random integer between 2 values
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// check password to make sure all arrays are represented
function arrayValidation(arrayToCheckout) {
  // check to see if the 4 arrays are empty
  var testResult = false;
    // if not empty, check to make sure semiFinalPassword contains at least 1 value
    // if (isLengthGreaterThanZero) {
      for (i = 0; i <arrayToCheckout.length; i++) {
        var character = arrayToCheckout[i];
        if (semiFinalPassword.includes(character)) {
          console.log("passed");
          testResult = true;
          break;
        } 
      }
      return testResult;
    // }
      // if it doesn't contain a value, generate a new semiFinalPassword
}

function isLengthGreaterThanZero (arrayToCheckout) {
  return arrayToCheckout.length > 0; // will return a boolean
}
// checking to see if the temporary password array contains at least 1 of all requested types
function masterValidation() {
  var allTestsPassed = true;

  if (isLengthGreaterThanZero(selectedCapitalLetters)) {
    var capitalLetterTest = arrayValidation(selectedCapitalLetters);
    console.log(capitalLetterTest);
    if (capitalLetterTest === false) {
      allTestsPassed = false;
    }
  }
  if (isLengthGreaterThanZero(selectedLowerCaseLetters)) {
    var lowerCaseLetterTest = arrayValidation(selectedLowerCaseLetters);
    console.log(lowerCaseLetterTest);
    if (lowerCaseLetterTest === false) {
      allTestsPassed = false;
    }
  }
  if (isLengthGreaterThanZero(selectedNumbers)) {
    var numberTest = arrayValidation(selectedNumbers);
    console.log(numberTest);
    if (numberTest === false) {
      allTestsPassed = false;
    }
  }
  if (isLengthGreaterThanZero(selectedSpecialCharacters)) {
    var specialCharacterTest = arrayValidation(selectedSpecialCharacters);
    console.log(specialCharacterTest);
    if (specialCharacterTest === false) {
      allTestsPassed = false;
    }
  }
  return allTestsPassed;
}

function resetApplication (){
  var acceptedPasswordLength = "";
  var selectedCapitalLetters = [];
  var selectedLowerCaseLetters = [];
  var selectedNumbers = [];
  var selectedSpecialCharacters = [];
  var concatArray = [];
  var semiFinalPassword = [];
  generatePassword();
}
// Write password to the #password input
function writePassword(password) {
  // var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN prompted for character types to include in the password
// THEN I choose lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the 
// page.
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

// gathering information to generate the password
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
    lengthCheck();
  } else {
    alert("Not a valid input.\nPlease stop day drinking and enter an actual number.");
    resetApplication();
  }
  function lengthCheck() {
    // check to make sure the password length is between 8 and 128     
    if (acceptedPasswordLength > 128 || acceptedPasswordLength < 8) {
      alert("Sorry, I should have been more specific.\nPasswords must be between 8 and 128 characters.\nPlease try again.");
      resetApplication();
    } else {
      gatherInfo();
    }
  }
}

function gatherInfo() {
  // prompt for capital letters
  var capitalLetters = confirm("Do you want to include capital letters?");
  if (capitalLetters) {
    alert("Capital letters will be included!");
    // update the array to include the selection
    selectedCapitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  } else {
    alert("No capital letters for you!");
  }
  console.log(selectedCapitalLetters);

  // prompt for lower case letters
  var lowerCaseLetters = confirm("Do you want to include lower case letters?");
  if (lowerCaseLetters) {
    alert("Lower case letters coming right up!");
    // update the array to include the selection
    selectedLowerCaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  } else {
    alert("Lower case letters just aren't your thing, huh?!");
  }
  console.log(selectedLowerCaseLetters);

  // prompt for numbers
  var numbers = confirm("Do you want to include numbers?");
  if (numbers) {
    alert("You can count on it!");
    // update the array to include the selection
    selectedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  } else {
    alert("All of the cool kids are doing it, but whatever...");
  }
  console.log(selectedNumbers);

  // prompt for special characters
  var specialCharacters = confirm("Do you want to include special characters?");
  if (specialCharacters) {
    alert("You're special, just like your characters!");
    // update the array to include the selection
    selectedSpecialCharacters =  ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "\", ^", "_", "`", "{", "|", "}", "~"];
  } else {
    alert("Boooooorrrriiiiinnnnnggg!");
  }
  console.log(selectedSpecialCharacters);
  // run the function to put all selected arrays into one array full of possible characters
  combineArrays();
}

// make an array of selected types of characters
function combineArrays() {
  concatArray = concatArray.concat(selectedSpecialCharacters, selectedNumbers,
    selectedLowerCaseLetters, selectedCapitalLetters)
    if (concatArray.length < 1) {
      alert("Seriously? You need to meet me half way here.\nTry again, and this time, select at least ONE of the character types!");
      gatherInfo();
    }else{
      // run the function to pull random characters from the possible characters and create a new holding array- semiFinalPassword
      randomCharacters();
    }
}

// randomly choose the amount of characters from the array with selected possibilities
function randomCharacters() {
  // password length met all criteria- now convert it from a string into a number
  var passwordLengthNumber = parseInt(acceptedPasswordLength)
  // iterate through the array that many times
  for (i = 0; i < passwordLengthNumber; i++) {
    // generate a random index number for the stored password character possibilities
    var randomIndex = getRandomInt(0, concatArray.length);
    // locate that random index number in our concatArray
    var randomValue = concatArray[randomIndex];
    // push the value to our temporary holding array that still needs to be tested
    semiFinalPassword.push(randomValue);
  }
  // checking to see if the current password selection passes all required tests
  var testResults = masterValidation();
  if (testResults === true) {
    var finalPassword = semiFinalPassword.join('');
    writePassword(finalPassword);
  } else {
    semiFinalPassword = [];
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
  var testResult = false;
    // check to see if at least 1 character of each type is represented
    for (i = 0; i <arrayToCheckout.length; i++) {
      var character = arrayToCheckout[i];
      if (semiFinalPassword.includes(character)) {
        console.log("passed");
        testResult = true;
        break;
      } 
    }
    return testResult;
}
// trying to determine if an array is empty- will return a boolean
function isLengthGreaterThanZero (arrayToCheckout) {
  return arrayToCheckout.length > 0;
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
  acceptedPasswordLength = "";
  selectedCapitalLetters = [];
  selectedLowerCaseLetters = [];
  selectedNumbers = [];
  selectedSpecialCharacters = [];
  concatArray = [];
  semiFinalPassword = [];
  finalPassword = [];
  var clearPassword = "";
  writePassword(clearPassword);
  // had trouble clearing the #password in the DOM because the prompt in the generatePassword function was superceding the clearPassword. This timer function solved that issue.
  setTimeout(generatePassword, 100);
}

function holdYourHorses() {
  console.log("prompt override");
}

// Write password to the #password input
function writePassword(password) {
  // var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}
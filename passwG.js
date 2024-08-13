//  DOM element
const resultEL = document.querySelector("#result");
const lengthEL = document.querySelector("#length");
const uppercaseEL = document.querySelector("#uppercase");
const lowercaseEL = document.querySelector("#lowercase");
const numberEL = document.querySelector("#numbers");
const symbolsEL = document.querySelector("#symbols");
const generateEL = document.querySelector("#generate");
const clipboardEL = document.querySelector("#clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Generate event listener
generateEL.addEventListener("click", () => {
  const length = +lengthEL.value;
  const hasLower = lowercaseEL.checked;
  const hasUpper = uppercaseEL.checked;
  const hasNumber = numberEL.checked;
  const hasSymbol = symbolsEL.checked;

  resultEL.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// copy password to clipboard
clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEL.innerText;

  if (!password) {
    
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  resultEL.innerText = "COPIED";
  // alert('password copied to clipboard')
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + symbol; 

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  // console.log('typesArr: ', typesArr);
  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){{}[]=<>,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

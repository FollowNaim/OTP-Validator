// Designed and implemented by Naim

let generatedOTP;
let otpContainer;
let intervalID;
let timeoutID;
let timer;
let result = document.getElementById("result");
let isValidate;
const regenerateOTP = document.getElementById("regenerate-otp");

function init() {
  console.log("javascript initialized");
  tackleInput();
  setTimeout(generateOTP, 2000);
}

function tackleInput() {
  otpContainer = document.getElementById("otp-box-container");
  otpContainer.addEventListener("input", handleInput);
  otpContainer.addEventListener("keydown", handleBackspace);
}

function handleInput(e) {
  const target = e.target;
  const value = target.value;
  if (isNaN(value)) {
    target.value = "";
    return;
  }
  if (target.nextElementSibling) {
    target.nextElementSibling.focus();
  }
  const allFields = [...otpContainer.children].every(
    (input) => input.value !== ""
  );
  if (allFields) {
    validateOtp();
  }
}

function handleBackspace(e) {
  const target = e.target;
  if (
    e.key === "Backspace" &&
    target.previousElementSibling &&
    target.value === ""
  ) {
    e.preventDefault();
    target.previousElementSibling.focus();
    target.previousElementSibling.value = "";
  }
}

function generateOTP() {
  clearInterval(intervalID);
  clearTimeout(timeoutID);
  const generateOtp = document.getElementById("generated-otp");
  generatedOTP = Math.floor(1000 + Math.random() * 9000);
  console.log(generatedOTP);
  generateOtp.textContent = generatedOTP;
  clearInputs();
  expireTimer();
}

function validateOtp() {
  let typedValues = "";
  const children = otpContainer.children;
  [...children].forEach((item) => {
    typedValues = typedValues + item.value;
  });
  console.log(typedValues);
  if (generatedOTP === parseInt(typedValues, 10)) {
    result.style.display = "block";
    result.textContent = "OTP Validated succesfully";
    result.classList.remove("failed");
    result.classList.add("success");
    clearInterval(intervalID);
    clearTimeout(timeoutID);
    timer.parentNode.style.display = "none";
    console.log(timer.parentNode);
  } else {
    result.style.display = "block";
    result.textContent = "OTP Invalid";
    result.classList.remove("success");
    result.classList.add("failed");
    isValidate = false;
    clearInputs();
    children[0].focus();
  }
}

function expireTimer() {
  timer = document.getElementById("timer");
  let intervalTime = 1000;
  let maxTime = 15000;
  let slice = maxTime / intervalTime;
  intervalID = setInterval(() => {
    timer.textContent = slice;
    slice--;
  }, intervalTime);
  timeoutID = setTimeout(() => {
    clearInterval(intervalID);
    generateOTP();
  }, maxTime + intervalTime);
}

regenerateOTP.addEventListener("click", (e) => {
  e.preventDefault();
  generateOTP();
  result.style.display = "none";
  timer.parentNode.style.display = "block";
  timer.textContent = "";
});

function clearInputs() {
  const children = otpContainer.children;
  [...children].forEach((item) => {
    item.value = "";
  });
}

init();

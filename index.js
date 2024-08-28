//Today's date
const currentDate = new Date()

//Declare the current Year, month and date
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth()
let currentDayOfMonth = currentDate.getDate()

//create DOM variables for input fields
const inputYear = document.getElementById("birth-year");
const inputMonth = document.getElementById("birth-month");
const inputDay = document.getElementById("birth-day");

let birthYear;
let birthMonth;
let birthDate;

//these event listeners update the above variables whenever the input changes
inputYear.addEventListener("change", () => {
    birthYear=inputYear.value
})

inputMonth.addEventListener("change", () => {
    birthMonth=inputMonth.value - 1
})

inputDay.addEventListener("change", () => {
    birthDate=inputDay.value 
})

const inputs = [inputYear, inputMonth, inputDay]


//DOM elements that will display the calculated years, months, and days
const calculatedYears = document.getElementById("calculated-years");
const calculatedMonths = document.getElementById("calculated-months");
const calculatedDays = document.getElementById("calculated-days");


// /months and their number of days
const monthsWith31Days = [0, 2, 4, 6, 7, 9, 11]
const monthsWith30Days = [3, 5, 8, 10]
let monthsWith28Days;
let monthsWith29Days;


//form in the DOM
const form = document.querySelector("form");

//ERROR FUNCTIONS
const yearError = inputYear.nextElementSibling;
const monthError = inputMonth.nextElementSibling;
const dayError = inputDay.nextElementSibling;

function validateInputs(){
    if (birthYear % 4 === 0) {
        monthsWith28Days = [];
        monthsWith29Days = [1]
    } else {
        monthsWith28Days = [1];
        monthsWith29Days = [];
    }

    //makes sure entered birth date is a valid integer
    if (inputDay.value > 31 || inputDay.value < 1 ){
        inputDay.style.border = "1px solid red"
        inputDay.parentNode.querySelector("label").style.color = "red"
        dayError.innerHTML = "Must be a valid day"
        return false
    } else if(isNaN(inputDay.value) || inputDay.value % 1 !==0) {
        inputDay.parentNode.querySelector("label").style.color = "red"
        inputDay.style.border = "1px solid red"
        dayError.innerHTML = "Must be a whole number"
        return false;
    } else {
        inputDay.parentNode.querySelector("label").style.color = "hsl(0, 1%, 44%)"
        inputDay.style.border = "1px solid hsl(0, 0%, 86%)"
        dayError.innerHTML = ""
    }

    //makes sure entered month is a valid month of year
    if(inputMonth.value > 12 || inputMonth.value < 1){
        inputMonth.parentNode.querySelector("label").style.color = "red"
        inputMonth.style.border = "1px solid red"
        monthError.innerHTML = "Must be a valid month"
        return false
    } else if(isNaN(inputMonth.value) || inputMonth.value % 1 !==0){
        inputMonth.parentNode.querySelector("label").style.color = "red"
        inputMonth.style.border = "1px solid red"
        monthError.innerHTML = "Must be a whole number"
        return false
    } else {
        inputMonth.parentNode.querySelector("label").style.color = "hsl(0, 1%, 44%)"
        inputMonth.style.border = "1px solid hsl(0, 0%, 86%)"
        monthError.innerHTML = ""
    }

    //makes sure entered year is a valid year in the past
    if (inputYear.value > currentYear){
        inputYear.parentNode.querySelector("label").style.color = "red"
        inputYear.style.border = "1px solid red"
        yearError.innerHTML = "Must be in the past"
        return false
    } else if(isNaN(inputYear.value) || inputYear.value % 1 !==0) {
        inputYear.parentNode.querySelector("label").style.color = "red"
        inputYear.style.border = "1px solid red"
        yearError.innerHTML = "Must be a whole number"
        return false;
    } else {
        inputYear.parentNode.querySelector("label").style.color = "hsl(0, 1%, 44%)"
        inputYear.style.border = "1px solid hsl(0, 0%, 86%)"
        yearError.innerHTML = ""
    }

    //makes sure entered date exists in the month
    if(monthsWith30Days.includes(birthMonth) && birthDate > 30){
        inputDay.style.border = "1px solid red"
        inputDay.parentNode.querySelector("label").style.color = "red"
        dayError.innerHTML = "Must be a valid day"
        return false
    } else if(monthsWith28Days.includes(birthMonth) && birthDate > 28){
        inputDay.style.border = "1px solid red"
        inputDay.parentNode.querySelector("label").style.color = "red"
        dayError.innerHTML = "Must be a valid day"
        return false
    }

    return true
}

// SUBMIT FORM FUNCTION
function handleSubmit(e) {
    e.preventDefault();

    validateInputs()

    if(validateInputs() === true) {
        if((currentMonth > (birthMonth)) && (currentDayOfMonth >= birthDate)){
            calculatedYears.innerHTML = currentYear - birthYear
            calculatedMonths.innerHTML = currentMonth - birthMonth
            calculatedDays.innerHTML = currentDayOfMonth - birthDate;
    
        } else if((currentMonth > (birthMonth - 1)) && (currentDayOfMonth < birthDate)) {
            calculatedYears.innerHTML = currentYear - birthYear
            calculatedMonths.innerHTML = (currentMonth - 1) - birthMonth
    
            if(monthsWith31Days.includes(currentMonth - 1)) {
                calculatedDays.innerHTML = (31 - birthDate) + currentDayOfMonth;
            } else if(monthsWith30Days.includes(currentMonth - 1)){
                calculatedDays.innerHTML = (30 - birthDate) + currentDayOfMonth;
            } else if(monthsWith28Days.includes(currentMonth - 1)){
                calculatedDays.innerHTML = (28 - birthDate) + currentDayOfMonth;
            } else if(monthsWith29Days.includes(currentMonth - 1)){
                calculatedDays.innerHTML = (29 - birthDate) + currentDayOfMonth;
            }
    
        } else if((currentMonth < (birthMonth)) && (currentDayOfMonth >= birthDate)) {
            calculatedYears.innerHTML = (currentYear - 1) - birthYear
            calculatedMonths.innerHTML = 12 - (birthMonth - currentMonth)
            calculatedDays.innerHTML = currentDayOfMonth - birthDate;
    
        } else if((currentMonth < (birthMonth)) && (currentDayOfMonth < birthDate)) {
            calculatedYears.innerHTML = (currentYear - 1) - birthYear
            calculatedMonths.innerHTML = 11 - (birthMonth - currentMonth);
            
            if(monthsWith31Days.includes(currentMonth - 1)) {
                calculatedDays.innerHTML = (31 - birthDate) + currentDayOfMonth;
            } else if(monthsWith30Days.includes(currentMonth - 1)){
                calculatedDays.innerHTML = (30 - birthDate) + currentDayOfMonth;
            } else if(monthsWith28Days.includes(currentMonth - 1)){
                calculatedDays.innerHTML = (28 - birthDate) + currentDayOfMonth;
            } else if (monthsWith29Days.includes(currentMonth - 1)){
                calculatedDays.innerHTML = (29 - birthDate) + currentDayOfMonth;
            }
        }
    }


 
}

form.addEventListener("submit", handleSubmit)

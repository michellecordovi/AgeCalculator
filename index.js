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

//adjusts the styling for day input, month input, and year input when there are errors
function dayErrorStyles(message) {
    inputDay.style.border = "1px solid red"
    inputDay.parentNode.querySelector("label").style.color = "red"
    dayError.innerHTML = message
    return false
}

function monthErrorStyles(message){
    inputMonth.parentNode.querySelector("label").style.color = "red"
    inputMonth.style.border = "1px solid red"
    monthError.innerHTML = message
    return false
}

function yearErrorStyles(message){
    inputYear.parentNode.querySelector("label").style.color = "red"
    inputYear.style.border = "1px solid red"
    yearError.innerHTML = message
    return false
}


//valids all three inputs
function validateInputs(){
    if (birthYear % 4 === 0) {
        monthsWith28Days = [];
        monthsWith29Days = [1]
    } else {
        monthsWith28Days = [1];
        monthsWith29Days = [];
    }

    //makes sure entered birth date is a valid integer and is not left blank
    if (inputDay.value > 31 || inputDay.value < 1){
        dayErrorStyles("Must be a valid day")
    } else if(isNaN(inputDay.value) || inputDay.value % 1 !==0) {
        dayErrorStyles("Must be a whole number")
    } else if(inputDay.value === "") {
        dayErrorStyles("This field is required")
    } else if(birthYear == currentYear && currentMonth == birthMonth && currentDayOfMonth < birthDate){
        dayErrorStyles("Must be in the past")
    } else {
        inputDay.parentNode.querySelector("label").style.color = "hsl(0, 1%, 44%)"
        inputDay.style.border = "1px solid hsl(0, 0%, 86%)"
        dayError.innerHTML = ""
    }

    //makes sure entered month is a valid month of year and is not left blank
    if(inputMonth.value > 12 || inputMonth.value < 1){
        monthErrorStyles("Must be a valid month")
    } else if(isNaN(inputMonth.value) || inputMonth.value % 1 !==0){
        monthErrorStyles("Must be a whole number")
    } else if(inputMonth.value === "") {
        monthErrorStyles("This fiel is required")
    } else if(birthYear == currentYear && currentMonth < birthMonth){
        monthErrorStyles("Must be in the past")
    } else {
        inputMonth.parentNode.querySelector("label").style.color = "hsl(0, 1%, 44%)"
        inputMonth.style.border = "1px solid hsl(0, 0%, 86%)"
        monthError.innerHTML = ""
    }

    //makes sure entered year is a valid year in the past and is not left blank
    if (inputYear.value > currentYear){
        yearErrorStyles("Must be in the past")
    } else if(isNaN(inputYear.value) || inputYear.value % 1 !==0) {
        yearErrorStyles("Must be a whole number")
    } else if(inputYear.value === "") {
        yearErrorStyles("This field is required")
    } else {
        inputYear.parentNode.querySelector("label").style.color = "hsl(0, 1%, 44%)"
        inputYear.style.border = "1px solid hsl(0, 0%, 86%)"
        yearError.innerHTML = ""
    }

    //makes sure entered date exists in the month
    if(monthsWith30Days.includes(birthMonth) && birthDate > 30){
        dayErrorStyles("Must be a valid day")
    } else if(monthsWith28Days.includes(birthMonth) && birthDate > 28){
        dayErrorStyles("Must be a valid day")
    }

    return true
}

//function to calculate number of days when current day of the month is less than the birth day
function currentDayLessThanBirthDay(){
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

// SUBMIT FORM FUNCTION
function handleSubmit(e) {
    e.preventDefault();

    validateInputs()

    if(validateInputs() === true) {
        if((currentMonth > birthMonth) && (currentDayOfMonth >= birthDate)){
            calculatedYears.innerHTML = currentYear - birthYear
            calculatedMonths.innerHTML = currentMonth - birthMonth
            calculatedDays.innerHTML = currentDayOfMonth - birthDate;
    
        } else if((currentMonth == birthMonth) && (currentDayOfMonth >= birthDate)){
            calculatedYears.innerHTML = currentYear - birthYear
            calculatedMonths.innerHTML = currentMonth - birthMonth
            calculatedDays.innerHTML = currentDayOfMonth - birthDate;
    
        } else if((currentMonth == birthMonth) && (currentDayOfMonth <= birthDate)){
            calculatedYears.innerHTML = (currentYear - 1) - birthYear
            calculatedMonths.innerHTML = currentMonth - birthMonth
            currentDayLessThanBirthDay()
    
        } else if((currentMonth > (birthMonth - 1)) && (currentDayOfMonth < birthDate)) {
            calculatedYears.innerHTML = currentYear - birthYear
            calculatedMonths.innerHTML = (currentMonth - 1) - birthMonth
            currentDayLessThanBirthDay()
    
        } else if((currentMonth < birthMonth) && (currentDayOfMonth >= birthDate)) {
            calculatedYears.innerHTML = (currentYear - 1) - birthYear
            calculatedMonths.innerHTML = 12 - (birthMonth - currentMonth)
            calculatedDays.innerHTML = currentDayOfMonth - birthDate;
    
        } else if((currentMonth < birthMonth) && (currentDayOfMonth < birthDate)) {
            calculatedYears.innerHTML = (currentYear - 1) - birthYear
            calculatedMonths.innerHTML = 11 - (birthMonth - currentMonth);
            currentDayLessThanBirthDay()
        }
    }

}

form.addEventListener("submit", handleSubmit)

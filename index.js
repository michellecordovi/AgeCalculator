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
const monthsWith28Days = 1;

//form in the DOM
const form = document.querySelector("form");

function handleSubmit(e) {
    e.preventDefault();

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
        }
    }
 
}

form.addEventListener("submit", handleSubmit)

//Today's date
const currentDate = new Date()
console.log(currentDate)

//Declare the current Year, month and date
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth()
let currentDayOfMonth = currentDate.getDate()

console.log(`${currentYear} + ${currentMonth} + ${currentDayOfMonth}`)

// declare empty variables that for the birth year, month, and date that will be equal to user input
let birthYear;
let birthMonth;
let birthDate;

//create DOM variables for input fields
const inputYear = document.getElementById("birth-year");
const inputMonth = document.getElementById("birth-month")
const inputDay = document.getElementById("birth-day")


const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();


const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let i = day; i > 0; i--) {
        days += `<div class="day prev-date" >${prevDays - i + 1}</div>`;
    }

    for (let x = 1; x <= lastDate; x++) {
        if (x == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()) {
            days += `<div class="day today" >${x}</div>`;
        }
        else {
            days += `<div class="day" >${x}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date" >${j}</div>`;
    }

    daysContainer.innerHTML = days;
}

initCalendar();

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}


function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);



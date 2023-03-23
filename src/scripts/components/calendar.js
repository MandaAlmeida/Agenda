export class Calendar {
    constructor() {
        this.today = new Date();
        this.activeDay;
        this.month = this.today.getMonth();
        this.year = this.today.getFullYear();
        this.months = [
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
        this.eventsArr = [];

        this.selectors();
        this.events();
        this.initCalendar();
        this.getEvents();
    }

    selectors() {
        this.calendar = document.querySelector(".calendar"),
            this.date = document.querySelector(".date"),
            this.daysContainer = document.querySelector(".days"),
            this.prev = document.querySelector(".prev"),
            this.next = document.querySelector(".next"),
            this.todayBtn = document.querySelector(".today-btn"),
            this.goBtn = document.querySelector(".go-btn"),
            this.eventDay = document.querySelector(".event-day"),
            this.eventDate = document.querySelector(".event-date"),
            this.dateInput = document.querySelector(".date-input"),
            this.addEventSubmit = document.querySelector(".add-event-button"),
            this.addEventBtn = document.querySelector(".add-event"),
            this.addEventContainer = document.querySelector(".add-event-wrapper"),
            this.addEventCloseBtn = document.querySelector(".close"),
            this.addEventTitle = document.querySelector(".event-name"),
            this.addEventFrom = document.querySelector(".event-time-from"),
            this.addEventTo = document.querySelector(".event-time-to"),
            this.eventsContainer = document.querySelector(".events"),
            this.day = document.querySelectorAll(".day"),
            this.error = document.querySelector(".alert"),
            this.addAnnotation = document.querySelector(".annotation-container"),
            this.addReminder = document.querySelector(".reminder-container"),
            this.reminderBntEvent = document.querySelector(".reminder-bnt"),
            this.annotationBntEvent = document.querySelector(".annotation-bnt");
    }

    events() {
        this.prev.addEventListener("click", this.prevMonth.bind(this));
        this.next.addEventListener("click", this.nextMonth.bind(this));
        this.todayBtn.addEventListener("click", this.todayBtnF.bind(this));
        this.dateInput.addEventListener("input", this.dateInputF.bind(this));
        this.goBtn.addEventListener("click", this.goDate.bind(this));
        this.addEventTitle.addEventListener("input", this.addEventTitleF.bind(this));
        this.addEventFrom.addEventListener("input", this.addEventFromF.bind(this));
        this.addEventTo.addEventListener("input", this.addEventToF.bind(this));
        this.addEventSubmit.addEventListener("click", this.addEventSubmitF.bind(this));
        this.eventsContainer.addEventListener("click", this.eventsContainerF.bind(this));
        this.annotationBntEvent.addEventListener("click", this.annotationBnt.bind(this));
        this.reminderBntEvent.addEventListener("click", this.reminderBnt.bind(this));
        this.addEventBtn.addEventListener("click", () => {
            this.addEventContainer.classList.toggle("active");
        });
        this.addEventCloseBtn.addEventListener("click", () => {
            console.log(this.addEventCloseBtn);
            this.addEventContainer.classList.remove("active");
        });
        document.addEventListener("click", (e) => {
            if (e.target == !this.addEventBtn && !this.addEventContainer.contains(e.target)) {
                this.addEventContainer.classList.remove("active");
            }
        });
    }

    initCalendar() {
        const firstDay = new Date(this.year, this.month, 1);
        const lastDay = new Date(this.year, this.month + 1, 0);
        const prevLastDay = new Date(this.year, this.month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const day = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;

        this.date.innerHTML = `${this.months[this.month]} ${this.year}`;

        let days = "";

        for (let i = day; i > 0; i--) {
            days += `<div class="day prev-date" >${prevDays - i + 1}</div>`;
        }

        for (let x = 1; x <= lastDate; x++) {
            let event = false;
            this.eventsArr.forEach((eventObj) => {
                if (
                    eventObj.day == x && eventObj.month == this.month + 1 && eventObj.year == this.year
                ) {
                    // if event found
                    event = true
                }
            })
            //if day is today add class today
            if (x == new Date().getDate() && this.year == new Date().getFullYear() && this.month == new Date().getMonth()) {

                this.activeDay = x;
                this.getActiveDay(x);
                this.updateEvents(x);

                //if event found also add event class
                //add active on today at startup
                if (event) {
                    days += `<div class="day today active event" >${x}</div>`;
                } else {
                    days += `<div class="day today active" >${x}</div>`;
                }
            }
            else {
                if (event) {
                    days += `<div class="day event" >${x}</div>`;
                } else {
                    days += `<div class="day " >${x}</div>`;
                }
            }
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="day next-date" >${j}</div>`;
        }

        this.daysContainer.innerHTML = days;

        this.addListener();
    }

    prevMonth() {
        this.month--;
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        }
        this.initCalendar();
    }


    nextMonth() {
        this.month++;
        if (this.month > 11) {
            this.month = 0;
            this.year++;
        }
        this.initCalendar();
    }

    goDate() {
        const dateArr = this.dateInput.value.split("/");

        if (dateArr.length == 2) {
            if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length == 4) {
                this.month = dateArr[0] - 1;
                this.year = dateArr[1];
                this.initCalendar();
                return;
            }
        }

        alert("data invalida");
    };

    addEventTitleF(e) {
        this.addEventTitle.value = this.addEventTitle.value.slice(0, 50)
    };

    addEventFromF(e) {
        this.addEventFrom.value = this.addEventFrom.value.replace(/[^0-9:]/g, "");
        if (this.addEventFrom.value.length === 2) {
            this.addEventFrom.value += ":";
        }
        if (this.addEventFrom.value.length > 5) {
            this.addEventFrom.value = this.addEventFrom.value.slice(0, 5);
        }
    };

    addEventToF() {
        this.addEventTo.value = this.addEventTo.value.replace(/[^0-9:]/g, "");
        if (this.addEventTo.value.length == 2) {
            this.addEventTo.value += ":";
        }
        if (this.addEventTo.value.length > 5) {
            this.addEventTo.value = this.addEventTo.value.slice(0, 5);
        }
    };

    todayBtnF() {
        this.today = new Date();
        this.month = this.today.getMonth();
        this.year = this.today.getFullYear();
        this.initCalendar();
    };

    dateInputF(e) {
        this.dateInput.value = this.dateInput.value.replace(/[^0-9/]/g, "");
        if (this.dateInput.value.length == 2) {
            this.dateInput.value += "/"
        }
        if (this.dateInput.value.length > 7) {
            this.dateInput.value = this.dateInput.value.slice(0, 7);
        }
        if (e.inputType = "deleteContentBackward") {
            if (this.dateInput.value.length == 3) {
                this.dateInput.value = this.dateInput.value.slice(0, 2)
            }
        }
    }

    //lets create function to add listener on days after rendered
    addListener() {
        const days = document.querySelectorAll(".day");
        days.forEach((day) => {
            day.addEventListener("click", (e) => {
                //set current day as active day
                this.activeDay = Number(e.target.innerHTML);

                //call active day after click
                this.getActiveDay(e.target.innerHTML);
                this.updateEvents(e.target.innerHTML);

                // remove active from already active day
                days.forEach((day) => {
                    day.classList.remove("active")
                });

                // if prev month day clicked go prev month and add active
                if (e.target.classList.contains("prev-date")) {
                    this.prevMonth();

                    setTimeout(() => {
                        // select all days of that month
                        const days = document.querySelector(".day");
                        //after going to prev month add active to clicked
                        days.forEach((day) => {
                            if (!day.classList.contains("prev-date") && day.innerHTML == e.target.innerHTML) {
                                day.classList.add("active");
                            }
                        });
                    }, 100);
                } else if (e.target.classList.contains("next-date")) {
                    this.nextMonth();

                    setTimeout(() => {
                        // select all days of that month
                        const days = document.querySelector(".day");
                        //after going to next month adda ctive to clicked
                        days.forEach((day) => {
                            if (!day.classList.contains("next-date") && day.innerHTML == e.target.innerHTML) {
                                day.classList.add("active");
                            }
                        });
                    }, 100);
                }
                else {
                    //remaining  current month days
                    e.target.classList.add("active")
                }
            })
        })
    }

    //lets show active day events and date at top
    getActiveDay(date) {
        let semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        const day = new Date(this.year, this.month, date);
        const dayName = semana[day.getDay()];

        this.eventDay.innerHTML = dayName;
        this.eventDate.innerHTML = `${date} de ${this.months[this.month]} de ${this.year}`;
    }
    //function to show events of that day

    updateEvents(date) {
        let events = "";
        this.eventsArr.forEach((event) => {
            //get events of active day only
            if (date == event.day && this.month + 1 == event.month && this.year == event.year) {
                // then show event on document
                event.events.forEach((event) => {
                    events += `
                    <div class="event">
                    <div class="title">
                    <i class="fas fa-circle"></i>
                    <h3 class="event-title">${event.title}</h3></div>
                    <div class="event-time">
                    <span>${event.time}</span>
                    </div>
                    </div>`
                })
            }
        });

        if (events === "") {
            events = ` <div class="no-event">
            <h3>Nenhum Evento</h3></div>`
        }

        this.eventsContainer.innerHTML = events;
        //save events when new one added
        this.saveEvents();
        return;
    }
    //lets create function to add events
    addEventSubmitF() {
        const activeDayElem = document.querySelector(".day.active");
        const eventTitle = this.addEventTitle.value;
        const eventTimeFrom = this.addEventFrom.value;
        const eventTimeTo = this.addEventTo.value;

        //some validations

        if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
            alert(" Por favor, preencha todos os campos");
            return;
        }

        const timeFromArr = eventTimeFrom.split(":");
        const timeToArr = eventTimeTo.split(":");

        if (timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59) {
            alert("Hora Inválida");
        }

        const timeFrom = this.convertTime(eventTimeFrom);
        const timeTo = this.convertTime(eventTimeTo);

        const newEvent = {
            title: eventTitle,
            time: `${timeFrom} - ${timeTo}`
        }

        let eventAdded = false;

        //check if eventsArr not empty
        if (this.eventsArr.length > 0) {
            this.eventsArr.forEach((item) => {
                if (item.day === this.activeDay && item.month === this.month + 1 && item.year === this.year) {
                    item.events.push(newEvent);
                    eventAdded = true;
                }
            })
        }

        //if event array empty or current day has event create new
        if (!eventAdded) {
            this.eventsArr.push({
                day: this.activeDay,
                month: this.month + 1,
                year: this.year,
                events: [newEvent]
            })
        }

        //rename active from add event form
        this.addEventContainer.classList.remove("active")

        //clear the fields
        this.addEventTitle.value = "";
        this.addEventFrom.value = "";
        this.addEventTo.value = "";

        //Show current added event
        this.updateEvents(this.activeDay);

        //also add event class to newly added day if not already
        if (!activeDayElem.classList.contains("event")) {
            activeDayElem.classList.add("event")

        }
    };

    convertTime(timer) {
        let timeArr = timer.split(":");
        let timeHour = timeArr[0];
        let timeMin = timeArr[1];
        let time = `${timeHour}:${timeMin}`

        return timer;
    }

    //lets create a function to remove events on click

    eventsContainerF(e) {
        const activeDayElem = document.querySelector(".day.active");
        if (e.target.classList.contains("event")) {
            const eventTitle = e.target.children[0].children[1].innerHTML;

            this.eventsArr.forEach((event) => {
                if (event.day === this.activeDay && event.month === this.month + 1 && event.year === this.year) {
                    event.events.forEach((item, index) => {
                        if (item.title === eventTitle) {
                            event.events.splice(index, 1);
                        }
                    });

                    //if no event remaining on that dat remove complete day
                    if (event.events.length === 0) {
                        this.eventsArr.splice(this.eventsArr.indexOf(event), 1);

                        //after remove complete day also remove active class of that day
                        if (activeDayElem.classList.contains("event")) {
                            activeDayElem.classList.remove("event")
                        }
                    }
                }
            });

            this.updateEvents(this.activeDay);
        }
    };

    //lets store events in local
    saveEvents() {
        localStorage.setItem("events", JSON.stringify(this.eventsArr));
    };

    getEvents() {
        if (localStorage.getItem("events" === null)) {
            return;
        }
        this.eventsArr.push(...JSON.parse(localStorage.getItem("events")))
    }

    annotationBnt() {
        if (this.addReminder.classList.contains("active")) {
            this.addReminder.classList.remove("active");
            this.addAnnotation.classList.add("active");
        }
    }

    reminderBnt() {
        if (this.addAnnotation.classList.contains("active")) {
            this.addAnnotation.classList.remove("active");
            this.addReminder.classList.add("active");
        }
    }

}
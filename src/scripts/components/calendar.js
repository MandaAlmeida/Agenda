export class Calendar {
    constructor() {
        this.eventsArr = [];
        this.annotationArr = [];
        this.today = new Date();
        this.activeDay;
        this.month = this.today.getMonth();
        this.year = this.today.getFullYear();
        this.users = JSON.parse(localStorage.getItem('user'));
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
        if (localStorage.getItem('token')) {
            this.init();
        } else {
            window.location.href = 'http://localhost:3000/index.html';
        }
    }

    async init() {
        this.selectors();
        await this.createEvents();
        await this.createAnnotation();
        this.renderPage();
        this.events();
        this.initCalendar();
        this.user();
    }

    selectors() {
        this.userBnt = document.querySelector(".button-user")
        this.containerUser = document.querySelector(".container-icon-user")
        this.calendar = document.querySelector(".calendar");
        this.date = document.querySelector(".date");
        this.daysContainer = document.querySelector(".days");
        this.prev = document.querySelector(".prev");
        this.next = document.querySelector(".next");
        this.todayBtn = document.querySelector(".today-btn");
        this.goBtn = document.querySelector(".go-btn");
        this.eventDay = document.querySelector(".event-day");
        this.eventDate = document.querySelector(".event-date");
        this.dateInput = document.querySelector(".date-input");
        this.addEventSubmit = document.querySelector(".add-event-button");
        this.addEventBtn = document.querySelector(".add-event");
        this.addEventContainer = document.querySelector(".add-event-wrapper");
        this.addEventCloseBtn = document.querySelector(".close");
        this.addEventTitle = document.querySelector(".event-name");
        this.addEventFrom = document.querySelector(".event-time-from");
        this.addEventTo = document.querySelector(".event-time-to");
        this.eventsContainer = document.querySelector(".events");
        this.day = document.querySelectorAll(".day");
        this.error = document.querySelector(".alert");
        this.addAnnotation = document.querySelector(".annotation-container");
        this.addReminder = document.querySelector(".reminder-container");
        this.inputTitle = document.querySelector(".form-title");
        this.inputDescription = document.querySelector(".form-description");
        this.createAnnotationBnt = document.querySelector(".create-annotations-bnt");
        this.reminderBnt = document.querySelector(".reminder-bnt");
        this.annotationBnt = document.querySelector(".annotation-bnt");
        this.items = document.querySelector(".annotations");
        this.addAnnotationBtn = document.querySelector(".add-annotation-bnt");
        this.addAnnotationContainer = document.querySelector(".create-annotations");
        this.addAnnotationCloseBtn = document.querySelector(".close-annotation");
        this.pictureInput = document.querySelector('#picture_input');
        this.pictureImage = document.querySelector('.picture_image');
        this.pictureImageTxt = 'Imagem';
        this.pictureImage.innerHTML = this.pictureImageTxt;
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
        this.annotationBnt.addEventListener("click", this.annotationEventBnt.bind(this));
        this.reminderBnt.addEventListener("click", this.annotationReminderBnt.bind(this));
        this.addEventBtn.addEventListener("click", () => {
            this.addEventContainer.classList.toggle("active");
        });
        this.addEventCloseBtn.addEventListener("click", () => {
            this.addEventContainer.classList.remove("active");
        });
        document.addEventListener("click", (e) => {
            if (e.target == !this.addEventBtn && !this.addEventContainer.contains(e.target)) {
                this.addEventContainer.classList.remove("active");
            }
        });
        this.userBnt.addEventListener("click", () => {
            this.containerUser.classList.toggle("active");
        });
        this.addAnnotationBtn.addEventListener("click", () => {
            this.addAnnotationContainer.classList.toggle("active");
        });
        this.addAnnotationCloseBtn.addEventListener("click", () => {
            this.addAnnotationContainer.classList.remove("active")
        });

        document.addEventListener("click", (e) => {
            if (e.target == !this.addAnnotationBtn && !this.addAnnotationContainer.contains(e.target)) {
                this.addAnnotationContainer.classList.remove("active");
            }
        });
        this.createAnnotationBnt.addEventListener("click", this.createAnnotationBntF.bind(this));
        this.pictureInput.addEventListener('change', this.addPreviewImage.bind(this));
    }

    user() {
        const user = this.users;
        this.containerUser.innerHTML = `
        <section class="dates-users_text"> <p class="dates-users_name">Nome: ${user[0].name}</p>
        <span class="dates-users_email">${user[0].email}</span></section>
        <a href="/index.html">
        <button class="dates-users_button">Sair da conta</button>
        </a>
        `
        if (document.querySelector(".dates-users_button")) {
            const bnt = document.querySelector(".dates-users_button");

            bnt.addEventListener("click", () => {
                localStorage.removeItem("token");
            });
        }
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
            let annotation = false;
            this.eventsArr.forEach((eventObj) => {
                const date = eventObj.date;
                const dia = date.substr(0, 2);
                const mes = date.substr(2, 2);
                const ano = date.substr(4, 4);
                if (
                    dia == x && mes == this.month + 1 && ano == this.year
                ) {
                    // if event found
                    event = true
                }
            })
            this.annotationArr.forEach((annotationObj) => {
                const date = annotationObj.date;
                const dia = date.substr(0, 2);
                const mes = date.substr(2, 2);
                const ano = date.substr(4, 4);
                if (
                    dia == x && mes == this.month + 1 && ano == this.year
                ) {
                    // if event found
                    annotation = true
                }
            })
            //if day is today add class today
            if (x == new Date().getDate() && this.year == new Date().getFullYear() && this.month == new Date().getMonth()) {

                this.activeDay = x;
                this.getActiveDay(x);
                this.updateEvents(x);
                //if event found also add event class
                //add active on today at startup
                if (event && annotation) {
                    days += `<div class="day today active event-active annotation-active" >${x}</div>`;
                } else if (event) {
                    days += `<div class="day today active event-active" >${x}</div>`;
                } else if (annotation) {
                    days += `<div class="day today active annotation-active" >${x}</div>`;
                } else {
                    days += `<div class="day today active" >${x}</div>`;
                }
            }
            else {
                if (event && annotation) {
                    days += `<div class="day event-active annotation-active" >${x}</div>`;
                }
                else if (annotation) {
                    days += `<div class="day annotation-active" >${x}</div>`;
                } else if (event) {
                    days += `<div class="day event-active" >${x}</div>`;
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
        this.updateEvents(this.activeDay);
        this.removeEvent();
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
        this.addEventTitle.value = this.addEventTitle.value.slice(0, 50).replace(/\d+/g, "")
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
                        const days = document.querySelectorAll(".day");
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
                        const days = document.querySelectorAll(".day");
                        //after going to next month add active to clicked
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
        this.updateEvents(date);
        this.renderListItems(date);
        this.renderItem();
    }

    async createEvents() {
        const id = this.users[0].id
        const response = await fetch(`https://server-agenda.vercel.app/user/${id}/reminder`);
        const data = await response.json();
        this.eventsArr = data;
    }

    //function to show events of that day
    updateEvents(date) {
        let events = ""
        this.eventsArr.forEach((event) => {
            const dateEvent = event.date;
            const dia = dateEvent.substr(0, 2);
            const mes = dateEvent.substr(2, 2);
            const ano = dateEvent.substr(4, 4);
            const dateUpdate = date.toString().padStart(2, '0');
            //get events of active day only
            if (dateUpdate == dia && this.month + 1 == mes && this.year == ano) {
                const title = event.title.replace(/[!@#$%^&*()_+\-={}\[\]|\\;:'"<>,.?/]/g, "").replace(/\s+/g, '')
                // then show event on document 
                events += `
                <div class="event active ${title}">
                <i class="fas fa-check close-event"></i>
                <div class="container-text"> <div class="title">
                <i class="fas fa-circle"></i>
                <h3 class="event-title">${event.title}</h3></div>
                <div class="event-time">
                <span>${event.hourStart} - ${event.hourEnd}</span>
                </div></div>
               
                </div>`;

            }
        });
        if (events === "") {
            events = `<div class="no-event">
                <h3>Nenhum Evento</h3>
            </div>`;
        }


        this.eventsContainer.innerHTML = events;
        this.removeEvent()
    }

    //lets create function to add events
    addEventSubmitF() {
        const activeDayElem = document.querySelector(".day.active");
        const eventTitle = this.addEventTitle.value;
        const eventTimeFrom = this.addEventFrom.value;
        const eventTimeTo = this.addEventTo.value;
        const date = this.activeDay.toString().padStart(2, '0').concat((this.month + 1).toString().padStart(2, '0'), this.year.toString());
        const user = JSON.parse(localStorage.getItem('user'));

        //some validations

        if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
            alert(" Por favor, preencha todos os campos");
            return;
        }

        const timeFromArr = eventTimeFrom.split(":");
        const timeToArr = eventTimeTo.split(":");

        if (timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59) {
            alert("Hora Inválida");
            return;
        }

        let eventExist = false;
        this.eventsArr.forEach((event) => {
            if (
                event.date === date
            )
                if (event.title === eventTitle) {
                    eventExist = true;
                }
        });
        if (eventExist) {
            alert("Evento já existe");
            return;
        }

        const newEvent = {
            title: eventTitle,
            hourStart: eventTimeFrom,
            hourEnd: eventTimeTo,
            date: date,
        }

        let eventAdded = false;
        if (this.eventsArr.length > 0) {
            if (
                this.eventsArr.date == date
            ) {
                item.push({ date: date, events: newEvent });
                eventAdded = true;
            }
        };

        if (!eventAdded) {
            this.eventsArr.push(newEvent);
        }

        const id = user[0].id

        fetch(`https://server-agenda.vercel.app/user/${id}/reminder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent),
        })
            .then(response => response.json())
            .then(data => {
                this.addEventTitle.value = "";
                this.addEventFrom.value = "";
                this.addEventTo.value = "";
                this.addEventContainer.classList.remove("active")
                console.log("data:", data)
            })
            .catch(error => {
                console.error('Erro ao criar lembrete', error);
            });

        //also add event class to newly added day if not already
        if (!activeDayElem.classList.contains("event-active")) {
            activeDayElem.classList.add("event-active")
        }

        this.updateEvents(this.activeDay);
    };

    removeEvent() {
        if (this.addReminder.classList.contains('active')) {
            const event = document.querySelectorAll('.event');
            const activeDayElem = document.querySelector(".day.active");
            const events = this.eventsArr;
            const containerEvents = this.eventsContainer;
            const id = this.users[0].id;

            event.forEach((item) => {
                const deleteEvent = item.querySelector(".close-event");
                deleteEvent.addEventListener("click", function () {
                    const text = item.querySelector(".container-text")
                    const titulo = text.querySelector(".title .event-title").textContent;
                    fetch(`https://server-agenda.vercel.app/user/${id}/reminder/${encodeURIComponent(titulo)}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Erro ao excluir item do servidor');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log("data:", data);
                            let index = events.findIndex(item => item.title === titulo);


                            if (index !== -1) {
                                events.splice(index, 1);
                                console.log("Item removido do array com sucesso!");

                            }
                            if (events.length === 0) {
                                activeDayElem.classList.remove("event-active");
                            }
                        })
                        .catch(error => {
                            console.error('Erro ao excluir item', error);
                        });

                    const title = titulo.replace(/[!@#$%^&*()_+\-={}\[\]|\\;:'"<>,.?/]/g, "").replace(/\s+/g, '')
                    const itemRemove = document.querySelector(`.event.active.${title}`)
                    if (itemRemove) {
                        itemRemove.classList.remove("active")

                        if (events.length == 1) {
                            console.log(item);
                            containerEvents.innerHTML = `<div class="no-event">
                                                            <h3>Nenhum Evento</h3>
                                                          </div>`;
                            if (activeDayElem.classList.contains("event-active")) {
                                activeDayElem.classList.remove("event-active")
                            }
                        }
                    }
                });
            });


        }
    }

    async createAnnotation() {
        const id = this.users[0].id
        const response = await fetch(`https://server-agenda.vercel.app/user/${id}/notes`);
        const data = await response.json();
        this.annotationArr = data;
    }

    addPreviewImage(e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                const readerTarget = e.target;
                const img = document.createElement('img');
                img.src = readerTarget.result;
                img.classList.add('picture-img');
                this.pictureImage.innerHTML = "";
                this.pictureImage.appendChild(img);

            })

            reader.readAsDataURL(file);

        } else {
            this.pictureImage.innerHTML = this.pictureImageTxt;

        }
    };

    createAnnotationBntF() {
        const itemTitle = this.inputTitle.value;
        const itemDescription = this.inputDescription.value;
        const itemPicture = this.pictureImage.children[0].src;
        const date = this.activeDay.toString().padStart(2, '0').concat((this.month + 1).toString().padStart(2, '0'), this.year.toString());
        const id = this.users[0].id;
        const activeDayElem = document.querySelector(".day.active");

        if (itemTitle === "" || itemDescription === "") {
            alert(" Por favor, preencha todos os campos");
            return;
        }

        let annotationExist = false;
        this.annotationArr.forEach((event) => {
            if (
                event.date === date
            )
                if (event.title === itemTitle && event.text === itemDescription) {
                    annotationExist = true;
                }
        });
        if (annotationExist) {
            alert("Nota já existe");
            return;
        }

        let picture = "";
        if (itemPicture != "") {
            picture = itemPicture;
        } else {
            picture = "./img/imgWhite.jpeg"
        }

        const item = {
            title: itemTitle,
            text: itemDescription,
            img: picture,
            date: date
        };
        this.annotationArr.push(item);

        fetch(`https://server-agenda.vercel.app/user/${id}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        })
            .then(response => response.json())
            .then(data => {
                this.inputTitle.value = "";
                this.inputDescription.value = "";
                this.pictureImage.innerHTML = "";
                this.addAnnotationContainer.classList.remove("active")
                console.log("data:", data)
            })
            .catch(error => {
                console.error('Erro ao criar anotação', error);
            });

        if (!activeDayElem.classList.contains("annotation-active")) {
            activeDayElem.classList.add("annotation-active")
        }

        this.renderListItems(this.activeDay);
    };

    renderListItems(date) {
        let annotations = "";

        this.annotationArr.forEach((annotation) => {
            const dateAnnotation = annotation.date;
            const dia = dateAnnotation.substr(0, 2);
            const mes = dateAnnotation.substr(2, 2);
            const ano = dateAnnotation.substr(4, 4);
            const dateUpdate = date.toString().padStart(2, '0');
            //get events of active day only
            if (dateUpdate == dia && this.month + 1 == mes && this.year == ano) {
                const title = annotation.title.replace(/[!@#$%^&*()_+\-={}\[\]|\\;:'"<>,.?/]/g, "").replace(/\s+/g, '').replace(/\d+/g, "")
                const text = annotation.text.replace(/[!@#$%^&*()_+\-={}\[\]|\\;:'"<>,.?/]/g, "").replace(/\s+/g, '').slice(0, 30).replace(/\d+/g, "")

                annotations += `
                <li class="annotation active ${title} ${text} ">
                <ul class="list-annotations">
            <li id=${annotation.id} class="annotation-prev">
            <i class="fas fa-times close-annotation"></i>
            <div class="annotation-prev_text"><h3  class="annotation-prev-title">${annotation.title}</h3>
                    <p class="annotation-prev-description">${annotation.text}</p></div>
                    
            </li>
            <li id=${annotation.id} class="annotation-img">
                    <i class="fas fa-times close-annotation-img"></i>
                    <figure class="annotation-img_figure">
                    <img class="image-result" src=${annotation.img} />
                    <figcaption class="annotation-img-title">${annotation.title}
                    </figcaption>
                    </figure>
                    <p class="annotation-img-description">${annotation.text}</p>
                </li></ul></li>
        `;
            }
        })
        if (annotations === "") {
            annotations = `<div class="no-note">
                <h3>Nenhuma Nota</h3>
            </div>`;
        }
        this.items.innerHTML = annotations;
        this.removeAnnotation();
        this.renderItem();
    };

    removeAnnotation() {
        if (this.addAnnotation.classList.contains('active')) {
            const firstLis = document.querySelectorAll('.annotation-prev');
            const activeDayElem = document.querySelector(".day.active");
            const annotations = this.annotationArr;
            const containerAnnotation = this.items;
            const id = this.users[0].id;


            firstLis.forEach((item) => {
                const delet = item.querySelector(".close-annotation")
                delet.addEventListener("click", function () {
                    const text = item.querySelector(".annotation-prev_text .annotation-prev-description").textContent
                    const titulo = item.querySelector(".annotation-prev_text .annotation-prev-title").textContent;
                    fetch(`https://server-agenda.vercel.app/user/${id}/notes/${encodeURIComponent(titulo)}/${encodeURIComponent(text)}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log("data:", data);
                            let index = annotations.findIndex(item => item.title === titulo, item.text === text);
                            if (index !== -1) {
                                annotations.splice(index, 1);
                                console.log("Item removido do array com sucesso!");

                            }
                        })
                        .catch(error => {
                            console.error('Erro ao excluir anotação', error);
                        });

                    const titleRemove = titulo.replace(/[!@#$%^&*()_+\-={}\[\]|\\;:'"<>,.?/]/g, "").replace(/\s+/g, '').replace(/\d+/g, "")
                    const textRemove = text.replace(/[!@#$%^&*()_+\-={}\[\]|\\;:'"<>,.?/]/g, "").replace(/\s+/g, '').slice(0, 30).replace(/\d+/g, "")

                    const itemRemove = document.querySelector(`.annotation.active.${titleRemove}.${textRemove}`)

                    console.log(itemRemove)
                    if (itemRemove) {
                        itemRemove.classList.remove("active")

                        if (annotations.length == 1) {
                            console.log(item);
                            containerAnnotation.innerHTML = `<div class="no-note">
                            <h3>Nenhuma Nota</h3>
                        </div>`;
                            if (activeDayElem.classList.contains("annotation-active")) {
                                activeDayElem.classList.remove("annotation-active")
                            }
                        }
                    }


                    for (let i = 0; i < annotations.length; i++) {
                        if (annotations[i].id === id) {
                            annotations.splice(i, 1);
                            break;
                        }
                    }
                    if (annotations.length === 0) {
                        activeDayElem.classList.remove("annotation-active")
                    }
                });
            });
        }

    }

    renderItem() {
        if (this.addAnnotation.classList.contains('active')) {
            const firstLis = document.querySelectorAll('.annotation-prev');
            const secondLis = document.querySelectorAll('.annotation-img');

            firstLis.forEach((item) => {
                const text = item.querySelector(".annotation-prev_text");
                text.addEventListener("click", function () {
                    const id_clicado = item.getAttribute("id");

                    secondLis.forEach((annotationImg) => {
                        const annotationImgId = annotationImg.getAttribute("id");
                        if (annotationImgId === id_clicado) {
                            annotationImg.classList.add("active");
                            console.log(id_clicado)
                        } else {
                            annotationImg.classList.remove("active");
                        }
                    });

                    const annotationImg = item.nextElementSibling;
                    if (annotationImg && annotationImg.classList.contains("active")) {
                        const button = annotationImg.querySelector(".close-annotation-img")
                        button.addEventListener("click", () => {
                            annotationImg.classList.remove("active");
                        })
                    }
                });
            });
        }
    }

    renderPage() {
        // Recuperar o valor do estado do item do localStorage
        let ativo = JSON.parse(localStorage.getItem('ativo'));

        if (ativo) {
            this.addReminder.classList.remove("active");
            this.addAnnotation.classList.add("active");
        } else {
            this.addAnnotation.classList.remove("active");
            this.addReminder.classList.add("active");
        }
    }

    annotationEventBnt() {
        // Recuperar o valor do estado do item do localStorage
        let ativo = JSON.parse(localStorage.getItem('ativo'));

        if (this.addReminder.classList.contains("active")) {
            this.addReminder.classList.remove("active");
            this.addAnnotation.classList.add("active");
            ativo = true; // Atualizar o valor do estado do item
        } else {
            ativo = false; // Atualizar o valor do estado do item
        }

        // Armazenar o novo valor do estado do item no localStorage
        localStorage.setItem('ativo', JSON.stringify(ativo));

        this.renderListItems(this.activeDay);
        this.renderItem();
        this.removeAnnotation();
    }

    annotationReminderBnt() {
        // Recuperar o valor do estado do item do localStorage
        let ativo = JSON.parse(localStorage.getItem('ativo'));

        if (this.addAnnotation.classList.contains("active")) {
            this.addAnnotation.classList.remove("active");
            this.addReminder.classList.add("active");
            ativo = false; // Atualizar o valor do estado do item
        } else {
            ativo = true; // Atualizar o valor do estado do item
        }

        // Armazenar o novo valor do estado do item no localStorage
        localStorage.setItem('ativo', JSON.stringify(ativo));

        this.removeEvent();
    }

}
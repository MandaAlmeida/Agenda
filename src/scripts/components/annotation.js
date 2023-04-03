export class Annotation {
    constructor() {
        this.annotationArr = [];
        this.selectors();
        this.events();
        this.getEvents();
    }

    selectors() {
        this.inputTitle = document.querySelector(".form-title");
        this.inputDescription = document.querySelector(".form-description");
        this.createAnnotationBnt = document.querySelector(".create-annotations-bnt");
        this.reminderBnt = document.querySelector(".reminder-bnt");
        this.annotationBnt = document.querySelector(".annotation-bnt");
        this.items = document.querySelector(".annotations");
        this.addAnnotationBtn = document.querySelector(".add-annotation-bnt");
        this.addAnnotationContainer = document.querySelector(".create-annotations");
        this.addAnnotationCloseBtn = document.querySelector(".close-annotation");
        this.annotationBntEvent = document.querySelector(".annotation-bnt");
    }

    events() {
        this.annotationBntEvent.addEventListener("click", this.renderListItems.bind(this))
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
        this.createAnnotationBnt.addEventListener("click", this.createAnnotationBntF.bind(this))
    }


    createAnnotationBntF() {
        const itemTitle = this.inputTitle.value,
            itemDescription = this.inputDescription.value;

        if (itemTitle && itemDescription != "") {
            const item = {
                title: itemTitle,
                description: itemDescription,
            };
            this.annotationArr.push(item);

            this.inputTitle.value = "";
            this.inputDescription.value = "";

        }

        this.renderListItems();
    };

    renderListItems() {
        let annotations = "";

        this.annotationArr.forEach((annotation) => {
            annotations += `
            <li class="annotation">
                <h3  class="annotation-title">${annotation.title}</h3>
                <p class="annotation-description">${annotation.description}</p>
            </li>
        `;
        }),
            this.items.innerHTML = annotations;

        this.saveEvents()

    };

    saveEvents() {
        localStorage.setItem("annotation", JSON.stringify(this.annotationArr));
    };

    getEvents() {
        if (localStorage.getItem("annotation" === null)) {
            return;
        }
        this.annotationArr.push(...JSON.parse(localStorage.getItem("annotation")))
    }
}
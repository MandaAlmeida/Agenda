export class Annotation {
    constructor() {
        this.annotationArr = [];
        this.selectors();
        this.events();
    }

    selectors() {
        this.inputTitle = document.querySelector(".form-title"),
            this.inputDescription = document.querySelector(".form-description"),
            this.createAnnotationBnt = document.querySelector(".create-annotations-bnt"),
            this.reminderBnt = document.querySelector(".reminder-bnt"),
            this.annotationBnt = document.querySelector(".annotation-bnt"),
            this.items = document.querySelector(".annotations"),
            this.addAnnotationBtn = document.querySelector(".add-annotation-bnt"),
            this.addAnnotationContainer = document.querySelector(".create-annotations"),
            this.addAnnotationCloseBtn = document.querySelector(".close-annotation")
    }

    events() {

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

        this.annotationArr.forEach((item) => {
            annotations += `
            <li class="annotation">
                <h3  class="annotation-title">${item.title}</h3>
                <p class="annotation-description">${item.description}</p>
            </li>
        `;
        }),
            this.items.innerHTML = annotations;

    };
}
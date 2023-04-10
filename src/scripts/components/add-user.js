export class AddUser {
    constructor() {
        this.request = new XMLHttpRequest();
        this.selectors();
        this.event();
    }

    selectors() {
        this.addName = document.querySelector(".name_register");
        this.addEmail = document.querySelector(".email_register");
        this.addPassword = document.querySelector(".password_register");
        this.confirmePassword = document.querySelector(".password_register-confirmation")
        this.addUserBtn = document.querySelector(".button_register");
        this.error = document.querySelector(".error")
    }

    event() {
        this.addUserBtn.addEventListener("click", this.CreateUser.bind(this))
    }

    CreateUser() {
        const name = this.addName.value;
        const email = this.addEmail.value;
        const password = this.addPassword.value;
        const confirme = this.confirmePassword.value;

        if (name === "" || email === "" || password === "") {
            alert(" Por favor, preencha todos os campos");
            return;
        } else {
            console.log(name, email, password);
        }

        if (password != confirme) {
            this.error.classList.add("active")
        } else {
            this.error.classList.remove("active")
        }

        const newUser = {
            name: name,
            email: email,
            password: password
        }

        fetch('https://server-agenda.vercel.app/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => {
                this.addName.value = "";
                this.addEmail.value = "";
                this.addPassword.value = "";
                console.log(data);
                window.location.replace('index.html');
            })
            .catch(error => {
                console.error('Erro ao criar usuário:', error);
            });


    }
}
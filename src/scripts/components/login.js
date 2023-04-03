export class Login {
    constructor() {
        this.selectors();
        this.event();
    }

    selectors() {
        this.addEmail = document.querySelector(".email_login");
        this.addPassword = document.querySelector(".password_login");
        this.addUserBtn = document.querySelector(".button-login");
    }

    event() {
        this.addUserBtn.addEventListener("click", this.CreateUser.bind(this))
    }

    CreateUser() {
        const email = this.addEmail.value;
        const password = this.addPassword.value;

        if (email === "" || password === "") {
            alert(" Por favor, preencha todos os campos");
            return;
        }

        const user = {
            email: email,
            password: password
        }

        fetch(`https://server-agenda.vercel.app/login-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    // armazenar o token JWT no localStorage
                    localStorage.setItem('token', data.token);

                    this.addEmail.value = "";
                    this.addPassword.value = "";
                    window.location.replace('calendar.html');
                } else {
                    console.log('Usuário não encontrado!');
                    alert('E-mail ou senha incorretos!');
                } if (data.users) {
                    localStorage.setItem('user', JSON.stringify(data.users));
                    console.log("usuario encontrado", data.user)
                }
            })
            .catch(error => {
                console.error('Erro ao buscar usuário:', error);
            });

    }

    // função para enviar solicitações fetch com o token JWT
    fetchWithToken(url, options) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado!');
        }

        const authHeader = `Bearer ${token}`;
        const headers = {
            ...options.headers,
            Authorization: authHeader,
        };

        return fetch(url, { ...options, headers });
    }

    // exemplo de como usar a função fetchWithToken
    async getEvents() {
        const response = await this.fetchWithToken('https://server-agenda.vercel.app/events');
        const data = await response.json();
        console.log(data);
    }
}

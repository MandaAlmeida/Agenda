import { Calendar } from "./components/calendar";
import { AddUser } from "./components/add-user";
import { Login } from "./components/login";

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById("calendar")) {
        new Calendar();
    }
    if (document.getElementById("register")) {
        new AddUser();
    }
    if (document.getElementById("login")) {
        new Login();
    }

});

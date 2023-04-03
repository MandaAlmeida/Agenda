import { Calendar } from "./components/calendar";
import { Annotation } from "./components/Annotation";
import { AddUser } from "./components/add-user";
import { Login } from "./components/login";

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById("calendar")) {
        new Calendar();
        new Annotation();
    }
    if (document.getElementById("register")) {
        new AddUser();
    }
    if (document.getElementById("login")) {
        new Login();
    }

});

!function i(a,o,r){function s(e,t){if(!o[e]){if(!a[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(c)return c(e,!0);throw(t=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",t}n=o[e]={exports:{}},a[e][0].call(n.exports,function(t){return s(a[e][1][t]||t)},n,n.exports,i,a,o,r)}return o[e].exports}for(var c="function"==typeof require&&require,t=0;t<r.length;t++)s(r[t]);return s}({1:[function(t,e,n){"use strict";var i=t("./components/Calendar"),a=t("./components/Annotation");document.addEventListener("DOMContentLoaded",function(){new i.Calendar,new a.Annotation})},{"./components/Annotation":2,"./components/Calendar":3}],2:[function(t,e,n){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==a(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===a(t)?t:String(t)}(i.key),i)}}Object.defineProperty(n,"__esModule",{value:!0}),n.Annotation=void 0;var i=function(){function t(){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function");this.annotationArr=[],this.selectors(),this.events()}var e,n,i;return e=t,(n=[{key:"selectors",value:function(){this.inputTitle=document.querySelector(".form-title"),this.inputDescription=document.querySelector(".form-description"),this.createAnnotationBnt=document.querySelector(".create-annotations-bnt"),this.reminderBnt=document.querySelector(".reminder-bnt"),this.annotationBnt=document.querySelector(".annotation-bnt"),this.items=document.querySelector(".annotations"),this.addAnnotationBtn=document.querySelector(".add-annotation-bnt"),this.addAnnotationContainer=document.querySelector(".create-annotations"),this.addAnnotationCloseBtn=document.querySelector(".close-annotation")}},{key:"events",value:function(){var e=this;this.addAnnotationBtn.addEventListener("click",function(){e.addAnnotationContainer.classList.toggle("active")}),this.addAnnotationCloseBtn.addEventListener("click",function(){e.addAnnotationContainer.classList.remove("active")}),document.addEventListener("click",function(t){t.target!=!e.addAnnotationBtn||e.addAnnotationContainer.contains(t.target)||e.addAnnotationContainer.classList.remove("active")}),this.createAnnotationBnt.addEventListener("click",this.createAnnotationBntF.bind(this))}},{key:"createAnnotationBntF",value:function(){var t=this.inputTitle.value,e=this.inputDescription.value;t&&""!=e&&(this.annotationArr.push({title:t,description:e}),this.inputTitle.value="",this.inputDescription.value=""),this.renderListItems()}},{key:"renderListItems",value:function(){var e="";this.annotationArr.forEach(function(t){e+='\n            <li class="annotation">\n                <h3  class="annotation-title">'.concat(t.title,'</h3>\n                <p class="annotation-description">').concat(t.description,"</p>\n            </li>\n        ")}),this.items.innerHTML=e}}])&&o(e.prototype,n),i&&o(e,i),Object.defineProperty(e,"prototype",{writable:!1}),t}();n.Annotation=i},{}],3:[function(t,e,n){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t){return function(t){if(Array.isArray(t))return i(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){var n;if(t)return"string"==typeof t?i(t,e):"Map"===(n="Object"===(n=Object.prototype.toString.call(t).slice(8,-1))&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==a(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===a(t)?t:String(t)}(i.key),i)}}Object.defineProperty(n,"__esModule",{value:!0}),n.Calendar=void 0;var s=function(){function t(){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function");this.today=new Date,this.activeDay,this.month=this.today.getMonth(),this.year=this.today.getFullYear(),this.months=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],this.eventsArr=[],this.selectors(),this.events(),this.initCalendar(),this.getEvents()}var e,n,i;return e=t,(n=[{key:"selectors",value:function(){this.calendar=document.querySelector(".calendar"),this.date=document.querySelector(".date"),this.daysContainer=document.querySelector(".days"),this.prev=document.querySelector(".prev"),this.next=document.querySelector(".next"),this.todayBtn=document.querySelector(".today-btn"),this.goBtn=document.querySelector(".go-btn"),this.eventDay=document.querySelector(".event-day"),this.eventDate=document.querySelector(".event-date"),this.dateInput=document.querySelector(".date-input"),this.addEventSubmit=document.querySelector(".add-event-button"),this.addEventBtn=document.querySelector(".add-event"),this.addEventContainer=document.querySelector(".add-event-wrapper"),this.addEventCloseBtn=document.querySelector(".close"),this.addEventTitle=document.querySelector(".event-name"),this.addEventFrom=document.querySelector(".event-time-from"),this.addEventTo=document.querySelector(".event-time-to"),this.eventsContainer=document.querySelector(".events"),this.day=document.querySelectorAll(".day"),this.error=document.querySelector(".alert"),this.addAnnotation=document.querySelector(".annotation-container"),this.addReminder=document.querySelector(".reminder-container"),this.reminderBntEvent=document.querySelector(".reminder-bnt"),this.annotationBntEvent=document.querySelector(".annotation-bnt")}},{key:"events",value:function(){var e=this;this.prev.addEventListener("click",this.prevMonth.bind(this)),this.next.addEventListener("click",this.nextMonth.bind(this)),this.todayBtn.addEventListener("click",this.todayBtnF.bind(this)),this.dateInput.addEventListener("input",this.dateInputF.bind(this)),this.goBtn.addEventListener("click",this.goDate.bind(this)),this.addEventTitle.addEventListener("input",this.addEventTitleF.bind(this)),this.addEventFrom.addEventListener("input",this.addEventFromF.bind(this)),this.addEventTo.addEventListener("input",this.addEventToF.bind(this)),this.addEventSubmit.addEventListener("click",this.addEventSubmitF.bind(this)),this.eventsContainer.addEventListener("click",this.eventsContainerF.bind(this)),this.annotationBntEvent.addEventListener("click",this.annotationBnt.bind(this)),this.reminderBntEvent.addEventListener("click",this.reminderBnt.bind(this)),this.addEventBtn.addEventListener("click",function(){e.addEventContainer.classList.toggle("active")}),this.addEventCloseBtn.addEventListener("click",function(){console.log(e.addEventCloseBtn),e.addEventContainer.classList.remove("active")}),document.addEventListener("click",function(t){t.target!=!e.addEventBtn||e.addEventContainer.contains(t.target)||e.addEventContainer.classList.remove("active")})}},{key:"initCalendar",value:function(){for(var i=this,t=new Date(this.year,this.month,1),e=new Date(this.year,this.month+1,0),n=new Date(this.year,this.month,0).getDate(),a=e.getDate(),t=t.getDay(),o=7-e.getDay()-1,r=(this.date.innerHTML="".concat(this.months[this.month]," ").concat(this.year),""),s=t;0<s;s--)r+='<div class="day prev-date" >'.concat(n-s+1,"</div>");for(var c=1;c<=a;c++)!function(e){var n=!1;i.eventsArr.forEach(function(t){t.day==e&&t.month==i.month+1&&t.year==i.year&&(n=!0)}),e==(new Date).getDate()&&i.year==(new Date).getFullYear()&&i.month==(new Date).getMonth()?(i.activeDay=e,i.getActiveDay(e),i.updateEvents(e),r+=(n?'<div class="day today active event" >':'<div class="day today active" >').concat(e,"</div>")):r+=(n?'<div class="day event" >':'<div class="day " >').concat(e,"</div>")}(c);for(var d=1;d<=o;d++)r+='<div class="day next-date" >'.concat(d,"</div>");this.daysContainer.innerHTML=r,this.addListener()}},{key:"prevMonth",value:function(){this.month--,this.month<0&&(this.month=11,this.year--),this.initCalendar()}},{key:"nextMonth",value:function(){this.month++,11<this.month&&(this.month=0,this.year++),this.initCalendar()}},{key:"goDate",value:function(){var t=this.dateInput.value.split("/");2==t.length&&0<t[0]&&t[0]<13&&4==t[1].length?(this.month=t[0]-1,this.year=t[1],this.initCalendar()):alert("data invalida")}},{key:"addEventTitleF",value:function(t){this.addEventTitle.value=this.addEventTitle.value.slice(0,50)}},{key:"addEventFromF",value:function(t){this.addEventFrom.value=this.addEventFrom.value.replace(/[^0-9:]/g,""),2===this.addEventFrom.value.length&&(this.addEventFrom.value+=":"),5<this.addEventFrom.value.length&&(this.addEventFrom.value=this.addEventFrom.value.slice(0,5))}},{key:"addEventToF",value:function(){this.addEventTo.value=this.addEventTo.value.replace(/[^0-9:]/g,""),2==this.addEventTo.value.length&&(this.addEventTo.value+=":"),5<this.addEventTo.value.length&&(this.addEventTo.value=this.addEventTo.value.slice(0,5))}},{key:"todayBtnF",value:function(){this.today=new Date,this.month=this.today.getMonth(),this.year=this.today.getFullYear(),this.initCalendar()}},{key:"dateInputF",value:function(t){this.dateInput.value=this.dateInput.value.replace(/[^0-9/]/g,""),2==this.dateInput.value.length&&(this.dateInput.value+="/"),7<this.dateInput.value.length&&(this.dateInput.value=this.dateInput.value.slice(0,7)),t.inputType="deleteContentBackward",3==this.dateInput.value.length&&(this.dateInput.value=this.dateInput.value.slice(0,2))}},{key:"addListener",value:function(){var n=this,i=document.querySelectorAll(".day");i.forEach(function(t){t.addEventListener("click",function(e){n.activeDay=Number(e.target.innerHTML),n.getActiveDay(e.target.innerHTML),n.updateEvents(e.target.innerHTML),i.forEach(function(t){t.classList.remove("active")}),e.target.classList.contains("prev-date")?(n.prevMonth(),setTimeout(function(){document.querySelector(".day").forEach(function(t){t.classList.contains("prev-date")||t.innerHTML!=e.target.innerHTML||t.classList.add("active")})},100)):e.target.classList.contains("next-date")?(n.nextMonth(),setTimeout(function(){document.querySelector(".day").forEach(function(t){t.classList.contains("next-date")||t.innerHTML!=e.target.innerHTML||t.classList.add("active")})},100)):e.target.classList.add("active")})})}},{key:"getActiveDay",value:function(t){var e=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"][new Date(this.year,this.month,t).getDay()];this.eventDay.innerHTML=e,this.eventDate.innerHTML="".concat(t," de ").concat(this.months[this.month]," de ").concat(this.year)}},{key:"updateEvents",value:function(e){var n=this,i="";this.eventsArr.forEach(function(t){e==t.day&&n.month+1==t.month&&n.year==t.year&&t.events.forEach(function(t){i+='\n                    <div class="event">\n                    <div class="title">\n                    <i class="fas fa-circle"></i>\n                    <h3 class="event-title">'.concat(t.title,'</h3></div>\n                    <div class="event-time">\n                    <span>').concat(t.time,"</span>\n                    </div>\n                    </div>")})}),""===i&&(i=' <div class="no-event">\n            <h3>Nenhum Evento</h3></div>'),this.eventsContainer.innerHTML=i,this.saveEvents()}},{key:"addEventSubmitF",value:function(){var t,e,n,i,a=this,o=document.querySelector(".day.active"),r=this.addEventTitle.value,s=this.addEventFrom.value,c=this.addEventTo.value;""===r||""===s||""===c?alert(" Por favor, preencha todos os campos"):(t=s.split(":"),e=c.split(":"),(2!==t.length||2!==e.length||23<t[0]||59<t[1]||23<e[0]||59<e[1])&&alert("Hora Inválida"),t=this.convertTime(s),e=this.convertTime(c),n={title:r,time:"".concat(t," - ").concat(e)},i=!1,0<this.eventsArr.length&&this.eventsArr.forEach(function(t){t.day===a.activeDay&&t.month===a.month+1&&t.year===a.year&&(t.events.push(n),i=!0)}),i||this.eventsArr.push({day:this.activeDay,month:this.month+1,year:this.year,events:[n]}),this.addEventContainer.classList.remove("active"),this.addEventTitle.value="",this.addEventFrom.value="",this.addEventTo.value="",this.updateEvents(this.activeDay),o.classList.contains("event")||o.classList.add("event"))}},{key:"convertTime",value:function(t){var e=t.split(":"),n=e[0],e=e[1];"".concat(n,":").concat(e);return t}},{key:"eventsContainerF",value:function(t){var i,e=this,a=document.querySelector(".day.active");t.target.classList.contains("event")&&(i=t.target.children[0].children[1].innerHTML,this.eventsArr.forEach(function(n){n.day===e.activeDay&&n.month===e.month+1&&n.year===e.year&&(n.events.forEach(function(t,e){t.title===i&&n.events.splice(e,1)}),0===n.events.length)&&(e.eventsArr.splice(e.eventsArr.indexOf(n),1),a.classList.contains("event"))&&a.classList.remove("event")}),this.updateEvents(this.activeDay))}},{key:"saveEvents",value:function(){localStorage.setItem("events",JSON.stringify(this.eventsArr))}},{key:"getEvents",value:function(){var t;localStorage.getItem(!1)||(t=this.eventsArr).push.apply(t,o(JSON.parse(localStorage.getItem("events"))))}},{key:"annotationBnt",value:function(){this.addReminder.classList.contains("active")&&(this.addReminder.classList.remove("active"),this.addAnnotation.classList.add("active"))}},{key:"reminderBnt",value:function(){this.addAnnotation.classList.contains("active")&&(this.addAnnotation.classList.remove("active"),this.addReminder.classList.add("active"))}}])&&r(e.prototype,n),i&&r(e,i),Object.defineProperty(e,"prototype",{writable:!1}),t}();n.Calendar=s},{}]},{},[1]);
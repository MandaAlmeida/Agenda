!function r(a,o,u){function c(t,e){if(!o[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(i)return i(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=o[t]={exports:{}},a[t][0].call(n.exports,function(e){return c(a[t][1][e]||e)},n,n.exports,r,a,o,u)}return o[t].exports}for(var i="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,t,n){"use strict";document.querySelector(".calendar");var l=document.querySelector(".date"),d=document.querySelector(".days"),r=document.querySelector(".prev"),a=document.querySelector(".next"),o=document.querySelector(".today-btn"),u=document.querySelector(".go-btn"),c=document.querySelector(".date-input"),i=new Date,v=i.getMonth(),f=i.getFullYear(),s=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];function g(){for(var e=new Date(f,v,1),t=new Date(f,v+1,0),n=new Date(f,v,0).getDate(),r=t.getDate(),e=e.getDay(),a=7-t.getDay()-1,o=(l.innerHTML=s[v]+" "+f,""),u=e;0<u;u--)o+='<div class="day prev-date" >'.concat(n-u+1,"</div>");for(var c=1;c<=r;c++)c==(new Date).getDate()&&f==(new Date).getFullYear()&&v==(new Date).getMonth()?o+='<div class="day today" >'.concat(c,"</div>"):o+='<div class="day" >'.concat(c,"</div>");for(var i=1;i<=a;i++)o+='<div class="day next-date" >'.concat(i,"</div>");d.innerHTML=o}g(),r.addEventListener("click",function(){--v<0&&(v=11,f--),g()}),a.addEventListener("click",function(){11<++v&&(v=0,f++),g()}),o.addEventListener("click",function(){i=new Date,v=i.getMonth(),f=i.getFullYear(),g()}),c.addEventListener("input",function(e){c.value=c.value.replace(/[^0-9/]/g,""),2==c.value.length&&(c.value+="/"),7<c.value.length&&(c.value=c.value.slice(0,7)),e.inputType=" deleteContentBackward ",3==c.value.length&&(c.value=c.value.slice(0,2))}),u.addEventListener("click",function(){var e=c.value.split("/");if(2==e.length&&0<e[0]&&e[0]<13&&4==e[1].length)return v=e[0]-1,f=e[1],void g();alert("data invalida")})},{}]},{},[1]);
"use strict";doc_ready(function(){match_height(".mh");function e(){for(t.getHours()<12?id("greetings").innerHTML="Morning":12<=t.getHours()&&t.getHours()<18?id("greetings").innerHTML="Afternoon":id("greetings").innerHTML="Evening",id("time").innerHTML="".concat(i,":").concat(a," ").concat(o),add_att(id("time"),"datetime","".concat(t.getHours(),":").concat(t.getMinutes())),n=0;n<s.length;n++)id("date").innerHTML="".concat(s[t.getMonth()]," ").concat(l,", ").concat(t.getFullYear());add_att(id("date"),"datetime","".concat(t.getFullYear(),"-").concat(c,"-").concat(l))}var n,t=new Date,d=t.getHours()%12?t.getHours()%12:12,i=d<10?"0".concat(d):d,a=t.getMinutes()<10?"0".concat(t.getMinutes()):t.getMinutes(),o=12<=t.getHours()?"PM":"AM",s=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"],c=t.getMonth()<10?"0".concat(t.getMonth()+1):t.getMonth()+1,l=t.getDate()<10?"0".concat(t.getDate()):t.getDate(),u=[],r=["Every morning is a beautiful morning.","Shine like the afternoon sun and let people be inspired for all the great things you do.","Evenings are life's way of saying that you are closer to your dreams."];add_event(window,"load",function(){(6<=t.getHours()&&t.getHours()<18?add_class:remove_class)(document.documentElement,"light"),e(),setInterval(e,1e3),id("name").focus()}),add_event(id("light"),"click",function(){toggle_class(document.documentElement,"light")}),add_event(window,"click",function(e){(e.target.id||e.srcElement.id)!=id("name")&&has_class(id("modal"),"show")&&id("name").focus()}),add_event(id("name"),"keyup",function(){id("user").innerHTML=inner(id("name").value.substring(0,1).toUpperCase()+id("name").value.substring(1).toLowerCase()),0!=id("name").value.length?id("submit").disabled=!1:id("submit").disabled=!0});function g(){toggle_class(id("modal"),"show"),toggle_class(document.body,"modal-open")}add_event(id("name"),"keypress",function(e){13==(e.which||e.keyCode)&&0!=id("name").value.length&&g()}),add_event(id("submit"),"click",function(){g()}),add_event(id("change"),"click",function(){g(),setTimeout(function(){id("name").focus()},500)});function h(){u.push(id("add-to-do").value.substring(0,1).toUpperCase()+id("add-to-do").value.substring(1).toLowerCase()),id("add-to-do").value="";var e=create_el("li"),t=create_el("i");id("to-do-list").appendChild(e),e.innerHTML=inner(u[u.length-1]),add_class(t,"fas"),add_class(t,"fa-minus-circle"),t.style.float="right",e.appendChild(t),add_event(e,"click",function(){toggle_class(e,"done")}),add_event(t,"click",function(){e.style.display="none"})}add_events(id("add-to-do"),"keypress",function(e){13==(e.which||e.keyCode)&&0!=id("add-to-do").value.length&&h()}),add_event(id("add-to-do-btn"),"click",function(){0!=id("add-to-do").value.length&&h()});!function(){for(n=0;n<r.length;n++)!function(){var e=create_el("p"),t=create_el("i");add_class(e,"mb-05"),id("added-quotes-wrap").appendChild(e),e.innerHTML=inner(r[n]),t.id=r.indexOf(r[n]),add_class(t,"fas"),add_class(t,"fa-minus-circle"),t.style.cursor="pointer",t.style.float="right",e.appendChild(t),add_event(t,"click",function(){r.splice(this.id,1,""),e.style.display="none"})}()}();function f(){r.push(id("add-quote").value.substring(0,1).toUpperCase()+id("add-quote").value.substring(1).toLowerCase()),id("add-quote").value="";var e=create_el("p"),t=create_el("i");for(add_class(e,"mb-05"),id("added-quotes-wrap").appendChild(e),e.innerHTML=inner(r[r.length-1]),n=0;n<r.length;n++)t.id=r.indexOf(r[n]);add_class(t,"fas"),add_class(t,"fa-minus-circle"),t.style.cursor="pointer",t.style.float="right",e.appendChild(t),add_event(t,"click",function(){r.splice(this.id,1,""),e.style.display="none"})}function m(){var e=r.filter(function(e){return""!=e});id("quotes").innerHTML=inner(e[Math.floor(Math.random()*e.length)])}m(),setInterval(m,3e3),add_event(id("add-quote"),"keypress",function(e){13==(e.which||e.keyCode)&&0!=id("add-quote").value.length&&f()}),add_event(id("add-quote-btn"),"click",function(){0!=id("add-quote").value.length&&f()})});
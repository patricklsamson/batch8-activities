"use strict";var i,today=new Date,twelveHours=today.getHours()%12?today.getHours()%12:12,hours=twelveHours<10?"0".concat(twelveHours):twelveHours,minutes=today.getMinutes()<10?"0".concat(today.getMinutes()):today.getMinutes(),ampm=12<=today.getHours()?"PM":"AM",months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"],monthsNum=today.getMonth()<10?"0".concat(today.getMonth()+1):today.getMonth()+1,date=today.getDate()<10?"0".concat(today.getDate()):today.getDate(),todo=[],quotes=["Every morning is a beautiful morning.","Shine like the afternoon sun and let people be inspired for all the great things you do.","Evenings are life's way of saying that you are closer to your dreams."],clock=function(){for(today.getHours()<12?id("greetings").innerHTML="Morning":12<=today.getHours()&&today.getHours()<18?id("greetings").innerHTML="Afternoon":id("greetings").innerHTML="Evening",id("time").innerHTML="".concat(hours,":").concat(minutes," ").concat(ampm),add_att(id("time"),"datetime","".concat(today.getHours(),":").concat(today.getMinutes())),i=0;i<months.length;i++)id("date").innerHTML="".concat(months[today.getMonth()]," ").concat(date,", ").concat(today.getFullYear());add_att(id("date"),"datetime","".concat(today.getFullYear(),"-").concat(monthsNum,"-").concat(date))},modalOpen=function(){toggle_class(id("modal"),"show"),toggle_class(document.body,"modal-open")},addedToDo=function(){todo.push(id("add-to-do").value.substring(0,1).toUpperCase()+id("add-to-do").value.substring(1).toLowerCase()),id("add-to-do").value="";var e=create_el("li"),t=create_el("i");e.innerHTML=inner(todo[todo.length-1]),add_class(t,"fas"),add_class(t,"fa-minus-circle"),t.style.float="right",id("to-do-list").appendChild(e),e.appendChild(t),add_event(e,"click",function(){toggle_class(e,"done")}),add_event(t,"click",function(){e.style.display="none"})},defaultQuotes=function(){for(i=0;i<quotes.length;i++)!function(){var e=create_el("p"),t=create_el("i");add_class(e,"mb-05"),e.innerHTML=inner(quotes[i]),t.id=quotes.indexOf(quotes[i]),add_class(t,"fas"),add_class(t,"fa-minus-circle"),t.style.cursor="pointer",t.style.float="right",id("added-quotes-wrap").appendChild(e),e.appendChild(t),add_event(t,"click",function(){quotes.splice(this.id,1,""),e.style.display="none"})}()},addedQuote=function(){quotes.push(id("add-quote").value.substring(0,1).toUpperCase()+id("add-quote").value.substring(1).toLowerCase()),id("add-quote").value="";var e=create_el("p"),t=create_el("i");for(add_class(e,"mb-05"),e.innerHTML=inner(quotes[quotes.length-1]),i=0;i<quotes.length;i++)t.id=quotes.indexOf(quotes[i]);add_class(t,"fas"),add_class(t,"fa-minus-circle"),t.style.cursor="pointer",t.style.float="right",id("added-quotes-wrap").appendChild(e),e.appendChild(t),add_event(t,"click",function(){quotes.splice(this.id,1,""),e.style.display="none"})},showQuotes=function(){var e=quotes.filter(function(e){return""!=e});id("quotes").innerHTML=inner(e[rand(e.length)]),console.log(e)};
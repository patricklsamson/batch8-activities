"use strict";doc_ready(function(){match_height(".mh"),add_event(window,"load",function(){(6<=today.getHours()&&today.getHours()<18?add_class:remove_class)(document.documentElement,"light"),clock(),setInterval(clock,1e3),id("name").focus()}),add_event(id("light"),"click",function(){toggle_class(document.documentElement,"light")}),add_event(window,"click",function(e){(e.target.id||e.srcElement.id)!=id("name")&&has_class(id("modal"),"show")&&id("name").focus()}),add_event(id("name"),"keyup",function(){id("user").innerHTML=inner(id("name").value.substring(0,1).toUpperCase()+id("name").value.substring(1).toLowerCase()),0!=id("name").value.length?id("submit").disabled=!1:id("submit").disabled=!0}),add_event(id("name"),"keypress",function(e){13==(e.which||e.keyCode)&&0!=id("name").value.length&&modalOpen()}),add_event(id("submit"),"click",function(){modalOpen()}),add_event(id("change"),"click",function(){modalOpen(),setTimeout(function(){id("name").focus()},500)}),add_events(id("add-to-do"),"keypress",function(e){13==(e.which||e.keyCode)&&0!=id("add-to-do").value.length&&addedToDo()}),add_event(id("add-to-do-btn"),"click",function(){0!=id("add-to-do").value.length&&addedToDo()}),defaultQuotes(),showQuotes(),setInterval(showQuotes,3e3),add_event(id("add-quote"),"keypress",function(e){13==(e.which||e.keyCode)&&0!=id("add-quote").value.length&&addedQuote()}),add_event(id("add-quote-btn"),"click",function(){0!=id("add-quote").value.length&&addedQuote()})});
"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}doc_ready(function(){function w(){add_class(id("tboard"),"o"),remove_class(id("tboard"),"x"),id("tooltip").innerHTML="Player O's turn."}function A(){add_class(id("tboard"),"x"),remove_class(id("tboard"),"o"),id("tooltip").innerHTML="Player X's turn."}function e(){q=!1,id("player").innerHTML="X",(q?w:A)()}var q,T,H=!1,M=[["","",""],["","",""],["","",""]],L=[],x=0,r=[],S=[],t=[];e();function a(){id("mark-checker").checked?(q=!0,id("player").innerHTML="O",id("mark-holder-wrap").querySelectorAll("p")[0].id="o",id("mark-holder-wrap").querySelectorAll("p")[1].id="x",id("mark-holder1").innerHTML="O",id("mark-holder2").innerHTML="X",w()):(q=!1,id("player").innerHTML="X",A())}add_event(id("mark-checker"),"click",a),add_event(id("proceed-btn"),"click",function(){add_class(id("modal"),"hide")});function C(){for(H=!0,remove_class(id("tboard"),"x"),remove_class(id("tboard"),"o"),add_class(id("prev-btn"),"show"),T=0;T<qsel_all(".box").length;T++)qsel_all(".box")[T].style.cursor="auto"}function O(e){if(!H){var r=e.target||e.srcElement,t=q?"o":"x",a=r.dataset.row||r.getAttribute("data-row"),o=r.dataset.col||r.getAttribute("data-col");M[a][o]=t,add_class(r,t),remove_class(r,"empty"),r.style.cursor="auto",((q=!q)?w:A)(),L[x]=[x,t,a,o,"p","strike"],x++;var n=function(){var e;switch(a+o){case"00":e="top leftmost";break;case"01":e="top middle";break;case"02":e="top rightmost";break;case"10":e="middle leftmost";break;case"11":e="middle";break;case"12":e="middle rightmost";break;case"20":e="bottom leftmost";break;case"21":e="bottom middle";break;case"22":e="bottom rightmost"}return e};console.log("Move ".concat(x,": Player ").concat(t.toUpperCase()," puts their mark on the ").concat(n()," box."));var l=create_el("p");id("history-wrap").appendChild(l),l.innerHTML="".concat(x," = ").concat(t.toUpperCase()," => ").concat(n()),S.push([t,a,o]);for(var i=function(e){var r=create_el("span");for(r.innerHTML="l",id(e).appendChild(r),T=4;T<id(e).querySelectorAll("span").length;T+=5)add_class(id(e).querySelectorAll("span")[T],"divide"),add_class(id(e).querySelectorAll("span")[T],"img"),add_class(id(e).querySelectorAll("span")[T],"con"),id(e).querySelectorAll("span")[T].innerHTML="-"},d=function(){9==S.length?(id("tooltip").innerHTML="It's a draw!",console.log("The players ended in a draw."),i("draw")):(id("tooltip").innerHTML="Player ".concat(t.toUpperCase()," wins!"),console.log("Player ".concat(t.toUpperCase()," is the winner!")),i(t))},c=0;c<M.length;c++){var s=M[c][0],p=M[c][1],h=M[c][2];if(s&&s===p&&p===h)return C(),void d()}for(var u=0;u<M.length;u++){var m=M[0][u],_=M[1][u],b=M[2][u];if(m&&m===_&&_===b)return C(),void d()}var y=M[0][0],v=M[2][2],f=M[0][2],k=M[2][0],g=M[1][1];(y&&y===v&&v===g||f&&f===k&&k==g)&&(C(),d()),9==S.length&&(C(),d())}remove_event(e.target||e.srcElement,"click",O)}qsel_all(".box").forEach(function(e){add_event(e,"click",O)});function o(){H=!1,M=[["","",""],["","",""],["","",""]],L=[],x=0,r=[],S=[],t=[],e(),a(),console.clear(),id("history-wrap").innerHTML="",qsel_all(".box").forEach(function(e){add_event(e,"click",O),add_class(e,"empty"),remove_class(e,"x"),remove_class(e,"o"),e.style.cursor="pointer"}),remove_class(id("prev-btn"),"show"),remove_class(id("next-btn"),"show")}add_event(id("reset-btn"),"click",o),add_event(id("newGame-btn"),"click",function(){o(),remove_class(id("modal"),"hide"),id("mark-checker").checked=!1,e(),id("mark-holder-wrap").querySelectorAll("p")[0].id="x",id("mark-holder-wrap").querySelectorAll("p")[1].id="o",id("mark-holder1").innerHTML="X",id("mark-holder2").innerHTML="O",id("x").innerHTML="<q id='mark-holder1'>X</q> =&nbsp;",id("o").innerHTML="<q id='mark-holder2'>O</q> =&nbsp;",id("draw").innerHTML="<q>Draws</q> =&nbsp;"}),add_event(id("prev-btn"),"click",function(){for(t.push.apply(t,_toConsumableArray(S.splice(S.length-1,1))),T=0;T<t.length;T++)remove_class(qsel('[data-row="'.concat(t[T][1],'"][data-col="').concat(t[T][2],'"]')),t[T][0]);for(t.length<S.length&&add_class(id("next-btn"),"show"),0==S.length&&remove_class(id("prev-btn"),"show"),r.push.apply(r,_toConsumableArray(L.splice(L.length-1,1))),T=0;T<r.length;T++)add_class(id("history-wrap").querySelectorAll(r[T][4])[r[T][0]],r[T][5])}),add_event(id("next-btn"),"click",function(){for(S.push.apply(S,_toConsumableArray(t.splice(t.length-1,1))),T=0;T<S.length;T++)add_class(qsel('[data-row="'.concat(S[T][1],'"][data-col="').concat(S[T][2],'"]')),S[T][0]);for(S.length<t.length&&add_class(id("prev-btn"),"show"),0==t.length&&remove_class(id("next-btn"),"show"),L.push.apply(L,_toConsumableArray(r.splice(r.length-1,1))),T=0;T<L.length;T++)remove_class(id("history-wrap").querySelectorAll(L[T][4])[L[T][0]],L[T][5])}),add_event(id("history"),"click",function(){toggle_class(id("board-wrap"),"hide")})});
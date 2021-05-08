"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var r=0,a=new Array(e.length);r<e.length;r++)a[r]=e[r];return a}}doc_ready(function(){function w(){add_class(id("tboard"),"o"),remove_class(id("tboard"),"x"),id("tooltip").innerHTML="Player O's turn."}function A(){add_class(id("tboard"),"x"),remove_class(id("tboard"),"o"),id("tooltip").innerHTML="Player X's turn."}function e(){q=!1,id("player").innerHTML="X",(q?w:A)()}var q,T,M=!1,H=[["","",""],["","",""],["","",""]],x=[],L=0,r=[],S=[],a=[];e();function t(){id("mark-checker").checked?(q=!0,id("player").innerHTML="O",id("mark-holder-wrap").querySelectorAll("p")[0].id="o",id("mark-holder-wrap").querySelectorAll("p")[1].id="x",id("mark-holder1").innerHTML="O",id("mark-holder2").innerHTML="X",w()):(q=!1,id("player").innerHTML="X",A())}add_event(id("mark-checker"),"click",t),add_event(id("proceed-btn"),"click",function(){add_class(id("modal"),"hide")});function C(){for(M=!0,remove_class(id("tboard"),"x"),remove_class(id("tboard"),"o"),add_class(id("prev-btn"),"show"),T=0;T<qsel_all(".box").length;T++)qsel_all(".box")[T].style.cursor="auto"}function O(e){if(!M){var r=e.target||e.srcElement,a=q?"o":"x",t=r.dataset.row||r.getAttribute("data-row"),o=r.dataset.col||r.getAttribute("data-col");H[t][o]=a,add_class(r,a),remove_class(r,"empty"),r.style.cursor="auto",((q=!q)?w:A)(),x[L]=[L,a,t,o,"p","strike"],L++;var n=function(){var e;switch(t+o){case"00":e="top leftmost";break;case"01":e="top middle";break;case"02":e="top rightmost";break;case"10":e="middle leftmost";break;case"11":e="middle";break;case"12":e="middle rightmost";break;case"20":e="bottom leftmost";break;case"21":e="bottom middle";break;case"22":e="bottom rightmost"}return e};console.log("Move ".concat(L,": Player ").concat(a.toUpperCase()," puts their mark on the ").concat(n()," box."));var l=create_el("p");id("history-wrap").appendChild(l),l.innerHTML="".concat(L," = ").concat(a.toUpperCase()," => ").concat(n()),S.push([a,t,o]);for(var i=function(r){setTimeout(function(){var e=create_el("span");for(e.innerHTML="l",id(r).appendChild(e),T=4;T<id(r).querySelectorAll("span").length;T+=5)add_class(id(r).querySelectorAll("span")[T-1],"five"),add_class(id(r).querySelectorAll("span")[T-1],"img"),add_class(id(r).querySelectorAll("span")[T-1],"con"),id(r).querySelectorAll("span")[T].innerHTML=" - "},250)},c=function(){9==S.length?(id("tooltip").innerHTML="It's a draw!",console.log("The players ended in a draw."),i("draw")):(id("tooltip").innerHTML="Player ".concat(a.toUpperCase()," wins!"),console.log("Player ".concat(a.toUpperCase()," is the winner!")),i(a))},d=0;d<H.length;d++){var s=H[d][0],p=H[d][1],h=H[d][2];if(s&&s===p&&p===h)return C(),void c()}for(var u=0;u<H.length;u++){var m=H[0][u],_=H[1][u],b=H[2][u];if(m&&m===_&&_===b)return C(),void c()}var y=H[0][0],v=H[2][2],f=H[0][2],g=H[2][0],k=H[1][1];(y&&y===v&&v===k||f&&f===g&&g==k)&&(C(),c()),9==S.length&&(C(),c())}remove_event(e.target||e.srcElement,"click",O)}qsel_all(".box").forEach(function(e){add_event(e,"click",O)});function o(){M=!1,H=[["","",""],["","",""],["","",""]],x=[],L=0,r=[],S=[],a=[],e(),t(),console.clear(),id("history-wrap").innerHTML="",qsel_all(".box").forEach(function(e){add_event(e,"click",O),add_class(e,"empty"),remove_class(e,"x"),remove_class(e,"o"),e.style.cursor="pointer"}),remove_class(id("prev-btn"),"show"),remove_class(id("next-btn"),"show")}add_event(id("reset-btn"),"click",o),add_event(id("newGame-btn"),"click",function(){o(),remove_class(id("modal"),"hide"),id("mark-checker").checked=!1,e(),id("mark-holder-wrap").querySelectorAll("p")[0].id="x",id("mark-holder-wrap").querySelectorAll("p")[1].id="o",id("mark-holder1").innerHTML="X",id("mark-holder2").innerHTML="O",id("x").innerHTML="<q id='mark-holder1'>X</q> =&nbsp;",id("o").innerHTML="<q id='mark-holder2'>O</q> =&nbsp;",id("draw").innerHTML="<q>Draws</q> =&nbsp;"});function n(e){var r;for(T=0;T<e.length;T++)r=e[T][0]+1;return r}function l(e){var r;for(T=0;T<e.length;T++)r=e[T][1];return r.toUpperCase()}add_event(id("prev-btn"),"click",function(){var e;for(r.push.apply(r,_toConsumableArray(x.splice(x.length-1,1))),T=0;T<r.length;T++)add_class(id("history-wrap").querySelectorAll(r[T][4])[r[T][0]],r[T][5]);for(has_class(id("prev-btn"),"show")&&(console.log("Move ".concat(n(r)," with mark ").concat(l(r)," was undone.")),(e=console).log.apply(e,_toConsumableArray(x))),a.push.apply(a,_toConsumableArray(S.splice(S.length-1,1))),T=0;T<a.length;T++)remove_class(qsel('[data-row="'.concat(a[T][1],'"][data-col="').concat(a[T][2],'"]')),a[T][0]);a.length<S.length&&add_class(id("next-btn"),"show"),0==S.length&&remove_class(id("prev-btn"),"show")}),add_event(id("next-btn"),"click",function(){var e;for(x.push.apply(x,_toConsumableArray(r.splice(r.length-1,1))),T=0;T<x.length;T++)remove_class(id("history-wrap").querySelectorAll(x[T][4])[x[T][0]],x[T][5]);for(has_class(id("next-btn"),"show")&&(console.log("Move ".concat(n(x)," with mark ").concat(l(x)," was redone.")),(e=console).log.apply(e,_toConsumableArray(x))),S.push.apply(S,_toConsumableArray(a.splice(a.length-1,1))),T=0;T<S.length;T++)add_class(qsel('[data-row="'.concat(S[T][1],'"][data-col="').concat(S[T][2],'"]')),S[T][0]);S.length<a.length&&add_class(id("prev-btn"),"show"),0==a.length&&remove_class(id("next-btn"),"show")}),add_event(id("history"),"click",function(){toggle_class(id("board-wrap"),"hide")})});
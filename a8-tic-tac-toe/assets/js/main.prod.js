"use strict";doc_ready(function(){function t(){(f=!1)?(add_class(id("tboard"),"o"),remove_class(id("tboard"),"x")):(add_class(id("tboard"),"x"),remove_class(id("tboard"),"o")),id("tooltip").innerHTML="X's turn."}var f,w=!1,x=[["","",""],["","",""],["","",""]],g=[],k=0;t();function H(){w=!0,remove_class(id("tboard"),"x"),remove_class(id("tboard"),"o"),add_class(id("prev-btn"),"show");for(var t=0;t<qsa(".box").length;t++)qsa(".box")[t].style.cursor="auto"}function L(t){if(!1===w){var e=t.target||t.srcElement,a=f?"o":"x",o=e.dataset.row||e.getAttribute("data-row"),s=e.dataset.col||e.getAttribute("data-col");x[o][s]=a,add_class(e,a),remove_class(e,"empty"),(f=!f)?(add_class(id("tboard"),"o"),remove_class(id("tboard"),"x"),id("tooltip").innerHTML="O's turn."):(add_class(id("tboard"),"x"),remove_class(id("tboard"),"o"),id("tooltip").innerHTML="X's turn."),g[k]=[k,a,e.dataset.row||e.getAttribute("data-row"),e.dataset.col||e.getAttribute("data-col")],k++;for(var r=0;r<x.length;r++){var d=x[r][0],n=x[r][1],i=x[r][2];if(d&&d===n&&n===i){H(),id("tooltip").innerHTML="".concat(a.toUpperCase()," is the winner.");break}}for(var c=0;c<x.length;c++){var l=x[0][c],v=x[1][c],_=x[2][c];if(l&&l===v&&v===_){H(),id("tooltip").innerHTML="".concat(a.toUpperCase()," is the winner.");break}}var b=x[0][0],p=x[2][2],u=x[0][2],h=x[2][0],m=x[1][1];(b&&b===p&&p===m||u&&u===h&&h==m)&&(H(),id("tooltip").innerHTML="".concat(a.toUpperCase()," is the winner.")),9==g.length&&(H(),id("tooltip").innerHTML="It's a Draw.")}remove_event(t,"click",L)}qsa(".box").forEach(function(t){add_event(t,"click",L)}),add_event(id("reset-btn"),"click",function(){w=!1,x=[["","",""],["","",""],["","",""]],g=[],k=0,t(),qsa(".box").forEach(function(t){add_event(t,"click",L),add_class(t,"empty"),remove_class(t,"x"),remove_class(t,"o"),t.style.cursor="pointer"}),remove_class(id("prev-btn"),"show"),remove_class(id("next-btn"),"show")}),add_event(id("prev-btn"),"click",function(){k===g.length&&k--,0<=k&&(add_class(id("next-btn"),"show"),remove_class(qs("[data-row='"+g[k][2]+"'][data-col='"+g[k][3]+"']"),g[k][1]),0===k?remove_class(id("prev-btn"),"show"):k--)}),add_event(id("next-btn"),"click",function(){k<0&&k++,k<g.length&&(add_class(id("prev-btn"),"show"),add_class(qs("[data-row='"+g[k][2]+"'][data-col='"+g[k][3]+"']"),g[k][1]),k===g.length-1?remove_class(id("next-btn"),"show"):k++)})});
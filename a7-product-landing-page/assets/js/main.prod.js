"use strict";docReady(function(){matchHeights(".mh"),matchHeights(".mh2"),matchHeights(".mh3"),body("index")&&(addEvent($$("signup-btn"),"click",function(){tClass(document.body,"modal-open"),rClass(document.body,"animate"),$$("name").value="",$$("email").value="",$$("password").value="",$$("confirm-pw").value="",$$("confirm-msg").style.display="none",$$("submit").disabled=!0}),addEvent($$("login-btn"),"click",function(){tClass(document.body,"modal-open"),rClass(document.body,"animate"),$$("log-email").value="",$$("log-password").value="",$$("reveal").checked&&($$("reveal").checked=!1),$$("remember").checked&&($$("remember").checked=!1)}),addEvent($$("password"),"keyup",function(){this.value==$$("confirm-pw").value&&0!=this.value.length?($$("submit").disabled=!1,$$("confirm-msg").style.display="initial",addAtt($$("confirm-msg"),"src","../assets/img/check.png")):this.value!=$$("confirm-pw").value&&1<=$$("confirm-pw").value.length?($$("submit").disabled=!0,$$("confirm-msg").style.display="initial",addAtt($$("confirm-msg"),"src","../assets/img/cross.png")):0==this.value.length&&($$("confirm-msg").style.display="none")}),addEvent($$("confirm-pw"),"keyup",function(){this.value==$$("password").value&&0!=this.value.length?($$("submit").disabled=!1,$$("confirm-msg").style.display="initial",addAtt($$("confirm-msg"),"src","../assets/img/check.png")):this.value!=$$("password").value&&1<=$$("password").value.length?($$("submit").disabled=!0,$$("confirm-msg").style.display="initial",addAtt($$("confirm-msg"),"src","../assets/img/cross.png")):0==this.value.length&&($$("confirm-msg").style.display="none")}),addEvent($$("reveal"),"click",function(){$$("reveal").checked?addAtt($$("log-password"),"type","text"):addAtt($$("log-password"),"type","password")})),body("body-login")&&addEvent(document.body,"click",function(e){e.target.closest("#header")&&$$("header").contains(e.target||e.srcElement)||($$("user").checked=!1)}),addEvent(window,"scroll",function(){body("body-login")&&(0<=window.pageYOffset||0<=document.documentElement.scrollTop)&&($$("user").checked=!1),(0<=window.pageYOffset||0<=document.documentElement.scrollTop)&&($$("nav-toggle").checked=!1),(document.body.scrollTop>=$$("header").offsetTop||document.documentElement.scrollTop>=$$("header").offsetTop)&&($s(".menu-container").style.marginTop="0")}),addEvent($$("nav-toggle"),"click",function(){(window.pageYOffset<=$$("header").offsetTop||document.documentElement.scrollTop<=$$("header").offsetTop)&&($s(".menu-container").style.marginTop="-"+$$("header").offsetHeight+"px")}),addEvent(document.body,"click",function(e){e.target.closest("#nav-bar")&&$$("nav-bar").contains(e.target||e.srcElement)||($$("nav-toggle").checked=!1),e.target.closest("#footer")&&$$("footer").contains(e.target||e.srcElement)||($$("about").checked=!1,$$("service").checked=!1,$$("triton").checked=!1,$$("helios").checked=!1)});for(var e=0;e<$a(".nav-link").length;e++)addEvent($a(".nav-link")[e],"click",function(){$$("nav-toggle").checked=!1});new caro({autoplay:{on:!0,interval:5e3}});addEvent($$("about-btn"),"click",function(){$$("service").checked=!1,$$("triton").checked=!1,$$("helios").checked=!1}),addEvent($$("service-btn"),"click",function(){$$("about").checked=!1,$$("triton").checked=!1,$$("helios").checked=!1}),addEvent($$("triton-btn"),"click",function(){$$("about").checked=!1,$$("service").checked=!1,$$("helios").checked=!1}),addEvent($$("helios-btn"),"click",function(){$$("about").checked=!1,$$("service").checked=!1,$$("triton").checked=!1})});
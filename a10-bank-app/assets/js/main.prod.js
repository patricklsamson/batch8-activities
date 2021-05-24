"use strict";function _defineProperties(e,a){for(var n=0;n<a.length;n++){var t=a[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,a,n){return a&&_defineProperties(e.prototype,a),n&&_defineProperties(e,n),e}function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}doc_ready(function(){function p(e,a,n,t,o,s,r,i,c,l){_classCallCheck(this,p),this.username=e,this.password=a,this.email=n,this.firstName=t,this.middleName=o,this.lastName=s,this.gender=r,this.accountNumber=i,this.accountType=c,this.balance=l,this.transactionHistory=[]}var f,g=function(){function h(){_classCallCheck(this,h)}return _createClass(h,null,[{key:"userStorage",value:function(){var e=null===localStorage.getItem("users")?[]:JSON.parse(localStorage.getItem("users"));return e}},{key:"addAdmin",value:function(e){var a=h.userStorage();a.push(e),localStorage.setItem("users",JSON.stringify(a))}},{key:"addUser",value:function(e){var a=h.userStorage();a.push(e),localStorage.setItem("users",JSON.stringify(a))}},{key:"signup_user",value:function(a,n,t,o,s,r,i,c){var e=h.userStorage(),l=e.findIndex(function(e){return e.firstName==a}),u=e.findIndex(function(e){return e.middleName==n}),d=e.findIndex(function(e){return e.lastName==t}),m=e.findIndex(function(e){return e.gender==o}),f=e.findIndex(function(e){return e.accountNumber==c}),p=e.findIndex(function(e){return e.username==s}),g=e.findIndex(function(e){return e.password==r}),v=e.findIndex(function(e){return e.email==i});null==e[l]||""==e[l]||null==e[u]||""==e[u]||null==e[d]||""==e[d]||null==e[m]||""==e[m]||null==e[f]||""==e[f]?alert("User not found!"):null==e[p]||""==e[p]||null==e[g]||""==e[g]||null==e[v]||""==e[v]?(toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),e[f].username=s,e[f].password=r,e[f].email=i):alert("You have already signed up!"),localStorage.setItem("users",JSON.stringify(e))}},{key:"time_stamp",value:function(){var e=new Date,a=e.getMonth()<10?"0".concat(e.getMonth()+1):e.getMonth()+1,n=e.getDate()<10?"0".concat(e.getDate()):e.getDate(),t="".concat(a,"/").concat(n,"/").concat(e.getFullYear()),o=e.getHours()<10?"0".concat(e.getHours()):e.getHours(),s=e.getMinutes()<10?"0".concat(e.getMinutes()):e.getMinutes(),r=e.getSeconds()<10?"0".concat(e.getSeconds()):e.getSeconds(),i="".concat(o,":").concat(s,":").concat(r);return"".concat(t," - ").concat(i)}},{key:"withdraw",value:function(a,e){var n,t,o=h.userStorage(),s=o.findIndex(function(e){return e.accountNumber==a});null==o[s]||""==o[s]?alert("User not found!"):parseFloat(o[s].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(n="male"==o[s].gender?"his":"her",o[s].balance=parseFloat(parseFloat(o[s].balance)-parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(o[s].balance)+parseFloat(e)).toFixed(2),o[s].transactionHistory.unshift("<em>".concat(h.time_stamp(),"</em> : Withdrawn an amount of <strong>₱").concat(e,"</strong> from <strong>").concat(o[s].firstName,"</strong>'s account. From a previous account balance of <strong>₱").concat(t,"</strong>, ").concat(n," remaining account balance is now <strong>₱").concat(o[s].balance,"</strong>.")),alert("Withdrawal transaction from ".concat(o[s].firstName,"'s account has been successful!"))),localStorage.setItem("users",JSON.stringify(o))}},{key:"deposit",value:function(a,e){var n,t,o=h.userStorage(),s=o.findIndex(function(e){return e.accountNumber==a});null==o[s]||""==o[s]?alert("User not found!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(n="male"==o[s].gender?"his":"her",o[s].balance=parseFloat(parseFloat(o[s].balance)+parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(o[s].balance)-parseFloat(e)).toFixed(2),o[s].transactionHistory.unshift("<em>".concat(h.time_stamp(),"</em> : Deposited an amount of <strong>₱").concat(e,"</strong> into <strong>").concat(o[s].firstName,"</strong>'s account. From a previous account balance of <strong>₱").concat(t,"</strong>, ").concat(n," account balance is now <strong>₱").concat(o[s].balance,"</strong>.")),alert("Deposit transaction from ".concat(o[s].firstName,"'s account has been successful!"))),localStorage.setItem("users",JSON.stringify(o))}},{key:"send",value:function(a,n,e){var t,o,s,r,i=h.userStorage(),c=i.findIndex(function(e){return e.accountNumber==a}),l=i.findIndex(function(e){return e.accountNumber==n});null!=i[c]&&""!=i[c]||null!=i[l]&&""!=i[l]?null==i[c]||""==i[c]?alert("Sender's account not found!"):null==i[l]||""==i[l]?alert("Receiver's account not found!"):parseFloat(i[c].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):i[c].accountNumber==i[l].accountNumber?alert("Account number entries are not allowed!"):(t="male"==i[c].gender?"his":"her",o="male"==i[l].gender?"his":"her",i[c].balance=parseFloat(parseFloat(i[c].balance)-parseFloat(e)).toFixed(2),s=parseFloat(parseFloat(i[c].balance)+parseFloat(e)).toFixed(2),i[c].transactionHistory.unshift("<em>".concat(h.time_stamp(),"</em> : Sent an amount of <strong>₱").concat(e,"</strong> from <strong>").concat(i[c].firstName,"</strong>'s account into ").concat(i[l].firstName,"'s account. From <strong>").concat(i[c].firstName,"</strong>'s previous account balance of <strong>₱").concat(s,"</strong>, ").concat(t," remaining account balance is now <strong>₱").concat(i[c].balance,"</strong>.")),i[l].balance=parseFloat(parseFloat(i[l].balance)+parseFloat(e)).toFixed(2),r=parseFloat(parseFloat(i[l].balance)-parseFloat(e)).toFixed(2),i[l].transactionHistory.unshift("<em>".concat(h.time_stamp(),"</em> : Received an amount of <strong>₱").concat(e,"</strong> from ").concat(i[c].firstName,"'s account into <strong>").concat(i[l].firstName,"</strong>'s account. From <strong>").concat(i[l].firstName,"</strong>'s previous account balance of <strong>₱").concat(r,"</strong>, ").concat(o," account balance is now <strong>₱").concat(i[l].balance,"</strong>.")),alert("Successfuly sent money from ".concat(i[c].firstName,"'s account into ").concat(i[l].firstName,"'s account!"))):alert("Users not found!"),localStorage.setItem("users",JSON.stringify(i))}},{key:"get_balance",value:function(a,e){var n=h.userStorage(),t=n.findIndex(function(e){return e.accountNumber==a}),o=create_el("td");n[t]&&(o.innerHTML="₱".concat(num_commas(n[t].balance)),e.appendChild(o))}},{key:"list_users",value:function(){var m=h.userStorage();id("acc-table").innerHTML="";for(f=1;f<m.length;f++)!function(){var e=void 0,a=create_el("tr"),n=create_el("td"),t=create_el("td"),o=create_el("span"),s=create_el("td"),r=create_el("td"),i=create_el("div"),c=create_el("i"),l=create_el("ul"),u=create_el("li");for(n.innerHTML=num_space(m[f].accountNumber),a.appendChild(n),add_event(n,"click",function(){document.execCommand("copy")}),add_event(n,"copy",function(e){e.preventDefault(),e.clipboardData&&e.clipboardData.setData("text/plain",n.textContent)}),o.innerHTML="".concat(m[f].firstName," ").concat(m[f].middleName," ").concat(m[f].lastName),add_class(c,"far"),add_class(c,"fa-times-circle"),add_class(c,"fa-2x"),add_class(l,"xbul"),add_class(l,"wrap-scroll"),1==m[f].transactionHistory.length&&(u.innerHTML="No other transactions yet.",l.appendChild(u)),e=0;e<m[f].transactionHistory.length;e++){var d=create_el("li");d.innerHTML=m[f].transactionHistory[e],add_class(d,"mb-05"),l.appendChild(d)}i.appendChild(c),i.appendChild(l),t.appendChild(o),t.appendChild(i),a.appendChild(t),add_event(o,"click",function(){add_class(i,"show")}),add_event(c,"click",function(){remove_class(i,"show")}),s.innerHTML=m[f].accountType,a.appendChild(s),r.innerHTML='<i id="'.concat(m.indexOf(m[f]),'" class="fas fa-minus-circle"></i>'),add_event(r.querySelector("i"),"click",function(){var e=prompt('Are you sure to delete this account?\nType "Y" for yes and "N" for no.',"N");"y"==(null!=e?e.toLowerCase():console.clear())&&(m.splice(this.id,1),localStorage.setItem("users",JSON.stringify(m)),h.list_users())}),h.get_balance(m[f].accountNumber,a),a.appendChild(r),id("acc-table").appendChild(a)}()}},{key:"first_char",value:function(){qsel_all("[id*='-name']").forEach(function(e){add_event(e,"keyup",function(){0<e.value.length&&!(31<e.value.charCodeAt(0)&&(e.value.charCodeAt(0)<48||57<e.value.charCodeAt(0)))&&(alert("Invalid input!"),e.value="")})})}},{key:"negative_char",value:function(){qsel_all("[id*='-amount']").forEach(function(a){add_event(a,"keyup",function(e){189==(e.which||e.keyCode)&&(alert("Amount cannot be negative!"),a.id.includes("dec")?a.value="00":a.value="0")})})}},{key:"num_only",value:function(){qsel_all("[id*='-account']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")}),qsel_all("[id*='-amount']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")})}},{key:"type_comma",value:function(){qsel_all("[id*='-amount']").forEach(function(a){add_event(a,"keyup",function(e){37<=e.which&&e.which<=40||37<=e.keyCode&&e.keyCode<=40||(a.value=a.value.replace(/,/gi,"").split(/(?=(?:\d{3})+$)/).join(","))})})}},{key:"dec_addZero",value:function(){qsel_all("[id*='-dec']").forEach(function(e){add_event(e,"change",function(){isNaN(e.value)||1!=e.value.length||(e.value="0".concat(e.value))})})}},{key:"password_match",value:function(){add_event(id("signup-password"),"keyup",function(){this.value==id("signup-confirm-password").value&&0!=this.value.length?(remove_class(id("match-msg"),"fa-times"),add_class(id("match-msg"),"fa-check")):this.value!=id("signup-confirm-password").value&&1<=id("signup-confirm-password").value.length?(remove_class(id("match-msg"),"fa-check"),add_class(id("match-msg"),"fa-times")):0==this.value.length&&(remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"))}),add_event(id("signup-confirm-password"),"keyup",function(){this.value==id("signup-password").value&&0!=this.value.length?(remove_class(id("match-msg"),"fa-times"),add_class(id("match-msg"),"fa-check")):this.value!=id("signup-password").value&&1<=id("signup-password").value.length?(remove_class(id("match-msg"),"fa-check"),add_class(id("match-msg"),"fa-times")):0==this.value.length&&(remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"))})}},{key:"reset",value:function(){qsel_all("form").forEach(function(e){e.reset()})}}]),h}();match_height(".mh"),g.list_users(),g.first_char(),g.negative_char(),g.num_only(),g.type_comma(),g.dec_addZero(),g.password_match();var e,a,n,t,o,s,r,i,c,l,u,d,m;i="1",c=r=s=o=t=n=a=e="admin",l="0",d=g.userStorage(),m=d.findIndex(function(e){return e.accountNumber==i}),d[m]||(u=new p(e,a,n,t,o,s,r,i,c,l),g.addUser(u));function v(e,a,n,t,o,s,r,i,c,l){var u,d=g.userStorage(),m=d.findIndex(function(e){return e.firstName==t}),f=d.findIndex(function(e){return e.lastName==s});d[m]&&d[f]?alert("User already exists!"):((u=new p(e,a,n,t,o,s,r,i,c,l)).transactionHistory.push("<em>".concat(g.time_stamp(),"</em> : Opened a ").concat(u.accountType," account for <strong>").concat(u.firstName,"</strong> ").concat(u.middleName," ").concat(u.lastName," with an initial account balance of <strong>₱").concat(u.balance,"</strong>.")),g.addUser(u))}add_event(id("load-data-btn"),"click",function(){var e=g.userStorage(),a=e.findIndex(function(e){return"JUAN"==e.firstName}),n=e.findIndex(function(e){return"DELA CRUZ"==e.lastName}),t=e.findIndex(function(e){return"JANE"==e.firstName}),o=e.findIndex(function(e){return"DOE"==e.lastName});if(!e[a]&&!e[n]){var s=prompt('Continuing will load initial data for immediate testing purposes?\nType "Y" to continue or "N" otherwise.',"Y"),r=null!=s?s.toLowerCase():console.clear();if("n"==r||null==r||""==r)return;v("juandelacruz","juanjuan","juandelacruz@mail.com","JUAN","","DELA CRUZ","male","071096025466","Savings",2500.05.toFixed(2))}e[t]||e[o]||v("","","","JANE","HILLS","DOE","female","023451282250","Checking",5200..toFixed(2)),g.list_users()}),add_event(id("clear-all-btn"),"click",function(){var e=g.userStorage();if(0!=e.length){var a=prompt('Are you sure to delete all stored datas?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=a?a.toLowerCase():console.clear()))return;e.splice(1,e.length),localStorage.setItem("users",JSON.stringify(e)),g.list_users()}}),add_event(id("add-form"),"submit",function(e){e.preventDefault();var a=id("male").checked?"male":"female",n=id("savings").checked?["05","06","07","08","09"]:["01","02","03","04"],t=id("savings").checked?"Savings":"Checking",o=id("savings").checked?2e3:5e3,s=0==id("add-deposit-amount").value.length?"0":id("add-deposit-amount").value.split(",").join(""),r="".concat(s,".").concat(id("add-deposit-amount-dec").value);return v("","","",inner(id("add-first-name").value.toUpperCase()),inner(id("add-middle-name").value.toUpperCase()),inner(id("add-last-name").value.toUpperCase()),a,n[rand(n.length)]+(rand(9e9)+1e9),t,parseFloat(o+parseFloat(r)).toFixed(2)),g.list_users(),alert("".concat(id("add-first-name").value.toUpperCase(),"'s account have been successfully created!")),id("add-form").reset(),!1}),add_event(id("login-form"),"submit",function(e){e.preventDefault();var a=g.userStorage(),n=a.findIndex(function(e){return e.username==id("login-username").value}),t=a.findIndex(function(e){return e.password==id("login-password").value});if(a[n]&&a[t])if(a[0].username==id("login-username").value&&a[0].password==id("login-password").value)toggle_class(id("modal"),"hide");else for(f=1;f<a.length;f++)a[f].username==id("login-username").value&&a[f].password==id("login-password").value&&(setTimeout(function(){toggle_class(id("modal"),"hide")},250),add_class(id("accounts-wrap"),"hide"),add_class(id("add-account-wrap"),"hide"));else alert("User not found!");return!1}),add_event(id("log-out-btn"),"click",function(e){return e.preventDefault(),toggle_class(id("modal"),"hide"),setTimeout(function(){remove_class(id("accounts-wrap"),"hide"),remove_class(id("add-account-wrap"),"hide")},250),g.reset(),!1}),add_event(id("open-signup-btn"),"click",function(){toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show")}),add_event(id("signup-form"),"submit",function(e){if(e.preventDefault(),id("signup-password").value==id("signup-confirm-password").value){var a=id("signup-male").checked?"male":"female";return g.signup_user(id("signup-first-name").value.toUpperCase(),id("signup-middle-name").value.toUpperCase(),id("signup-last-name").value.toUpperCase(),a,id("signup-username").value,id("signup-password").value,id("signup-email").value,id("signup-account-num").value.split(" ").join("")),!1}}),add_event(id("back-signup-btn"),"click",function(){toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),g.reset()}),add_event(id("withdraw-form"),"submit",function(e){e.preventDefault();var a="".concat(id("withdraw-amount").value.split(",").join(""),".").concat(id("withdraw-amount-dec").value);return g.withdraw(inner(id("withdraw-account").value.split(" ").join("")),a),g.list_users(),id("withdraw-form").reset(),!1}),add_event(id("deposit-form"),"submit",function(e){e.preventDefault();var a="".concat(id("deposit-amount").value.split(",").join(""),".").concat(id("deposit-amount-dec").value);return g.deposit(inner(id("deposit-account").value.split(" ").join("")),a),g.list_users(),id("deposit-form").reset(),!1}),add_event(id("send-form"),"submit",function(e){e.preventDefault();var a="".concat(id("send-amount").value.split(",").join(""),".").concat(id("send-amount-dec").value);return g.send(inner(id("sender-account").value.split(" ").join("")),inner(id("receiver-account").value.split(" ").join("")),a),g.list_users(),id("send-form").reset(),!1})});
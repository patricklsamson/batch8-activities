"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperties(e,a){for(var n=0;n<a.length;n++){var t=a[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,a,n){return a&&_defineProperties(e.prototype,a),n&&_defineProperties(e,n),e}function _possibleConstructorReturn(e,a){return!a||"object"!==_typeof(a)&&"function"!=typeof a?_assertThisInitialized(e):a}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),a&&_setPrototypeOf(e,a)}function _setPrototypeOf(e,a){return(_setPrototypeOf=Object.setPrototypeOf||function(e,a){return e.__proto__=a,e})(e,a)}function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}doc_ready(function(){function t(e,a,n){_classCallCheck(this,t),this.username=e,this.password=a,this.adminId=n}var w,m,p=function(){function m(e,a,n,t,s,o,r,i,c,l,u){var d;return _classCallCheck(this,m),(d=_possibleConstructorReturn(this,_getPrototypeOf(m).call(this,e,a))).email=n,d.firstName=s,d.middleName=o,d.lastName=r,d.gender=i,d.accountNumber=c,d.accountType=l,d.balance=u,d.signedUp=t,d.transactionHistory=[],d.userTransactionHistory=[],d.expenseItems=[],d.friends=[],d}return _inherits(m,t),m}(),h=function(){function _(){_classCallCheck(this,_)}return _createClass(_,null,[{key:"adminStorage",value:function(){var e=null===localStorage.getItem("admin")?[]:JSON.parse(localStorage.getItem("admin"));return e}},{key:"addAdmin",value:function(e){var a=_.adminStorage();a.push(e),localStorage.setItem("admin",JSON.stringify(a))}},{key:"userStorage",value:function(){var e=null===localStorage.getItem("users")?[]:JSON.parse(localStorage.getItem("users"));return e}},{key:"addUser",value:function(e){var a=_.userStorage();a.push(e),localStorage.setItem("users",JSON.stringify(a))}},{key:"click_copy",value:function(a){add_event(a,"click",function(){document.execCommand("copy")}),add_event(a,"copy",function(e){e.preventDefault(),e.clipboardData&&e.clipboardData.setData("text/plain",a.textContent)})}},{key:"individual_history",value:function(a){var e=_.userStorage(),n=e.findIndex(function(e){return e.accountNumber==a});for(id("owner-transaction").innerHTML="",w=0;w<e[n].userTransactionHistory.length;w++){var t=create_el("li"),s=create_el("li");1==e[n].userTransactionHistory.length&&(s.innerHTML="No other transactions yet.",id("owner-transaction").appendChild(s)),t.innerHTML=e[n].userTransactionHistory[w],add_class(t,"mb-05"),id("owner-transaction").appendChild(t)}}},{key:"login_user",value:function(a,n){var t=_.adminStorage(),s=_.userStorage(),o=s.findIndex(function(e){return e.username==a}),e=s.findIndex(function(e){return e.password==n});if(t[0].username==a&&t[0].password==n)toggle_class(id("modal"),"hide"),add_class(id("expense-wrap"),"hide"),add_class(id("connections-wrap"),"hide"),add_event(id("admin-settings-form"),"submit",function(e){if(e.preventDefault(),t[0].password!=id("admin-old-password").value)alert("Old password wrong!");else if(id("admin-old-password").value==id("admin-confirm-new-password").value)alert("There have been no changes made for the password!");else if(id("admin-new-password").value!=id("admin-confirm-new-password").value)alert("New password entries do not match!");else if(id("admin-confirm-new-password").value.length<5){var a=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=a?a.toLowerCase():console.clear()))return;t[0].password=id("admin-confirm-new-password").value,id("admin-settings-form").reset(),remove_class(id("admin-change-match-msg"),"fa-check"),remove_class(id("admin-change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("admin",JSON.stringify(t))}else t[0].password=id("admin-confirm-new-password").value,id("admin-settings-form").reset(),remove_class(id("admin-change-match-msg"),"fa-check"),remove_class(id("admin-change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("admin",JSON.stringify(t));return!1});else if(s[o]&&s[e]){for(w=0;w<s.length;w++)s[w].username==a&&s[w].password==n&&(setTimeout(function(){toggle_class(id("modal"),"hide")},250),add_class(id("settings-modal-inner"),"user"),add_class(id("admin-settings-form"),"hide"),add_class(id("user-settings-form"),"show"),add_class(id("accounts-wrap"),"hide"),add_class(id("add-newaccount-wrap"),"hide"));id("owner").innerHTML="".concat(s[o].firstName," ").concat(s[o].middleName," ").concat(s[o].lastName),id("owner-acc-num").innerHTML=num_space(s[o].accountNumber),_.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),add_event(id("change-email-form"),"submit",function(e){return e.preventDefault(),s[o].email==id("change-email").value?alert("There have been no changes made for the email!"):(s[o].email=id("change-email").value,alert("Change email successful!"),localStorage.setItem("users",JSON.stringify(s))),id("change-email-form").reset(),!1}),add_event(id("change-username-form"),"submit",function(e){for(e.preventDefault(),w=0;w<s.length;w++)if(s[w].username==a)return void alert("Username already used!");return id("change-username").value.length<5?alert("Username cannot be less than 5 characters!"):s[o].username==id("change-username").value?alert("There have been no changes made for the username!"):(s[o].username=id("change-username").value,alert("Change username successful!"),localStorage.setItem("users",JSON.stringify(s))),id("change-username-form").reset(),!1}),add_event(id("change-password-form"),"submit",function(e){if(e.preventDefault(),s[o].password!=id("old-password").value)alert("Old password wrong!");else if(id("old-password").value==id("confirm-new-password").value)alert("There have been no changes made for the password!");else if(id("new-password").value!=id("confirm-new-password").value)alert("New password entries do not match!");else if(id("confirm-new-password").value.length<5){var a=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=a?a.toLowerCase():console.clear()))return;s[o].password=id("confirm-new-password").value,id("change-password-form").reset(),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("users",JSON.stringify(s))}else s[o].password=id("confirm-new-password").value,id("change-password-form").reset(),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("users",JSON.stringify(s));return!1})}else alert("User not found!");setTimeout(function(){id("login-form").reset()},500)}},{key:"signup_user",value:function(a,n,t,e,s,o,r,i,c){var l=_.userStorage(),u=l.findIndex(function(e){return e.firstName==a}),d=l.findIndex(function(e){return e.middleName==n}),m=l.findIndex(function(e){return e.lastName==t}),f=l.findIndex(function(e){return e.accountNumber==c}),g=l.findIndex(function(e){return e.username==s}),p=l.findIndex(function(e){return e.password==o}),h=l.findIndex(function(e){return e.email==i});if(0==l[f].signedUp){for(w=0;w<l.length;w++)if(l[w].username==s)return void alert("Username already used!");if(null==l[u]||""==l[u]||null==l[d]||""==l[d]||null==l[m]||""==l[m]||l[f].gender!=e||null==l[f]||""==l[f])alert("User not found!");else if(s.length<5)alert("Username cannot be less than 5 characters!");else if(o!=r)alert("Password entries do not match!");else if(r.length<5){var v=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=v?v.toLowerCase():console.clear())||null!=l[g]&&""!=l[g]&&null!=l[p]&&""!=l[p]&&null!=l[h]&&""!=l[h])return;toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),l[f].username=s,l[f].password=r,l[f].email=i,l[f].signedUp=!0,alert("You have successfuly signed up!"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),id("signup-form").reset()}else null!=l[g]&&""!=l[g]&&null!=l[p]&&""!=l[p]&&null!=l[h]&&""!=l[h]||(toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),l[f].username=s,l[f].password=r,l[f].email=i,l[f].signedUp=!0,alert("You have successfuly signed up!"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),id("signup-form").reset());localStorage.setItem("users",JSON.stringify(l))}else remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),alert("You have already signed up!"),id("signup-form").reset()}},{key:"time_stamp",value:function(){var e=new Date,a=e.getMonth()<10?"0".concat(e.getMonth()+1):e.getMonth()+1,n=e.getDate()<10?"0".concat(e.getDate()):e.getDate(),t="".concat(a,"/").concat(n,"/").concat(e.getFullYear()),s=e.getHours()<10?"0".concat(e.getHours()):e.getHours(),o=e.getMinutes()<10?"0".concat(e.getMinutes()):e.getMinutes(),r=e.getSeconds()<10?"0".concat(e.getSeconds()):e.getSeconds(),i="".concat(s,":").concat(o,":").concat(r);return"".concat(t," - ").concat(i)}},{key:"withdraw",value:function(a,e){var n,t,s=_.userStorage(),o=s.findIndex(function(e){return e.accountNumber==a});null==s[o]||""==s[o]?alert("User not found!"):parseFloat(s[o].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(n="male"==s[o].gender?"his":"her",s[o].balance=parseFloat(parseFloat(s[o].balance)-parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(s[o].balance)+parseFloat(e)).toFixed(2),s[o].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Withdrawal transaction amounting to <strong>₱").concat(e,"</strong> from <strong>").concat(s[o].firstName,"</strong>'s account has been successful. From a previous account balance of <strong>₱").concat(t,"</strong>, ").concat(n," remaining account balance is now <strong>₱").concat(s[o].balance,"</strong>.")),s[o].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Withdrawal transaction amounting to <strong>₱").concat(e,"</strong> from your account has been successful. From a previous account balance of <strong>₱").concat(t,"</strong>, your remaining account balance is now <strong>₱").concat(s[o].balance,"</strong>.")),alert("Withdrawal transaction has been successful!")),localStorage.setItem("users",JSON.stringify(s))}},{key:"deposit",value:function(a,e){var n,t,s=_.userStorage(),o=s.findIndex(function(e){return e.accountNumber==a});null==s[o]||""==s[o]?alert("User not found!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(n="male"==s[o].gender?"his":"her",s[o].balance=parseFloat(parseFloat(s[o].balance)+parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(s[o].balance)-parseFloat(e)).toFixed(2),s[o].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Deposit transaction amounting to <strong>₱").concat(e,"</strong> into <strong>").concat(s[o].firstName,"</strong>'s account has been successful. From a previous account balance of <strong>₱").concat(t,"</strong>, ").concat(n," account balance is now <strong>₱").concat(s[o].balance,"</strong>.")),s[o].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Deposit transaction amounting to <strong>₱").concat(e,"</strong> into your account has been successful. From a previous account balance of <strong>₱").concat(t,"</strong>, your remaining account balance is now <strong>₱").concat(s[o].balance,"</strong>.")),alert("Deposit transaction account has been successful!")),localStorage.setItem("users",JSON.stringify(s))}},{key:"send",value:function(a,n,e){var t,s,o,r,i=_.userStorage(),c=i.findIndex(function(e){return e.accountNumber==a}),l=i.findIndex(function(e){return e.accountNumber==n});null!=i[c]&&""!=i[c]||null!=i[l]&&""!=i[l]?null==i[c]||""==i[c]?alert("Sender's account not found!"):null==i[l]||""==i[l]?alert("Receiver's account not found!"):parseFloat(i[c].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):i[c].accountNumber==i[l].accountNumber?alert("Account number entries are not allowed!"):(t="male"==i[c].gender?"his":"her",s="male"==i[l].gender?"his":"her",i[c].balance=parseFloat(parseFloat(i[c].balance)-parseFloat(e)).toFixed(2),o=parseFloat(parseFloat(i[c].balance)+parseFloat(e)).toFixed(2),i[c].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Outcoming money transfer amounting to <strong>₱").concat(e,"</strong> from <strong>").concat(i[c].firstName,"</strong>'s account into ").concat(i[l].firstName,"'s account has been successful. From <strong>").concat(i[c].firstName,"</strong>'s previous account balance of <strong>₱").concat(o,"</strong>, ").concat(t," remaining account balance is now <strong>₱").concat(i[c].balance,"</strong>.")),i[c].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Outcoming money transfer amounting to <strong>₱").concat(e,"</strong> from your account into ").concat(i[l].firstName,"'s account has been successful. From a previous account balance of <strong>₱").concat(o,"</strong>, your remaining account balance is now <strong>₱").concat(i[c].balance,"</strong>.")),i[l].balance=parseFloat(parseFloat(i[l].balance)+parseFloat(e)).toFixed(2),r=parseFloat(parseFloat(i[l].balance)-parseFloat(e)).toFixed(2),i[l].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(e,"</strong> from ").concat(i[c].firstName,"'s account into <strong>").concat(i[l].firstName,"</strong>'s account has been successful. From <strong>").concat(i[l].firstName,"</strong>'s previous account balance of <strong>₱").concat(r,"</strong>, ").concat(s," account balance is now <strong>₱").concat(i[l].balance,"</strong>.")),i[l].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(e,"</strong> from ").concat(i[c].firstName,"'s account into your account has been successful. From a previous account balance of <strong>₱").concat(r,"</strong>, your account balance is now <strong>₱").concat(i[l].balance,"</strong>.")),alert("Money transfer has been successful!")):alert("Users not found!"),localStorage.setItem("users",JSON.stringify(i))}},{key:"get_balance",value:function(a,e){var n=_.userStorage(),t=n.findIndex(function(e){return e.accountNumber==a}),s=create_el("td");n[t]&&(s.innerHTML="₱".concat(num_commas(n[t].balance)),e.appendChild(s))}},{key:"list_users",value:function(){var d=_.userStorage();id("acc-table").innerHTML="";for(w=0;w<d.length;w++)!function(){var e=create_el("tr"),a=create_el("td"),n=create_el("td"),t=create_el("span"),s=create_el("td"),o=create_el("td"),r=create_el("div"),i=create_el("i"),c=create_el("ul"),l=create_el("li");for(a.innerHTML=num_space(d[w].accountNumber),e.appendChild(a),_.click_copy(a),t.innerHTML="".concat(d[w].firstName," ").concat(d[w].middleName," ").concat(d[w].lastName),add_class(i,"far"),add_class(i,"fa-times-circle"),add_class(i,"fa-2x"),add_class(c,"xbul"),add_class(c,"wrap-scroll"),1==d[w].transactionHistory.length&&(l.innerHTML="No other transactions yet.",c.appendChild(l)),m=0;m<d[w].transactionHistory.length;m++){var u=create_el("li");u.innerHTML=d[w].transactionHistory[m],add_class(u,"mb-05"),c.appendChild(u)}r.appendChild(i),r.appendChild(c),n.appendChild(t),n.appendChild(r),e.appendChild(n),add_event(t,"click",function(){add_class(r,"show")}),add_event(i,"click",function(){remove_class(r,"show")}),s.innerHTML=d[w].accountType,e.appendChild(s),o.innerHTML='<i id="'.concat(d.indexOf(d[w]),'" class="fas fa-minus-circle"></i>'),add_event(o.querySelector("i"),"click",function(){var e=prompt('Are you sure to delete this account?\nType "Y" for yes and "N" for no.',"N");"y"==(null!=e?e.toLowerCase():console.clear())&&(d.splice(this.id,1),localStorage.setItem("users",JSON.stringify(d)),_.list_users())}),_.get_balance(d[w].accountNumber,e),e.appendChild(o),id("acc-table").appendChild(e)}()}},{key:"first_char",value:function(){qsel_all("[id*='-name']").forEach(function(e){add_event(e,"keyup",function(){0<e.value.length&&!(31<e.value.charCodeAt(0)&&(e.value.charCodeAt(0)<48||57<e.value.charCodeAt(0)))&&(alert("Invalid input!"),e.value="")})})}},{key:"negative_char",value:function(){qsel_all("[id*='-amount']").forEach(function(a){add_event(a,"keyup",function(e){189==(e.which||e.keyCode)&&(alert("Amount cannot be negative!"),a.id.includes("dec")?a.value="00":a.value="")})})}},{key:"num_only",value:function(){qsel_all("[id*='-account']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")}),qsel_all("[id*='-amount']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")})}},{key:"type_comma",value:function(){qsel_all("[id*='-amount']").forEach(function(a){add_event(a,"keyup",function(e){37<=e.which&&e.which<=40||37<=e.keyCode&&e.keyCode<=40||(a.value=a.value.replace(/,/gi,"").split(/(?=(?:\d{3})+$)/).join(","))})})}},{key:"dec_addZero",value:function(){qsel_all("[id*='-dec']").forEach(function(e){add_event(e,"change",function(){isNaN(e.value)||1!=e.value.length||(e.value="0".concat(e.value))})})}},{key:"password_match",value:function(e,a,n){add_event(e,"keyup",function(){this.value==a.value&&0!=this.value.length?(remove_class(n,"fa-times"),add_class(n,"fa-check")):this.value!=a.value&&1<=a.value.length?(remove_class(n,"fa-check"),add_class(n,"fa-times")):0==this.value.length&&(remove_class(n,"fa-check"),remove_class(n,"fa-times"))}),add_event(a,"keyup",function(){this.value==e.value&&0!=this.value.length?(remove_class(n,"fa-times"),add_class(n,"fa-check")):this.value!=e.value&&1<=e.value.length?(remove_class(n,"fa-check"),add_class(n,"fa-times")):0==this.value.length&&(remove_class(n,"fa-check"),remove_class(n,"fa-times"))})}},{key:"reset",value:function(){qsel_all("form").forEach(function(e){e.reset()})}}]),_}();match_height(".mh"),h.list_users(),h.first_char(),h.negative_char(),h.num_only(),h.type_comma(),h.dec_addZero(),h.click_copy(id("owner-acc-num")),h.password_match(id("signup-password"),id("signup-confirm-password"),id("match-msg")),h.password_match(id("new-password"),id("confirm-new-password"),id("change-match-msg"));var e,a,n,s,o,r;a=e="admin",n="1",o=h.adminStorage(),r=o.findIndex(function(e){return e.adminId==n}),o[r]||(s=new t(e,a,n),h.addAdmin(s));function i(e,a,n,t,s,o,r,i,c,l,u){var d,m=h.userStorage(),f=m.findIndex(function(e){return e.firstName==s}),g=m.findIndex(function(e){return e.lastName==r});m[f]&&m[g]?alert("User already exists!"):((d=new p(e,a,n,t,s,o,r,i,c,l,u)).transactionHistory.push("<em>".concat(h.time_stamp(),"</em> : Opened a ").concat(d.accountType.toLowerCase()," account for <strong>").concat(d.firstName,"</strong> ").concat(d.middleName," ").concat(d.lastName," with an initial account balance of <strong>₱").concat(d.balance,"</strong>.")),d.userTransactionHistory.push("<em>".concat(h.time_stamp(),"</em> : You have opened a ").concat(d.accountType.toLowerCase()," account with an initial account balance of <strong>₱").concat(d.balance,"</strong>.")),h.addUser(d))}add_event(id("load-data-btn"),"click",function(){var e=h.userStorage(),a=e.findIndex(function(e){return"JUAN"==e.firstName}),n=e.findIndex(function(e){return"DELA CRUZ"==e.lastName}),t=e.findIndex(function(e){return"JANE"==e.firstName}),s=e.findIndex(function(e){return"DOE"==e.lastName});if(!e[a]&&!e[n]){var o=prompt('Continuing will load initial data for immediate testing purposes?\nType "Y" to continue or "N" otherwise.',"Y"),r=null!=o?o.toLowerCase():console.clear();if("n"==r||null==r||""==r)return;i("juandelacruz","juanjuan","juandelacruz@mail.com",!0,"JUAN","","DELA CRUZ","male","071096025466","Savings",2500.05.toFixed(2))}e[t]||e[s]||i("","","",!5200,"JANE","HILLS","DOE","female","023451282250","Checking",5200..toFixed(2)),h.list_users()}),add_event(id("clear-all-btn"),"click",function(){if(0!=h.userStorage().length){var e=prompt('Are you sure to delete all stored datas?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=e?e.toLowerCase():console.clear()))return;localStorage.removeItem("users"),h.list_users()}}),add_event(id("add-form"),"submit",function(e){e.preventDefault();var a=id("male").checked?"male":"female",n=id("savings").checked?["05","06","07","08","09"]:["00","01","02","03","04"],t=id("savings").checked?"Savings":"Checking",s=id("savings").checked?2e3:5e3,o=0==id("add-deposit-amount").value.length?"0":id("add-deposit-amount").value.split(",").join(""),r="".concat(o,".").concat(id("add-deposit-amount-dec").value);return i("","","",!1,inner(id("add-first-name").value.toUpperCase()),inner(id("add-middle-name").value.toUpperCase()),inner(id("add-last-name").value.toUpperCase()),a,n[rand(n.length)]+(rand(9e9)+1e9),t,parseFloat(s+parseFloat(r)).toFixed(2)),h.list_users(),alert("".concat(id("add-first-name").value.toUpperCase(),"'s account have been successfully created!")),id("add-form").reset(),!1}),add_event(id("login-form"),"submit",function(e){return e.preventDefault(),h.login_user(id("login-username").value,id("login-password").value),!1}),add_event(id("log-out-btn"),"click",function(e){return e.preventDefault(),toggle_class(id("modal"),"hide"),setTimeout(function(){remove_class(id("accounts-wrap"),"hide"),remove_class(id("expense-wrap"),"hide"),remove_class(id("connections-wrap"),"hide"),remove_class(id("add-newaccount-wrap"),"hide")},500),remove_class(id("settings-modal-inner"),"user"),remove_class(id("admin-settings-form"),"hide"),remove_class(id("user-settings-form"),"show"),h.reset(),!1}),add_event(id("open-signup-btn"),"click",function(){toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show")}),add_event(id("signup-form"),"submit",function(e){e.preventDefault();var a=id("signup-male").checked?"male":"female";return h.signup_user(id("signup-first-name").value.toUpperCase(),id("signup-middle-name").value.toUpperCase(),id("signup-last-name").value.toUpperCase(),a,id("signup-username").value,id("signup-password").value,id("signup-confirm-password").value,id("signup-email").value,id("signup-account-num").value.split(" ").join("")),!1}),add_event(id("back-signup-btn"),"click",function(){toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),h.reset()}),add_event(id("settings-btn"),"click",function(){add_class(id("settings-modal"),"show")}),add_event(id("close-settings-btn"),"click",function(){remove_class(id("settings-modal"),"show"),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),h.reset()}),add_event(id("owner-transaction-btn"),"click",function(){add_class(id("owner-transaction-modal"),"show")}),add_event(id("close-owner-transaction-btn"),"click",function(){remove_class(id("owner-transaction-modal"),"show")}),add_event(id("add-connections-btn"),"click",function(){toggle_class(id("connections-form"),"show"),id("connections-form").reset()}),add_event(id("withdraw-form"),"submit",function(e){e.preventDefault();var a="".concat(id("withdraw-amount").value.split(",").join(""),".").concat(id("withdraw-amount-dec").value);return h.withdraw(inner(id("withdraw-account").value.split(" ").join("")),a),h.list_users(),h.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),id("withdraw-form").reset(),!1}),add_event(id("deposit-form"),"submit",function(e){e.preventDefault();var a="".concat(id("deposit-amount").value.split(",").join(""),".").concat(id("deposit-amount-dec").value);return h.deposit(inner(id("deposit-account").value.split(" ").join("")),a),h.list_users(),h.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),id("deposit-form").reset(),!1}),add_event(id("send-form"),"submit",function(e){e.preventDefault();var a="".concat(id("send-amount").value.split(",").join(""),".").concat(id("send-amount-dec").value);return h.send(inner(id("sender-account").value.split(" ").join("")),inner(id("receiver-account").value.split(" ").join("")),a),h.list_users(),h.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),id("send-form").reset(),!1})});
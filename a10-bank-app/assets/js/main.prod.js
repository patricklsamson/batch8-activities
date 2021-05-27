"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperties(e,n){for(var a=0;a<n.length;a++){var t=n[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,a){return n&&_defineProperties(e.prototype,n),a&&_defineProperties(e,a),e}function _possibleConstructorReturn(e,n){return!n||"object"!==_typeof(n)&&"function"!=typeof n?_assertThisInitialized(e):n}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&_setPrototypeOf(e,n)}function _setPrototypeOf(e,n){return(_setPrototypeOf=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}doc_ready(function(){function t(e,n,a){_classCallCheck(this,t),this.username=e,this.password=n,this.adminId=a}var w,m,g=function(){function m(e,n,a,t,o,s,r,i,c,l,d){var u;return _classCallCheck(this,m),(u=_possibleConstructorReturn(this,_getPrototypeOf(m).call(this,e,n))).email=a,u.firstName=o,u.middleName=s,u.lastName=r,u.gender=i,u.accountNumber=c,u.accountType=l,u.balance=d,u.signedUp=t,u.transactionHistory=[],u.userTransactionHistory=[],u.expenseItems=[],u.connections=[],u}return _inherits(m,t),m}(),h=function(){function _(){_classCallCheck(this,_)}return _createClass(_,null,[{key:"adminStorage",value:function(){var e=null===localStorage.getItem("admin")?[]:JSON.parse(localStorage.getItem("admin"));return e}},{key:"addAdmin",value:function(e){var n=_.adminStorage();n.push(e),localStorage.setItem("admin",JSON.stringify(n))}},{key:"userStorage",value:function(){var e=null===localStorage.getItem("users")?[]:JSON.parse(localStorage.getItem("users"));return e}},{key:"addUser",value:function(e){var n=_.userStorage();n.push(e),localStorage.setItem("users",JSON.stringify(n))}},{key:"click_copy",value:function(n){add_event(n,"click",function(){document.execCommand("copy")}),add_event(n,"copy",function(e){e.preventDefault(),e.clipboardData&&e.clipboardData.setData("text/plain",n.textContent)})}},{key:"individual_history",value:function(n){var e=_.userStorage(),a=e.findIndex(function(e){return e.accountNumber==n});for(id("owner-transaction").innerHTML="",w=0;w<e[a].userTransactionHistory.length;w++){var t=create_el("li"),o=create_el("li");1==e[a].userTransactionHistory.length&&(o.innerHTML="No other transactions yet.",id("owner-transaction").appendChild(o)),t.innerHTML=e[a].userTransactionHistory[w],add_class(t,"mb-05"),id("owner-transaction").appendChild(t)}}},{key:"login_user",value:function(n,a){var t=_.adminStorage(),o=_.userStorage(),s=o.findIndex(function(e){return e.username==n}),e=o.findIndex(function(e){return e.password==a});if(t[0].username==n&&t[0].password==a)toggle_class(id("modal"),"hide"),add_class(id("expense-wrap"),"hide"),add_class(id("connections-wrap"),"hide"),id("withdraw-account").removeAttribute("value"),id("deposit-account").removeAttribute("value"),id("sender-account").removeAttribute("value"),add_event(id("admin-settings-form"),"submit",function(e){if(e.preventDefault(),t[0].password!=inner(id("admin-old-password").value))alert("Old password wrong!");else if(inner(id("admin-old-password").value)==inner(id("admin-confirm-new-password").value))alert("There have been no changes made for the password!");else if(inner(id("admin-new-password").value)!=inner(id("admin-confirm-new-password").value))alert("New password entries do not match!");else if(inner(id("admin-confirm-new-password").value).length<5){var n=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=n?n.toLowerCase():console.clear()))return;t[0].password=inner(id("admin-confirm-new-password").value),id("admin-settings-form").reset(),remove_class(id("admin-change-match-msg"),"fa-check"),remove_class(id("admin-change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("admin",JSON.stringify(t))}else t[0].password=inner(id("admin-confirm-new-password").value),id("admin-settings-form").reset(),remove_class(id("admin-change-match-msg"),"fa-check"),remove_class(id("admin-change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("admin",JSON.stringify(t));return!1});else if(o[s]&&o[e]&&s==e){for(w=0;w<o.length;w++)o[w].username==n&&o[w].password==a&&(setTimeout(function(){toggle_class(id("modal"),"hide"),add_class(id("withdraw-form"),"hide"),add_class(id("deposit-form"),"hide"),add_class(qsel(".wrap-send"),"user"),add_class(id("send-form"),"hide")},250),add_class(id("settings-modal-inner"),"user"),add_class(id("admin-settings-form"),"hide"),add_class(id("user-settings-form"),"show"),add_class(id("accounts-wrap"),"hide"),add_class(id("add-newaccount-wrap"),"hide"));id("owner").innerHTML="".concat(o[s].firstName," ").concat(o[s].middleName," ").concat(o[s].lastName),id("owner-acc-num").innerHTML=num_space(o[s].accountNumber),_.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),id("profile-name").innerHTML="".concat(o[s].firstName," ").concat(o[s].middleName," ").concat(o[s].lastName),id("profile-username").innerHTML=o[s].username,id("profile-email").innerHTML=o[s].email,add_att(id("withdraw-account"),"value",id("owner-acc-num").innerHTML),add_att(id("deposit-account"),"value",id("owner-acc-num").innerHTML),add_att(id("sender-account"),"value",id("owner-acc-num").innerHTML),add_event(id("change-email-form"),"submit",function(e){return e.preventDefault(),o[s].email==inner(trim(id("change-email").value))?alert("There have been no changes made for the email!"):(o[s].email=inner(trim(id("change-email").value)),alert("Change email successful!"),localStorage.setItem("users",JSON.stringify(o))),id("change-email-form").reset(),!1}),add_event(id("change-username-form"),"submit",function(e){for(e.preventDefault(),w=0;w<o.length;w++)if(o[w].username==inner(trim(id("change-username").value)))return void alert("Username already used!");return id("change-username").value.length<5?alert("Username cannot be less than 5 characters!"):(o[s].username=inner(trim(id("change-username").value)),alert("Change username successful!"),localStorage.setItem("users",JSON.stringify(o))),id("change-username-form").reset(),!1}),add_event(id("change-password-form"),"submit",function(e){if(e.preventDefault(),o[s].password!=inner(id("old-password").value))alert("Old password wrong!");else if(inner(id("old-password").value)==inner(id("confirm-new-password").value))alert("There have been no changes made for the password!");else if(inner(id("new-password").value)!=inner(id("confirm-new-password").value))alert("New password entries do not match!");else if(inner(id("confirm-new-password").value).length<5){var n=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=n?trim(n.toLowerCase()):console.clear()))return;o[s].password=inner(id("confirm-new-password").value),id("change-password-form").reset(),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("users",JSON.stringify(o))}else o[s].password=inner(id("confirm-new-password").value),id("change-password-form").reset(),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("users",JSON.stringify(o));return!1})}else o[s]?alert("Username and password do not match!"):alert("User does not exist!");setTimeout(function(){id("login-form").reset()},500)}},{key:"signup_user",value:function(n,a,t,e,o,s,r,i,c){var l=_.userStorage(),d=l.findIndex(function(e){return e.firstName==n}),u=l.findIndex(function(e){return e.middleName==a}),m=l.findIndex(function(e){return e.lastName==t}),f=l.findIndex(function(e){return e.accountNumber==c}),p=l.findIndex(function(e){return e.username==o}),g=l.findIndex(function(e){return e.password==s}),h=l.findIndex(function(e){return e.email==i});if(l[f].signedUp)return remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),alert("You have already signed up!"),void id("signup-form").reset();for(w=0;w<l.length;w++)if(l[w].username==o)return void alert("Username already used!");if(null==l[d]||""==l[d]||null==l[u]||""==l[u]||null==l[m]||""==l[m]||l[f].gender!=e||null==l[f]||""==l[f])alert("User not found!");else if(o.length<5)alert("Username cannot be less than 5 characters!");else if(s!=r)alert("Password entries do not match!");else if(r.length<5){var v=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=v?trim(v.toLowerCase()):console.clear())||null!=l[p]&&""!=l[p]&&null!=l[g]&&""!=l[g]&&null!=l[h]&&""!=l[h])return;toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),l[f].username=o,l[f].password=r,l[f].email=i,l[f].signedUp=!0,alert("You have successfuly signed up!"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),id("signup-form").reset()}else null!=l[p]&&""!=l[p]&&null!=l[g]&&""!=l[g]&&null!=l[h]&&""!=l[h]||(toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),l[f].username=o,l[f].password=r,l[f].email=i,l[f].signedUp=!0,alert("You have successfuly signed up!"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),id("signup-form").reset());localStorage.setItem("users",JSON.stringify(l))}},{key:"time_stamp",value:function(){var e=new Date,n=e.getMonth()<10?"0".concat(e.getMonth()+1):e.getMonth()+1,a=e.getDate()<10?"0".concat(e.getDate()):e.getDate(),t="".concat(n,"/").concat(a,"/").concat(e.getFullYear()),o=e.getHours()<10?"0".concat(e.getHours()):e.getHours(),s=e.getMinutes()<10?"0".concat(e.getMinutes()):e.getMinutes(),r=e.getSeconds()<10?"0".concat(e.getSeconds()):e.getSeconds(),i="".concat(o,":").concat(s,":").concat(r);return"".concat(t," - ").concat(i)}},{key:"withdraw",value:function(n,e){var a,t,o=_.userStorage(),s=o.findIndex(function(e){return e.accountNumber==n});null==o[s]||""==o[s]?alert("User not found!"):parseFloat(o[s].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(a="male"==o[s].gender?"his":"her",o[s].balance=parseFloat(parseFloat(o[s].balance)-parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(o[s].balance)+parseFloat(e)).toFixed(2),o[s].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Withdrawal transaction amounting to <strong>₱").concat(e,"</strong> from <strong>").concat(o[s].firstName,"</strong>'s account has been successful. From a previous account balance of <strong>₱").concat(t,"</strong>, ").concat(a," remaining account balance is now <strong>₱").concat(o[s].balance,"</strong>.")),o[s].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Withdrawal transaction amounting to <strong>₱").concat(e,"</strong> from your account has been successful. From a previous account balance of <strong>₱").concat(t,"</strong>, your remaining account balance is now <strong>₱").concat(o[s].balance,"</strong>.")),alert("Withdrawal transaction has been successful!"),localStorage.setItem("users",JSON.stringify(o)))}},{key:"deposit",value:function(n,e){var a,t,o=_.userStorage(),s=o.findIndex(function(e){return e.accountNumber==n});null==o[s]||""==o[s]?alert("User not found!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(a="male"==o[s].gender?"his":"her",o[s].balance=parseFloat(parseFloat(o[s].balance)+parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(o[s].balance)-parseFloat(e)).toFixed(2),o[s].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Deposit transaction amounting to <strong>₱").concat(e,"</strong> into <strong>").concat(o[s].firstName,"</strong>'s account has been successful. From a previous account balance of <strong>₱").concat(t,"</strong>, ").concat(a," account balance is now <strong>₱").concat(o[s].balance,"</strong>.")),o[s].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Deposit transaction amounting to <strong>₱").concat(e,"</strong> into your account has been successful. From a previous account balance of <strong>₱").concat(t,"</strong>, your account balance is now <strong>₱").concat(o[s].balance,"</strong>.")),alert("Deposit transaction account has been successful!"),localStorage.setItem("users",JSON.stringify(o)))}},{key:"send",value:function(n,a,e){var t,o,s,r,i=_.userStorage(),c=i.findIndex(function(e){return e.accountNumber==n}),l=i.findIndex(function(e){return e.accountNumber==a});null!=i[c]&&""!=i[c]||null!=i[l]&&""!=i[l]?null==i[c]||""==i[c]?alert("Sender's account not found!"):null==i[l]||""==i[l]?alert("Receiver's account not found!"):parseFloat(i[c].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):i[c].accountNumber==i[l].accountNumber?alert("Account number entries are not allowed!"):(t="male"==i[c].gender?"his":"her",o="male"==i[l].gender?"his":"her",i[c].balance=parseFloat(parseFloat(i[c].balance)-parseFloat(e)).toFixed(2),s=parseFloat(parseFloat(i[c].balance)+parseFloat(e)).toFixed(2),i[c].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Outcoming money transfer amounting to <strong>₱").concat(e,"</strong> from <strong>").concat(i[c].firstName,"</strong>'s account into ").concat(i[l].firstName,"'s account has been successful. From <strong>").concat(i[c].firstName,"</strong>'s previous account balance of <strong>₱").concat(s,"</strong>, ").concat(t," remaining account balance is now <strong>₱").concat(i[c].balance,"</strong>.")),i[c].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Outcoming money transfer amounting to <strong>₱").concat(e,"</strong> from your account into ").concat(i[l].firstName,"'s account has been successful. From a previous account balance of <strong>₱").concat(s,"</strong>, your remaining account balance is now <strong>₱").concat(i[c].balance,"</strong>.")),i[l].balance=parseFloat(parseFloat(i[l].balance)+parseFloat(e)).toFixed(2),r=parseFloat(parseFloat(i[l].balance)-parseFloat(e)).toFixed(2),i[l].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(e,"</strong> from ").concat(i[c].firstName,"'s account into <strong>").concat(i[l].firstName,"</strong>'s account has been successful. From <strong>").concat(i[l].firstName,"</strong>'s previous account balance of <strong>₱").concat(r,"</strong>, ").concat(o," account balance is now <strong>₱").concat(i[l].balance,"</strong>.")),i[l].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(e,"</strong> from ").concat(i[c].firstName,"'s account into your account has been successful. From a previous account balance of <strong>₱").concat(r,"</strong>, your account balance is now <strong>₱").concat(i[l].balance,"</strong>.")),alert("Money transfer has been successful!"),localStorage.setItem("users",JSON.stringify(i))):alert("Users not found!")}},{key:"get_balance",value:function(n,e){var a=_.userStorage(),t=a.findIndex(function(e){return e.accountNumber==n}),o=create_el("td");a[t]&&(o.innerHTML="₱".concat(num_commas(a[t].balance)),e.appendChild(o))}},{key:"list_users",value:function(){var u=_.userStorage();id("acc-table").innerHTML="";for(w=0;w<u.length;w++)!function(){var e=create_el("tr"),n=create_el("td"),a=create_el("td"),t=create_el("span"),o=create_el("td"),s=create_el("td"),r=create_el("div"),i=create_el("i"),c=create_el("ul"),l=create_el("li");for(n.innerHTML=num_space(u[w].accountNumber),e.appendChild(n),_.click_copy(n),t.innerHTML="".concat(u[w].firstName," ").concat(u[w].middleName," ").concat(u[w].lastName),add_event(t,"click",function(){add_class(r,"show")}),add_class(i,"far"),add_class(i,"fa-times-circle"),add_class(i,"fa-2x"),add_class(c,"xbul"),add_class(c,"wrap-scroll"),add_event(i,"click",function(){remove_class(r,"show")}),1==u[w].transactionHistory.length&&(l.innerHTML="No other transactions yet.",c.appendChild(l)),m=0;m<u[w].transactionHistory.length;m++){var d=create_el("li");d.innerHTML=u[w].transactionHistory[m],add_class(d,"mb-05"),c.appendChild(d)}r.appendChild(i),r.appendChild(c),a.appendChild(t),a.appendChild(r),e.appendChild(a),o.innerHTML=u[w].accountType,e.appendChild(o),s.innerHTML='<i id="'.concat(u.indexOf(u[w]),'" class="fas fa-minus-circle"></i>'),add_event(s.querySelector("i"),"click",function(){var e=prompt('Are you sure to delete this account?\nType "Y" for yes and "N" for no.',"N");"y"==(null!=e?e.toLowerCase():console.clear())&&(u.splice(this.id,1),localStorage.setItem("users",JSON.stringify(u)),_.list_users())}),_.get_balance(u[w].accountNumber,e),e.appendChild(s),id("acc-table").appendChild(e)}()}},{key:"add_connections",value:function(n,e,a){var t=_.userStorage(),o=t.findIndex(function(e){return e.accountNumber==n}),s=t.findIndex(function(e){return e.accountNumber==a});for(w=0;w<t[o].connections.length;w++)if(t[o].connections[w].accountNumber==a)return void alert("Connection already exists!");null==t[s]||""==t[s]?alert("User not found"):n==a?alert("Cannot add own account number!"):(t[o].connections.push({name:e,accountNumber:a}),remove_class(id("connections-form"),"show"),id("connections-form").reset(),localStorage.setItem("users",JSON.stringify(t)))}},{key:"list_connections",value:function(n){var a=_.userStorage(),t=a.findIndex(function(e){return e.accountNumber==n});for(id("connections-table").innerHTML="",w=0;w<a[t].connections.length;w++){var e=create_el("tr"),o=create_el("td"),s=create_el("td"),r=create_el("td"),i=create_el("td");o.innerHTML=a[t].connections[w].name,e.appendChild(o),s.innerHTML=num_space(a[t].connections[w].accountNumber),_.click_copy(s),e.appendChild(s),r.innerHTML='<i id="'.concat(w,'" class="fas fa-edit"></i>'),add_event(r.querySelector("i"),"click",function(){return has_class(id("connections-form"),"show")||add_class(id("connections-form"),"show"),id("connections-name").value=a[t].connections[this.id].name,id("connections-account-num").value=a[t].connections[this.id].accountNumber,a[t].connections.splice(this.id,1),localStorage.setItem("users",JSON.stringify(a)),_.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""))}),e.appendChild(r),i.innerHTML='<i id="'.concat(w,'" class="fas fa-minus-circle"></i>'),add_event(i.querySelector("i"),"click",function(){var e=prompt('Are you sure to delete this connection?\nType "Y" for yes and "N" for no.',"N");return"y"==(null!=e?e.toLowerCase():console.clear())?(a[t].connections.splice(this.id,1),localStorage.setItem("users",JSON.stringify(a)),_.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""))):void 0}),e.appendChild(i),id("connections-table").appendChild(e)}}},{key:"first_char",value:function(){qsel_all("[id*='-name']").forEach(function(e){add_event(e,"keyup",function(){0<e.value.length&&!(31<e.value.charCodeAt(0)&&(e.value.charCodeAt(0)<48||57<e.value.charCodeAt(0)))&&(alert("Invalid input!"),e.value="")})})}},{key:"negative_char",value:function(){qsel_all("[id*='-amount']").forEach(function(n){add_event(n,"keyup",function(e){189==(e.which||e.keyCode)&&(alert("Amount cannot be negative!"),n.id.includes("dec")?n.value="00":n.value="")})})}},{key:"num_only",value:function(){qsel_all("[id*='-account']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")}),qsel_all("[id*='-amount']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")})}},{key:"type_comma",value:function(){qsel_all("[id*='-amount']").forEach(function(n){add_event(n,"keyup",function(e){37<=e.which&&e.which<=40||37<=e.keyCode&&e.keyCode<=40||(n.value=n.value.replace(/,/gi,"").split(/(?=(?:\d{3})+$)/).join(","))})})}},{key:"dec_addZero",value:function(){qsel_all("[id*='-dec']").forEach(function(e){add_event(e,"change",function(){isNaN(e.value)||1!=e.value.length||(e.value="0".concat(e.value))})})}},{key:"password_match",value:function(e,n,a){add_event(e,"keyup",function(){this.value==n.value&&0!=this.value.length?(remove_class(a,"fa-times"),add_class(a,"fa-check")):this.value!=n.value&&1<=n.value.length?(remove_class(a,"fa-check"),add_class(a,"fa-times")):0==this.value.length&&(remove_class(a,"fa-check"),remove_class(a,"fa-times"))}),add_event(n,"keyup",function(){this.value==e.value&&0!=this.value.length?(remove_class(a,"fa-times"),add_class(a,"fa-check")):this.value!=e.value&&1<=e.value.length?(remove_class(a,"fa-check"),add_class(a,"fa-times")):0==this.value.length&&(remove_class(a,"fa-check"),remove_class(a,"fa-times"))})}},{key:"reset",value:function(){qsel_all("form").forEach(function(e){e.reset()})}}]),_}();match_height(".mh"),h.list_users(),h.first_char(),h.negative_char(),h.num_only(),h.type_comma(),h.dec_addZero(),h.password_match(id("signup-password"),id("signup-confirm-password"),id("match-msg")),h.password_match(id("new-password"),id("confirm-new-password"),id("change-match-msg"));var e,n,a,o,s,r;n=e="admin",a="1",s=h.adminStorage(),r=s.findIndex(function(e){return e.adminId==a}),s[r]||(o=new t(e,n,a),h.addAdmin(o));function i(e,n,a,t,o,s,r,i,c,l,d){var u,m=h.userStorage(),f=m.findIndex(function(e){return e.firstName==o}),p=m.findIndex(function(e){return e.lastName==r});m[f]&&m[p]?alert("User already exists!"):((u=new g(e,n,a,t,o,s,r,i,c,l,d)).transactionHistory.push("<em>".concat(h.time_stamp(),"</em> : Opened a ").concat(u.accountType.toLowerCase()," account for <strong>").concat(u.firstName,"</strong> ").concat(u.middleName," ").concat(u.lastName," with an initial account balance of <strong>₱").concat(u.balance,"</strong>.")),u.userTransactionHistory.push("<em>".concat(h.time_stamp(),"</em> : You have opened a ").concat(u.accountType.toLowerCase()," account with an initial account balance of <strong>₱").concat(u.balance,"</strong>.")),h.addUser(u))}add_event(id("load-data-btn"),"click",function(){var e=h.userStorage(),n=e.findIndex(function(e){return"JUAN"==e.firstName}),a=e.findIndex(function(e){return"DELA CRUZ"==e.lastName}),t=e.findIndex(function(e){return"JANE"==e.firstName}),o=e.findIndex(function(e){return"DOE"==e.lastName});if(!e[n]&&!e[a]){var s=prompt('Continuing will load initial data for immediate testing purposes?\nType "Y" to continue or "N" otherwise.',"Y"),r=null!=s?trim(s.toLowerCase()):console.clear();if("n"==r||null==r||""==r)return;i("juandelacruz","juanjuan","juandelacruz@mail.com",!0,"JUAN","","DELA CRUZ","male","071096025466","Savings",2500.05.toFixed(2))}e[t]||e[o]||i("","","",!5200,"JANE","HILLS","DOE","female","023451282250","Checking",5200..toFixed(2)),h.list_users()}),add_event(id("clear-all-btn"),"click",function(){if(0!=h.userStorage().length){var e=prompt('Are you sure to delete all stored datas?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=e?trim(e.toLowerCase()):console.clear()))return;localStorage.removeItem("users"),h.list_users()}}),add_event(id("add-form"),"submit",function(e){e.preventDefault();var n=id("male").checked?"male":"female",a=id("savings").checked?["05","06","07","08","09"]:["00","01","02","03","04"],t=id("savings").checked?"Savings":"Checking",o=id("savings").checked?2e3:5e3,s=0==id("add-deposit-amount").value.length?"0":id("add-deposit-amount").value.split(",").join(""),r="".concat(s,".").concat(id("add-deposit-amount-dec").value);return i("","","",!1,inner(trim(id("add-first-name").value.toUpperCase())),inner(trim(id("add-middle-name").value.toUpperCase())),inner(trim(id("add-last-name").value.toUpperCase())),n,a[rand(a.length)]+(rand(9e9)+1e9),t,parseFloat(o+parseFloat(r)).toFixed(2)),h.list_users(),alert("".concat(inner(trim(id("add-first-name").value.toUpperCase())),"'s account have been successfully created!")),id("add-form").reset(),!1}),add_event(id("login-form"),"submit",function(e){return e.preventDefault(),h.login_user(inner(trim(id("login-username").value)),inner(trim(id("login-password").value))),h.list_connections(id("owner-acc-num").innerHTML.split(" ").join("")),!1}),add_event(id("log-out-btn"),"click",function(e){return e.preventDefault(),toggle_class(id("modal"),"hide"),setTimeout(function(){remove_class(id("accounts-wrap"),"hide"),remove_class(id("expense-wrap"),"hide"),remove_class(id("connections-wrap"),"hide"),remove_class(id("connections-form"),"show"),remove_class(id("add-newaccount-wrap"),"hide"),remove_class(id("withdraw-form"),"hide"),remove_class(id("deposit-form"),"hide"),remove_class(qsel(".wrap-send"),"user"),remove_class(id("send-form"),"hide")},500),remove_class(id("settings-modal-inner"),"user"),remove_class(id("admin-settings-form"),"hide"),remove_class(id("user-settings-form"),"show"),h.reset(),!1}),add_event(id("open-signup-btn"),"click",function(){toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show")}),add_event(id("signup-form"),"submit",function(e){e.preventDefault();var n=id("signup-male").checked?"male":"female";return h.signup_user(inner(trim(id("signup-first-name").value.toUpperCase())),inner(trim(id("signup-middle-name").value.toUpperCase())),inner(trim(id("signup-last-name").value.toUpperCase())),n,inner(trim(id("signup-username").value)),inner(id("signup-password").value),inner(id("signup-confirm-password").value),inner(trim(id("signup-email").value)),id("signup-account-num").value.split(" ").join("")),!1}),add_event(id("back-signup-btn"),"click",function(){toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),h.reset()}),add_event(id("settings-btn"),"click",function(){add_class(id("settings-modal"),"show")}),add_event(id("close-settings-btn"),"click",function(){remove_class(id("settings-modal"),"show"),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),h.reset()}),add_event(id("owner-transaction-btn"),"click",function(){add_class(id("owner-transaction-modal"),"show")}),add_event(id("close-owner-transaction-btn"),"click",function(){remove_class(id("owner-transaction-modal"),"show")}),add_event(id("owner"),"click",function(){add_class(id("profile-modal"),"show")}),add_event(id("close-profile-btn"),"click",function(){remove_class(id("profile-modal"),"show")}),add_event(id("add-connections-btn"),"click",function(){toggle_class(id("connections-form"),"show"),id("connections-form").reset()}),add_event(id("connections-form"),"submit",function(e){return e.preventDefault(),h.add_connections(id("owner-acc-num").innerHTML.split(" ").join(""),inner(trim(id("connections-name").value.toUpperCase())),id("connections-account-num").value.split(" ").join("")),h.list_connections(id("owner-acc-num").innerHTML.split(" ").join("")),!1}),add_event(id("withdraw-form"),"submit",function(e){e.preventDefault();var n="".concat(id("withdraw-amount").value.split(",").join(""),".").concat(id("withdraw-amount-dec").value);return h.withdraw(id("withdraw-account").value.split(" ").join(""),n),h.list_users(),h.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),id("withdraw-form").reset(),!1}),add_event(id("deposit-form"),"submit",function(e){e.preventDefault();var n="".concat(id("deposit-amount").value.split(",").join(""),".").concat(id("deposit-amount-dec").value);return h.deposit(id("deposit-account").value.split(" ").join(""),n),h.list_users(),h.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),id("deposit-form").reset(),!1}),add_event(id("send-form"),"submit",function(e){e.preventDefault();var n="".concat(id("send-amount").value.split(",").join(""),".").concat(id("send-amount-dec").value);return h.send(id("sender-account").value.split(" ").join(""),id("receiver-account").value.split(" ").join(""),n),h.list_users(),h.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),id("send-form").reset(),!1})});
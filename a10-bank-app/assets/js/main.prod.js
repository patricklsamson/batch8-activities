"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperties(e,n){for(var a=0;a<n.length;a++){var t=n[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,a){return n&&_defineProperties(e.prototype,n),a&&_defineProperties(e,a),e}function _possibleConstructorReturn(e,n){return!n||"object"!==_typeof(n)&&"function"!=typeof n?_assertThisInitialized(e):n}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&_setPrototypeOf(e,n)}function _setPrototypeOf(e,n){return(_setPrototypeOf=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}doc_ready(function(){var w,m;localStorage_space();function t(e,n,a){_classCallCheck(this,t),this.username=e,this.password=n,this.adminId=a}function i(e,n,a){_classCallCheck(this,i),this.name=e,this.cost=n,this.owner=a}var g=function(){function m(e,n,a,t,o,s,r,i,c,l,d){var u;return _classCallCheck(this,m),(u=_possibleConstructorReturn(this,_getPrototypeOf(m).call(this,e,n))).email=a,u.firstName=o,u.middleName=s,u.lastName=r,u.gender=i,u.accountNumber=c,u.accountType=l,u.balance=d,u.budget=d,u.signedUp=t,u.transactionHistory=[],u.userTransactionHistory=[],u.expenseItems=[],u.connections=[],u}return _inherits(m,t),_createClass(m,null,[{key:"get_budget",value:function(n){var e=v.userStorage(),a=e.findIndex(function(e){return e.accountNumber==n});null!=e[a]&&(id("owner-balance").innerHTML="",id("owner-balance").innerHTML=num_commas(e[a].budget),(e[a].budget<0?add_class:remove_class)(id("budget"),"negative"))}},{key:"total_expenses",value:function(n){var e=v.userStorage(),a=e.findIndex(function(e){return e.accountNumber==n}),t=0;if(null!=e[a]){for(id("owner-expenses").innerHTML="",w=0;w<e[a].expenseItems.length;w++)t=parseFloat(t+parseFloat(e[a].expenseItems[w].cost));id("owner-expenses").innerHTML=num_commas(t.toFixed(2))}}},{key:"add",value:function(n,e,a){var t,o=v.userStorage(),s=o.findIndex(function(e){return e.accountNumber==a}),r=o[s].expenseItems.findIndex(function(e){return e.name==n});o[s].expenseItems[r]?alert("Expense item already exists!"):(t=new i(n,e,a),o[s].budget=parseFloat(parseFloat(o[s].budget)-parseFloat(e)).toFixed(2),o[s].expenseItems.push(t),localStorage.setItem("users",JSON.stringify(o)),id("add-expense-form").reset())}},{key:"list",value:function(t){var e=v.userStorage(),n=e.findIndex(function(e){return e.accountNumber==t});if(null!=e[n])for(id("expense-table").innerHTML="",w=0;w<e[n].expenseItems.length;w++){var a=create_el("tr"),o=create_el("td"),s=create_el("td"),r=create_el("td"),i=create_el("td");o.innerHTML=e[n].expenseItems[w].name,a.appendChild(o),s.innerHTML="₱".concat(num_commas(e[n].expenseItems[w].cost)),a.appendChild(s),r.innerHTML='<i id="'.concat(w,'" class="fas fa-edit"></i>'),add_event(r.querySelector("i"),"click",function(){var e=v.userStorage(),n=e.findIndex(function(e){return e.accountNumber==t});id("add-expense-name").value=e[n].expenseItems[this.id].name,id("add-expense-amount").value=num_commas(e[n].expenseItems[this.id].cost.split(".")[0]),id("add-expense-amount-dec").value=e[n].expenseItems[this.id].cost.split(".")[1],e[n].budget=parseFloat(parseFloat(e[n].budget)+parseFloat(e[n].expenseItems[this.id].cost)).toFixed(2),e[n].expenseItems.splice(this.id,1),localStorage.setItem("users",JSON.stringify(e)),m.list(id("owner-acc-num").innerHTML.split(" ").join("")),v.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),v.list_users(),m.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),m.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""))}),a.appendChild(r),i.innerHTML='<i id="'.concat(w,'" class="fas fa-minus-circle"></i>'),add_event(i.querySelector("i"),"click",function(){var e=v.userStorage(),n=e.findIndex(function(e){return e.accountNumber==t}),a=prompt('Are you sure to delete this item?\n Type "Y" for yes and "N" for no.',"N");"y"==(null!=a?trim(a.toLowerCase()):console.clear())&&(e[n].budget=parseFloat(parseFloat(e[n].budget)+parseFloat(e[n].expenseItems[this.id].cost)).toFixed(2),e[n].expenseItems.splice(this.id,1),localStorage.setItem("users",JSON.stringify(e)),m.list(id("owner-acc-num").innerHTML.split(" ").join("")),v.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),v.list_users(),m.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),m.total_expenses(id("owner-acc-num").innerHTML.split(" ").join("")))}),a.appendChild(i),id("expense-table").appendChild(a)}}}]),m}(),v=function(){function _(){_classCallCheck(this,_)}return _createClass(_,null,[{key:"adminStorage",value:function(){var e=null===localStorage.getItem("admin")?[]:JSON.parse(localStorage.getItem("admin"));return e}},{key:"addAdmin",value:function(e){var n=_.adminStorage();n.push(e),localStorage.setItem("admin",JSON.stringify(n))}},{key:"userStorage",value:function(){var e=null===localStorage.getItem("users")?[]:JSON.parse(localStorage.getItem("users"));return e}},{key:"addUser",value:function(e){var n=_.userStorage();n.push(e),localStorage.setItem("users",JSON.stringify(n))}},{key:"add_connections",value:function(n,e,a){var t=_.userStorage(),o=t.findIndex(function(e){return e.accountNumber==n}),s=t.findIndex(function(e){return e.accountNumber==a});for(w=0;w<t[o].connections.length;w++)if(t[o].connections[w].accountNumber==a)return void alert("Connection already exists!");null==t[s]||""==t[s]?alert("User not found"):n==a?alert("Cannot add own account number!"):(t[o].connections.push({name:e,accountNumber:a}),remove_class(id("connections-form"),"show"),id("connections-form").reset(),localStorage.setItem("users",JSON.stringify(t)))}},{key:"list_connections",value:function(n){var a=_.userStorage(),t=a.findIndex(function(e){return e.accountNumber==n});if(null!=a[t])for(id("connections-table").innerHTML="",w=0;w<a[t].connections.length;w++){var e=create_el("tr"),o=create_el("td"),s=create_el("td"),r=create_el("td"),i=create_el("td");o.innerHTML=a[t].connections[w].name,e.appendChild(o),s.innerHTML=num_space(a[t].connections[w].accountNumber),_.click_copy(s),e.appendChild(s),r.innerHTML='<i id="'.concat(w,'" class="fas fa-edit"></i>'),add_event(r.querySelector("i"),"click",function(){return has_class(id("connections-form"),"show")||add_class(id("connections-form"),"show"),id("connections-name").value=a[t].connections[this.id].name,id("connections-account-num").value=a[t].connections[this.id].accountNumber,a[t].connections.splice(this.id,1),localStorage.setItem("users",JSON.stringify(a)),_.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""))}),e.appendChild(r),i.innerHTML='<i id="'.concat(w,'" class="fas fa-minus-circle"></i>'),add_event(i.querySelector("i"),"click",function(){var e=prompt('Are you sure to delete this connection?\nType "Y" for yes and "N" for no.',"N");return"y"==(null!=e?trim(e.toLowerCase()):console.clear())?(a[t].connections.splice(this.id,1),localStorage.setItem("users",JSON.stringify(a)),_.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""))):void 0}),e.appendChild(i),id("connections-table").appendChild(e)}}},{key:"click_copy",value:function(n){add_event(n,"click",function(){document.execCommand("copy")}),add_event(n,"copy",function(e){e.preventDefault(),e.clipboardData&&e.clipboardData.setData("text/plain",n.textContent)})}},{key:"individual_history",value:function(n){var e=_.userStorage(),a=e.findIndex(function(e){return e.accountNumber==n});if(null!=e[a])for(id("owner-transaction").innerHTML="",w=0;w<e[a].userTransactionHistory.length;w++){var t=create_el("li"),o=create_el("li");1==e[a].userTransactionHistory.length&&(o.innerHTML="No other transactions yet.",id("owner-transaction").appendChild(o)),t.innerHTML=e[a].userTransactionHistory[w],add_class(t,"mb-05"),id("owner-transaction").appendChild(t)}}},{key:"login_user",value:function(o,n){var a=_.adminStorage(),t=_.userStorage(),s=t.findIndex(function(e){return e.username==o}),e=t.findIndex(function(e){return e.password==n});if(remove_class(document.body,"modal-open"),a[0].username==o&&a[0].password==n)toggle_class(id("modal"),"hide"),add_class(id("expense-wrap"),"hide"),add_class(id("connections-wrap"),"hide"),id("withdraw-account").removeAttribute("value"),id("deposit-account").removeAttribute("value"),id("sender-account").removeAttribute("value"),add_event(id("admin-settings-form"),"submit",function(e){if(e.preventDefault(),a[0].password!=inner(id("admin-old-password").value))alert("Old password wrong!");else if(inner(id("admin-old-password").value)==inner(id("admin-confirm-new-password").value))alert("There have been no changes made for the password!");else if(inner(id("admin-new-password").value)!=inner(id("admin-confirm-new-password").value))alert("New password entries do not match!");else if(inner(id("admin-confirm-new-password").value).length<5){var n=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=n?n.toLowerCase():console.clear()))return;a[0].password=inner(id("admin-confirm-new-password").value),id("admin-settings-form").reset(),remove_class(id("admin-change-match-msg"),"fa-check"),remove_class(id("admin-change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("admin",JSON.stringify(a))}else a[0].password=inner(id("admin-confirm-new-password").value),id("admin-settings-form").reset(),remove_class(id("admin-change-match-msg"),"fa-check"),remove_class(id("admin-change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("admin",JSON.stringify(a));return!1});else if(t[s]&&t[e]&&s==e){for(add_class(document.body,"user"),w=0;w<t.length;w++)t[w].username==o&&t[w].password==n&&(setTimeout(function(){toggle_class(id("modal"),"hide"),add_class(id("withdraw-form"),"hide"),add_class(id("deposit-form"),"hide"),add_class(id("send-form"),"hide")},250),add_class(id("admin-settings-form"),"hide"),add_class(id("user-settings-form"),"show"),add_class(id("accounts-wrap"),"hide"),add_class(id("add-newaccount-wrap"),"hide"));id("owner").innerHTML="".concat(t[s].firstName," ").concat(t[s].middleName," ").concat(t[s].lastName),id("owner-acc-num").innerHTML=num_space(t[s].accountNumber),_.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),id("profile-name").innerHTML="".concat(t[s].firstName," ").concat(t[s].middleName," ").concat(t[s].lastName),id("profile-acc-type").innerHTML=t[s].accountType,id("profile-username").innerHTML=t[s].username,id("profile-email").innerHTML=t[s].email,id("profile-gender").innerHTML=t[s].gender.substring(0,1).toUpperCase()+t[s].gender.substring(1).toLowerCase(),add_att(id("withdraw-account"),"value",id("owner-acc-num").innerHTML),add_att(id("deposit-account"),"value",id("owner-acc-num").innerHTML),add_att(id("sender-account"),"value",id("owner-acc-num").innerHTML),add_event(id("change-email-form"),"submit",function(e){return e.preventDefault(),t[s].email==inner(trim(id("change-email").value))?alert("There have been no changes made for the email!"):(t[s].email=inner(trim(id("change-email").value)),id("profile-email").innerHTML=inner(trim(id("change-email").value)),alert("Change email successful!"),localStorage.setItem("users",JSON.stringify(t))),id("change-email-form").reset(),!1}),add_event(id("change-username-form"),"submit",function(e){for(e.preventDefault(),w=0;w<t.length;w++)if(t[w].username==inner(trim(id("change-username").value)))return void alert("Username already used!");return id("change-username").value.length<5?alert("Username cannot be less than 5 characters!"):(t[s].username=inner(trim(id("change-username").value)),id("profile-username").innerHTML=inner(trim(id("change-username").value)),alert("Change username successful!"),localStorage.setItem("users",JSON.stringify(t))),id("change-username-form").reset(),!1}),add_event(id("change-password-form"),"submit",function(e){if(e.preventDefault(),t[s].password!=inner(id("old-password").value))alert("Old password wrong!");else if(inner(id("old-password").value)==inner(id("confirm-new-password").value))alert("There have been no changes made for the password!");else if(inner(id("new-password").value)!=inner(id("confirm-new-password").value))alert("New password entries do not match!");else if(inner(id("confirm-new-password").value).length<5){var n=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=n?trim(n.toLowerCase()):console.clear()))return;t[s].password=inner(id("confirm-new-password").value),id("change-password-form").reset(),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("users",JSON.stringify(t))}else t[s].password=inner(id("confirm-new-password").value),id("change-password-form").reset(),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("users",JSON.stringify(t));return!1}),add_event(id("clear-items-btn"),"click",function(){var e=_.userStorage(),n=e.findIndex(function(e){return e.username==o});if(0!=e[n].expenseItems.length){var a=prompt('Are you sure to delete all items?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=a?trim(a.toLowerCase()):console.clear()))return;var t=0;e[n].gender;for(w=0;w<e[n].expenseItems.length;w++)t=parseFloat(t+parseFloat(e[n].expenseItems[w].cost));e[n].budget=parseFloat(parseFloat(e[n].budget)+t),e[n].expenseItems=[],localStorage.setItem("users",JSON.stringify(e)),g.list(id("owner-acc-num").innerHTML.split(" ").join("")),_.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),g.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),g.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""))}})}else t[s]?alert("Username and password do not match!"):alert("User does not exist!");setTimeout(function(){id("login-form").reset()},500)}},{key:"signup_user",value:function(n,a,t,e,o,s,r,i,c){var l=_.userStorage(),d=l.findIndex(function(e){return e.firstName==n}),u=l.findIndex(function(e){return e.middleName==a}),m=l.findIndex(function(e){return e.lastName==t}),f=l.findIndex(function(e){return e.accountNumber==c}),p=l.findIndex(function(e){return e.username==o}),g=l.findIndex(function(e){return e.password==s}),v=l.findIndex(function(e){return e.email==i});if(l[f].signedUp)return toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),alert("You have already signed up!"),void id("signup-form").reset();for(w=0;w<l.length;w++)if(l[w].username==o)return void alert("Username already used!");if(null==l[d]||""==l[d]||null==l[u]||""==l[u]||null==l[m]||""==l[m]||l[f].gender!=e||null==l[f]||""==l[f])alert("User not found!");else if(o.length<5)alert("Username cannot be less than 5 characters!");else if(s!=r)alert("Password entries do not match!");else if(r.length<5){var h=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=h?trim(h.toLowerCase()):console.clear())||null!=l[p]&&""!=l[p]&&null!=l[g]&&""!=l[g]&&null!=l[v]&&""!=l[v])return;toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),l[f].username=o,l[f].password=r,l[f].email=i,l[f].signedUp=!0,alert("You have successfuly signed up!"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),id("signup-form").reset()}else null!=l[p]&&""!=l[p]&&null!=l[g]&&""!=l[g]&&null!=l[v]&&""!=l[v]||(toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),l[f].username=o,l[f].password=r,l[f].email=i,l[f].signedUp=!0,alert("You have successfuly signed up!"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),id("signup-form").reset());localStorage.setItem("users",JSON.stringify(l))}},{key:"time_stamp",value:function(){var e=new Date,n=e.getMonth()<10?"0".concat(e.getMonth()+1):e.getMonth()+1,a=e.getDate()<10?"0".concat(e.getDate()):e.getDate(),t="".concat(n,"/").concat(a,"/").concat(e.getFullYear()),o=e.getHours()<10?"0".concat(e.getHours()):e.getHours(),s=e.getMinutes()<10?"0".concat(e.getMinutes()):e.getMinutes(),r=e.getSeconds()<10?"0".concat(e.getSeconds()):e.getSeconds(),i="".concat(o,":").concat(s,":").concat(r);return"".concat(t," - ").concat(i)}},{key:"withdraw",value:function(n,e){var a,t,o=_.userStorage(),s=o.findIndex(function(e){return e.accountNumber==n});null==o[s]||""==o[s]?alert("User not found!"):parseFloat(o[s].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(a="male"==o[s].gender?"His":"Her",o[s].balance=parseFloat(parseFloat(o[s].balance)-parseFloat(e)).toFixed(2),o[s].budget=parseFloat(parseFloat(o[s].budget)-parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(o[s].balance)+parseFloat(e)).toFixed(2),o[s].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Withdrawal transaction amounting to <strong>₱").concat(num_commas(e),"</strong> from <strong>").concat(o[s].firstName,"</strong>'s account has been successful. ").concat(a," remaining account balance is now <strong>₱").concat(num_commas(o[s].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(t),"</strong>.")),o[s].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Withdrawal transaction amounting to <strong>₱").concat(num_commas(e),"</strong> from your account has been successful. Your remaining account balance is now <strong>₱").concat(num_commas(o[s].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(t),"</strong>.")),alert("Withdrawal transaction has been successful!"),localStorage.setItem("users",JSON.stringify(o)))}},{key:"deposit",value:function(n,e){var a,t,o=_.userStorage(),s=o.findIndex(function(e){return e.accountNumber==n});null==o[s]||""==o[s]?alert("User not found!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(a="male"==o[s].gender?"His":"Her",o[s].balance=parseFloat(parseFloat(o[s].balance)+parseFloat(e)).toFixed(2),o[s].budget=parseFloat(parseFloat(o[s].budget)+parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(o[s].balance)-parseFloat(e)).toFixed(2),o[s].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Deposit transaction amounting to <strong>₱").concat(num_commas(e),"</strong> into <strong>").concat(o[s].firstName,"</strong>'s account has been successful. ").concat(a," account balance is now <strong>₱").concat(num_commas(o[s].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(t),"</strong>.")),o[s].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Deposit transaction amounting to <strong>₱").concat(num_commas(e),"</strong> into your account has been successful. Your account balance is now <strong>₱").concat(num_commas(o[s].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(t),"</strong>.")),alert("Deposit transaction account has been successful!"),localStorage.setItem("users",JSON.stringify(o)))}},{key:"send",value:function(n,a,e){var t,o,s,r,i=_.userStorage(),c=i.findIndex(function(e){return e.accountNumber==n}),l=i.findIndex(function(e){return e.accountNumber==a});null!=i[c]&&""!=i[c]||null!=i[l]&&""!=i[l]?null==i[c]||""==i[c]?alert("Sender's account not found!"):null==i[l]||""==i[l]?alert("Receiver's account not found!"):parseFloat(i[c].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):i[c].accountNumber==i[l].accountNumber?alert("Account number entries are not allowed!"):(t="male"==i[c].gender?"his":"her",o="male"==i[l].gender?"his":"her",i[c].balance=parseFloat(parseFloat(i[c].balance)-parseFloat(e)).toFixed(2),i[c].budget=parseFloat(parseFloat(i[c].budget)-parseFloat(e)).toFixed(2),s=parseFloat(parseFloat(i[c].balance)+parseFloat(e)).toFixed(2),i[c].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(num_commas(e),"</strong> from <strong>").concat(i[c].firstName,"</strong>'s account into ").concat(i[l].firstName,"'s account has been successful. <strong>").concat(i[c].firstName,"</strong>'s remaining account balance is now <strong>₱").concat(num_commas(i[c].balance),"</strong> from ").concat(t," previous account balance of <strong>₱").concat(num_commas(s),"</strong>.")),i[c].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(num_commas(e),"</strong> from your account into ").concat(i[l].firstName,"'s account has been successful. Your remaining account balance is now <strong>₱").concat(num_commas(i[c].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(s),"</strong>.")),i[l].balance=parseFloat(parseFloat(i[l].balance)+parseFloat(e)).toFixed(2),r=parseFloat(parseFloat(i[l].balance)-parseFloat(e)).toFixed(2),i[l].transactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(num_commas(e),"</strong> from ").concat(i[c].firstName,"'s account into <strong>").concat(i[l].firstName,"</strong>'s account has been successful. <strong>").concat(i[l].firstName,"</strong>'s account balance is now <strong>₱").concat(num_commas(i[l].balance),"</strong> from ").concat(o," previous account balance of <strong>₱").concat(num_commas(r),"</strong>.")),i[l].userTransactionHistory.unshift("<em>".concat(_.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(num_commas(e),"</strong> from ").concat(i[c].firstName,"'s account into your account has been successful. Your account balance is now <strong>₱").concat(num_commas(i[l].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(r),"</strong>.")),alert("Money transfer has been successful!"),localStorage.setItem("users",JSON.stringify(i))):alert("Users not found!")}},{key:"get_balance",value:function(n,e){var a=_.userStorage(),t=a.findIndex(function(e){return e.accountNumber==n}),o=create_el("td");a[t]&&(o.innerHTML="₱".concat(num_commas(a[t].balance)),e.appendChild(o))}},{key:"list_users",value:function(){var u=_.userStorage();id("acc-table").innerHTML="";for(w=0;w<u.length;w++)!function(){var e=create_el("tr"),n=create_el("td"),a=create_el("td"),t=create_el("span"),o=create_el("td"),s=create_el("td"),r=create_el("div"),i=create_el("i"),c=create_el("ul"),l=create_el("li");for(n.innerHTML=num_space(u[w].accountNumber),e.appendChild(n),_.click_copy(n),t.innerHTML="".concat(u[w].firstName," ").concat(u[w].middleName," ").concat(u[w].lastName),add_event(t,"click",function(){add_class(document.body,"show"),add_class(r,"show")}),add_class(i,"far"),add_class(i,"fa-times-circle"),add_class(i,"fa-2x"),add_class(c,"xbul"),add_class(c,"wrap-scroll"),add_event(i,"click",function(){remove_class(document.body,"show"),remove_class(r,"show")}),1==u[w].transactionHistory.length&&(l.innerHTML="No other transactions yet.",c.appendChild(l)),m=0;m<u[w].transactionHistory.length;m++){var d=create_el("li");d.innerHTML=u[w].transactionHistory[m],add_class(d,"mb-05"),c.appendChild(d)}r.appendChild(i),r.appendChild(c),a.appendChild(t),a.appendChild(r),e.appendChild(a),o.innerHTML=u[w].accountType,e.appendChild(o),s.innerHTML='<i id="'.concat(u.indexOf(u[w]),'" class="fas fa-minus-circle"></i>'),add_event(s.querySelector("i"),"click",function(){var e=prompt('Are you sure to delete this account?\nType "Y" for yes and "N" for no.',"N");"y"==(null!=e?trim(e.toLowerCase()):console.clear())&&(u.splice(this.id,1),localStorage.setItem("users",JSON.stringify(u)),_.list_users())}),_.get_balance(u[w].accountNumber,e),e.appendChild(s),add_class(e,u[w].accountType.toLowerCase()),id("acc-table").appendChild(e)}()}},{key:"first_char",value:function(){qsel_all("[id*='-name']").forEach(function(e){add_event(e,"keyup",function(){0<e.value.length&&!(31<e.value.charCodeAt(0)&&(e.value.charCodeAt(0)<48||57<e.value.charCodeAt(0)))&&(alert("Invalid input!"),e.value="")})})}},{key:"negative_char",value:function(){qsel_all("[id*='-amount']").forEach(function(n){add_event(n,"keyup",function(e){189==(e.which||e.keyCode)&&(alert("Amount cannot be negative!"),n.id.includes("dec")?n.value="00":n.value="")})})}},{key:"num_only",value:function(){qsel_all("[id*='-account']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")}),qsel_all("[id*='-amount']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")})}},{key:"type_comma",value:function(){qsel_all("[id*='-amount']").forEach(function(n){add_event(n,"keyup",function(e){37<=e.which&&e.which<=40||37<=e.keyCode&&e.keyCode<=40||(n.value=n.value.replace(/,/gi,"").split(/(?=(?:\d{3})+$)/).join(","))})})}},{key:"dec_addZero",value:function(){qsel_all("[id*='-dec']").forEach(function(e){add_event(e,"change",function(){isNaN(e.value)||1!=e.value.length||(e.value="0".concat(e.value))})})}},{key:"password_match",value:function(e,n,a){add_event(e,"keyup",function(){this.value==n.value&&0!=this.value.length?(remove_class(a,"fa-times"),add_class(a,"fa-check")):this.value!=n.value&&1<=n.value.length?(remove_class(a,"fa-check"),add_class(a,"fa-times")):0==this.value.length&&(remove_class(a,"fa-check"),remove_class(a,"fa-times"))}),add_event(n,"keyup",function(){this.value==e.value&&0!=this.value.length?(remove_class(a,"fa-times"),add_class(a,"fa-check")):this.value!=e.value&&1<=e.value.length?(remove_class(a,"fa-check"),add_class(a,"fa-times")):0==this.value.length&&(remove_class(a,"fa-check"),remove_class(a,"fa-times"))})}},{key:"reset",value:function(){qsel_all("form").forEach(function(e){e.reset()})}}]),_}();add_class(document.body,"modal-open"),match_height(".mh"),v.list_users(),v.first_char(),v.negative_char(),v.num_only(),v.type_comma(),v.dec_addZero(),v.password_match(id("signup-password"),id("signup-confirm-password"),id("match-msg")),v.password_match(id("admin-new-password"),id("admin-confirm-new-password"),id("admin-change-match-msg")),v.password_match(id("new-password"),id("confirm-new-password"),id("change-match-msg"));var e,n,a,o,s,r;n=e="admin",a="1",s=v.adminStorage(),r=s.findIndex(function(e){return e.adminId==a}),s[r]||(o=new t(e,n,a),v.addAdmin(o));function l(e,n,a,t,o,s,r,i,c,l,d){var u,m=v.userStorage(),f=m.findIndex(function(e){return e.firstName==o}),p=m.findIndex(function(e){return e.lastName==r});m[f]&&m[p]?alert("User already exists!"):((u=new g(e,n,a,t,o,s,r,i,c,l,d)).transactionHistory.push("<em>".concat(v.time_stamp(),"</em> : Opened a ").concat(u.accountType.toLowerCase()," account for <strong>").concat(u.firstName,"</strong> ").concat(u.middleName," ").concat(u.lastName," with an initial account balance of <strong>₱").concat(num_commas(u.balance),"</strong>.")),u.userTransactionHistory.push("<em>".concat(v.time_stamp(),"</em> : You have opened a ").concat(u.accountType.toLowerCase()," account with an initial account balance of <strong>₱").concat(num_commas(u.balance),"</strong>.")),v.addUser(u))}add_event(id("load-data-btn"),"click",function(){var e=v.userStorage(),n=e.findIndex(function(e){return"JANE"==e.firstName}),a=e.findIndex(function(e){return"DOE"==e.lastName}),t=e.findIndex(function(e){return"JUAN"==e.firstName}),o=e.findIndex(function(e){return"DELA CRUZ"==e.lastName}),s=e.findIndex(function(e){return"JUANITA"==e.firstName}),r=e.findIndex(function(e){return"SAMONTE"==e.lastName}),i=e.findIndex(function(e){return"JOHN"==e.firstName}),c=e.findIndex(function(e){return"SCHMOE"==e.lastName});e[n]||e[a]||l("janedoe","janedoe","janedoe@mail.com",!0,"JANE","HILLS","DOE","female","023451282250","Checking",7200.05.toFixed(2)),e[t]||e[o]||l("juandelacruz","juandelacruz","juandelacruz@mail.com",!0,"JUAN","","DELA CRUZ","male","071096025466","Savings",2700..toFixed(2)),e[s]||e[r]||l("","","",!5200.5,"JUANITA","HERMAN","SAMONTE","female","031734218924","Checking",5200.5.toFixed(2)),e[i]||e[c]||l("","","",!2500,"JOHN","","SCHMOE","male","064581565583","Savings",2500..toFixed(2)),v.list_users()}),add_event(id("clear-all-btn"),"click",function(){if(0!=v.userStorage().length){var e=prompt('Are you sure to delete all stored datas?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=e?trim(e.toLowerCase()):console.clear()))return;localStorage.removeItem("users"),v.list_users()}}),add_event(id("add-form"),"submit",function(e){e.preventDefault();var n=id("male").checked?"male":"female",a=id("savings").checked?["05","06","07","08","09"]:["00","01","02","03","04"],t=id("savings").checked?"Savings":"Checking",o=id("savings").checked?2e3:5e3,s=0==id("add-deposit-amount").value.length?"0":id("add-deposit-amount").value.split(",").join(""),r="".concat(s,".").concat(id("add-deposit-amount-dec").value);return l("","","",!1,inner(trim(id("add-first-name").value.toUpperCase())),inner(trim(id("add-middle-name").value.toUpperCase())),inner(trim(id("add-last-name").value.toUpperCase())),n,a[rand(a.length)]+(rand(9e9)+1e9),t,parseFloat(o+parseFloat(r)).toFixed(2)),v.list_users(),alert("".concat(inner(trim(id("add-first-name").value.toUpperCase())),"'s account have been successfully created!")),id("add-form").reset(),!1}),add_event(id("login-form"),"submit",function(e){e.preventDefault();var n,a=v.userStorage(),t=a.findIndex(function(e){return e.accountNumber="023451282250"});return a[t]&&(n=a[t].connections.findIndex(function(e){return"071096025466"==e.accountNumber}),a[t].connections[n]||(a[t].connections.push({name:"JUAN",accountNumber:"071096025466"}),localStorage.setItem("users",JSON.stringify(a)))),v.login_user(inner(trim(id("login-username").value)),inner(trim(id("login-password").value))),v.list_connections(id("owner-acc-num").innerHTML.split(" ").join("")),g.list(id("owner-acc-num").innerHTML.split(" ").join("")),g.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),g.total_expenses(id("owner-acc-num").innerHTML.split(" ").join("")),!1}),add_event(id("log-out-btn"),"click",function(e){return e.preventDefault(),toggle_class(id("modal"),"hide"),setTimeout(function(){for(add_class(document.body,"modal-open"),remove_class(document.body,"user"),remove_class(id("accounts-wrap"),"hide"),remove_class(id("search-wrap"),"active"),id("search-name").value="",id("filter").value="all",w=0;w<id("acc-table").querySelectorAll("tr").length;w++)remove_class(id("acc-table").querySelectorAll("tr")[w],"hide"),remove_class(id("acc-table").querySelectorAll("tr")[w],"search-hide");remove_class(id("expense-wrap"),"hide"),remove_class(id("connections-wrap"),"hide"),remove_class(id("connections-form"),"show"),remove_class(id("add-newaccount-wrap"),"hide"),remove_class(id("withdraw-form"),"hide"),remove_class(id("deposit-form"),"hide"),remove_class(id("send-form"),"hide"),remove_class(id("open-add-form-btn"),"active"),remove_class(id("connections-form"),"show"),remove_class(id("open-connections-wrap-btn"),"active"),remove_class(id("open-withdraw-form-btn"),"active"),remove_class(id("open-deposit-form-btn"),"active"),remove_class(id("open-send-form-btn"),"active")},500),remove_class(id("admin-settings-form"),"hide"),remove_class(id("user-settings-form"),"show"),v.reset(),!1}),add_event(id("open-signup-btn"),"click",function(){toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show")}),add_event(id("signup-form"),"submit",function(e){e.preventDefault();var n=id("signup-male").checked?"male":"female";return v.signup_user(inner(trim(id("signup-first-name").value.toUpperCase())),inner(trim(id("signup-middle-name").value.toUpperCase())),inner(trim(id("signup-last-name").value.toUpperCase())),n,inner(trim(id("signup-username").value)),inner(id("signup-password").value),inner(id("signup-confirm-password").value),inner(trim(id("signup-email").value)),id("signup-account-num").value.split(" ").join("")),!1}),add_event(id("back-signup-btn"),"click",function(){toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),v.reset()}),add_event(id("open-search-btn"),"click",function(){for(toggle_class(id("search-wrap"),"active"),id("search-name").value="",w=0;w<id("acc-table").querySelectorAll("tr").length;w++)remove_class(id("acc-table").querySelectorAll("tr")[w],"search-hide");setTimeout(function(){id("search-name").focus()},100)}),add_event(id("search-name"),"keyup",function(){for(w=0;w<id("acc-table").querySelectorAll("tr").length;w++)id("acc-table").querySelectorAll("tr")[w].querySelectorAll("td")[1].querySelector("span")&&(-1<id("acc-table").querySelectorAll("tr")[w].querySelectorAll("td")[1].querySelector("span").innerHTML.toUpperCase().indexOf(id("search-name").value.toUpperCase())?remove_class:add_class)(id("acc-table").querySelectorAll("tr")[w],"search-hide")}),add_event(id("filter"),"click",function(){if("all"==id("filter").value)for(w=0;w<id("acc-table").querySelectorAll("tr").length;w++)remove_class(id("acc-table").querySelectorAll("tr")[w],"hide");else if("savings"==id("filter").value)for(w=0;w<id("acc-table").querySelectorAll("tr").length;w++)(has_class(id("acc-table").querySelectorAll("tr")[w],"checking")?add_class:remove_class)(id("acc-table").querySelectorAll("tr")[w],"hide");else for(w=0;w<id("acc-table").querySelectorAll("tr").length;w++)(has_class(id("acc-table").querySelectorAll("tr")[w],"savings")?add_class:remove_class)(id("acc-table").querySelectorAll("tr")[w],"hide")}),add_event(id("settings-btn"),"click",function(){add_class(id("settings-modal"),"show")}),add_event(id("close-settings-btn"),"click",function(){remove_class(id("settings-modal"),"show"),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),remove_class(id("admin-change-match-msg"),"fa-check"),remove_class(id("admin-change-match-msg"),"fa-times"),v.reset()}),add_event(id("owner-transaction-btn"),"click",function(){add_class(id("owner-transaction-modal"),"show")}),add_event(id("close-owner-transaction-btn"),"click",function(){remove_class(id("owner-transaction-modal"),"show")}),add_event(id("owner"),"click",function(){add_class(id("profile-modal"),"show")}),add_event(id("close-profile-btn"),"click",function(){remove_class(id("profile-modal"),"show")}),add_event(id("add-expense-form"),"submit",function(e){e.preventDefault();var n="".concat(id("add-expense-amount").value.split(",").join(""),".").concat(id("add-expense-amount-dec").value);return g.add(inner(trim(id("add-expense-name").value.toUpperCase())),n,id("owner-acc-num").innerHTML.split(" ").join("")),g.list(id("owner-acc-num").innerHTML.split(" ").join("")),v.list_users(),v.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),g.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),g.total_expenses(id("owner-acc-num").innerHTML.split(" ").join("")),!1}),add_event(id("add-connections-btn"),"click",function(){toggle_class(id("connections-form"),"show"),id("connections-form").reset()}),add_event(id("connections-form"),"submit",function(e){return e.preventDefault(),v.add_connections(id("owner-acc-num").innerHTML.split(" ").join(""),inner(trim(id("connections-name").value.toUpperCase())),id("connections-account-num").value.split(" ").join("")),v.list_connections(id("owner-acc-num").innerHTML.split(" ").join("")),!1}),add_event(id("withdraw-form"),"submit",function(e){e.preventDefault();var n="".concat(id("withdraw-amount").value.split(",").join(""),".").concat(id("withdraw-amount-dec").value);return v.withdraw(id("withdraw-account").value.split(" ").join(""),n),v.list_users(),v.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),g.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),id("withdraw-form").reset(),!1}),add_event(id("deposit-form"),"submit",function(e){e.preventDefault();var n="".concat(id("deposit-amount").value.split(",").join(""),".").concat(id("deposit-amount-dec").value);return v.deposit(id("deposit-account").value.split(" ").join(""),n),v.list_users(),v.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),g.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),id("deposit-form").reset(),!1}),add_event(id("send-form"),"submit",function(e){e.preventDefault();var n="".concat(id("send-amount").value.split(",").join(""),".").concat(id("send-amount-dec").value);return v.send(id("sender-account").value.split(" ").join(""),id("receiver-account").value.split(" ").join(""),n),v.list_users(),v.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),g.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),id("send-form").reset(),!1}),add_event(id("open-add-form-btn"),"click",function(){toggle_class(this,"active"),remove_class(id("open-connections-wrap-btn"),"active"),remove_class(id("open-withdraw-form-btn"),"active"),remove_class(id("open-deposit-form-btn"),"active"),remove_class(id("open-send-form-btn"),"active")}),add_event(id("open-connections-wrap-btn"),"click",function(){toggle_class(this,"active"),remove_class(id("open-add-form-btn"),"active"),toggle_class(id("connections-form"),"show"),remove_class(id("open-withdraw-form-btn"),"active"),remove_class(id("open-deposit-form-btn"),"active"),remove_class(id("open-send-form-btn"),"active")}),add_event(id("open-withdraw-form-btn"),"click",function(){toggle_class(this,"active"),remove_class(id("open-add-form-btn"),"active"),remove_class(id("open-connections-wrap-btn"),"active"),remove_class(id("connections-form"),"show"),remove_class(id("open-deposit-form-btn"),"active"),remove_class(id("open-send-form-btn"),"active")}),add_event(id("open-deposit-form-btn"),"click",function(){toggle_class(this,"active"),remove_class(id("open-add-form-btn"),"active"),remove_class(id("open-connections-wrap-btn"),"active"),remove_class(id("connections-form"),"show"),remove_class(id("open-withdraw-form-btn"),"active"),remove_class(id("open-send-form-btn"),"active")}),add_event(id("open-send-form-btn"),"click",function(){toggle_class(this,"active"),remove_class(id("open-add-form-btn"),"active"),remove_class(id("open-connections-wrap-btn"),"active"),remove_class(id("connections-form"),"show"),remove_class(id("open-withdraw-form-btn"),"active"),remove_class(id("open-deposit-form-btn"),"active")})});
"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperties(e,n){for(var a=0;a<n.length;a++){var t=n[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,a){return n&&_defineProperties(e.prototype,n),a&&_defineProperties(e,a),e}function _possibleConstructorReturn(e,n){return!n||"object"!==_typeof(n)&&"function"!=typeof n?_assertThisInitialized(e):n}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&_setPrototypeOf(e,n)}function _setPrototypeOf(e,n){return(_setPrototypeOf=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var i,j,Admin=function e(n,a,t){_classCallCheck(this,e),this.username=n,this.password=a,this.adminId=t},ExpenseItem=function e(n,a,t){_classCallCheck(this,e),this.name=n,this.cost=a,this.owner=t},User=function(){function m(e,n,a,t,o,s,r,i,c,l,u){var d;return _classCallCheck(this,m),(d=_possibleConstructorReturn(this,_getPrototypeOf(m).call(this,e,n))).email=a,d.firstName=o,d.middleName=s,d.lastName=r,d.gender=i,d.accountNumber=c,d.accountType=l,d.balance=u,d.budget=u,d.signedUp=t,d.transactionHistory=[],d.userTransactionHistory=[],d.expenseItems=[],d.connections=[],d}return _inherits(m,Admin),_createClass(m,null,[{key:"get_budget",value:function(n){var e=FnHandler.userStorage(),a=e.findIndex(function(e){return e.accountNumber==n});null!=e[a]&&(id("owner-balance").innerHTML="",id("owner-balance").innerHTML=num_commas(e[a].budget),(e[a].budget<0?add_class:remove_class)(id("budget"),"negative"))}},{key:"total_expenses",value:function(n){var e=FnHandler.userStorage(),a=e.findIndex(function(e){return e.accountNumber==n}),t=0;if(null!=e[a]){for(id("owner-expenses").innerHTML="",i=0;i<e[a].expenseItems.length;i++)t=parseFloat(t+parseFloat(e[a].expenseItems[i].cost));id("owner-expenses").innerHTML=num_commas(t.toFixed(2))}}},{key:"add",value:function(n,e,a){var t,o=FnHandler.userStorage(),s=o.findIndex(function(e){return e.accountNumber==a}),r=o[s].expenseItems.findIndex(function(e){return e.name==n});o[s].expenseItems[r]?alert("Expense item already exists!"):(t=new ExpenseItem(n,e,a),o[s].budget=parseFloat(parseFloat(o[s].budget)-parseFloat(e)).toFixed(2),o[s].expenseItems.push(t),localStorage.setItem("users",JSON.stringify(o)),id("add-expense-form").reset())}},{key:"list",value:function(t){var e=FnHandler.userStorage(),n=e.findIndex(function(e){return e.accountNumber==t});if(null!=e[n])for(id("expense-table").innerHTML="",i=0;i<e[n].expenseItems.length;i++){var a=create_el("tr"),o=create_el("td"),s=create_el("td"),r=create_el("td"),c=create_el("td");o.innerHTML=e[n].expenseItems[i].name,a.appendChild(o),s.innerHTML="₱".concat(num_commas(e[n].expenseItems[i].cost)),a.appendChild(s),r.innerHTML='<i id="'.concat(i,'" class="fas fa-edit"></i>'),add_event(r.querySelector("i"),"click",function(){var e=FnHandler.userStorage(),n=e.findIndex(function(e){return e.accountNumber==t});id("add-expense-name").value=e[n].expenseItems[this.id].name,id("add-expense-amount").value=num_commas(e[n].expenseItems[this.id].cost.split(".")[0]),id("add-expense-amount-dec").value=e[n].expenseItems[this.id].cost.split(".")[1],e[n].budget=parseFloat(parseFloat(e[n].budget)+parseFloat(e[n].expenseItems[this.id].cost)).toFixed(2),e[n].expenseItems.splice(this.id,1),localStorage.setItem("users",JSON.stringify(e)),m.list(id("owner-acc-num").innerHTML.split(" ").join("")),FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),FnHandler.list_users(),m.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),m.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""))}),a.appendChild(r),c.innerHTML='<i id="'.concat(i,'" class="fas fa-minus-circle"></i>'),add_event(c.querySelector("i"),"click",function(){var e=FnHandler.userStorage(),n=e.findIndex(function(e){return e.accountNumber==t}),a=prompt('Are you sure to delete this item?\n Type "Y" for yes and "N" for no.',"N");"y"==(null!=a?trim(a.toLowerCase()):console.clear())&&(e[n].budget=parseFloat(parseFloat(e[n].budget)+parseFloat(e[n].expenseItems[this.id].cost)).toFixed(2),e[n].expenseItems.splice(this.id,1),localStorage.setItem("users",JSON.stringify(e)),m.list(id("owner-acc-num").innerHTML.split(" ").join("")),FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),FnHandler.list_users(),m.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),m.total_expenses(id("owner-acc-num").innerHTML.split(" ").join("")))}),a.appendChild(c),id("expense-table").appendChild(a)}}}]),m}(),FnHandler=function(){function y(){_classCallCheck(this,y)}return _createClass(y,null,[{key:"adminStorage",value:function(){var e=null===localStorage.getItem("admin")?[]:JSON.parse(localStorage.getItem("admin"));return e}},{key:"addAdmin",value:function(e){var n=y.adminStorage();n.push(e),localStorage.setItem("admin",JSON.stringify(n))}},{key:"userStorage",value:function(){var e=null===localStorage.getItem("users")?[]:JSON.parse(localStorage.getItem("users"));return e}},{key:"addUser",value:function(e){var n=y.userStorage();n.push(e),localStorage.setItem("users",JSON.stringify(n))}},{key:"add_connections",value:function(n,e,a){var t=y.userStorage(),o=t.findIndex(function(e){return e.accountNumber==n}),s=t.findIndex(function(e){return e.accountNumber==a});for(i=0;i<t[o].connections.length;i++)if(t[o].connections[i].accountNumber==a)return void alert("Connection already exists!");null==t[s]||""==t[s]?alert("User not found"):n==a?alert("Cannot add own account number!"):(t[o].connections.push({name:e,accountNumber:a}),remove_class(id("connections-form"),"show"),id("connections-form").reset(),localStorage.setItem("users",JSON.stringify(t)))}},{key:"list_connections",value:function(n){var a=y.userStorage(),t=a.findIndex(function(e){return e.accountNumber==n});if(null!=a[t])for(id("connections-table").innerHTML="",i=0;i<a[t].connections.length;i++){var e=create_el("tr"),o=create_el("td"),s=create_el("td"),r=create_el("td"),c=create_el("td");o.innerHTML=a[t].connections[i].name,e.appendChild(o),s.innerHTML=num_space(a[t].connections[i].accountNumber),y.click_copy(s),e.appendChild(s),r.innerHTML='<i id="'.concat(i,'" class="fas fa-edit"></i>'),add_event(r.querySelector("i"),"click",function(){return has_class(id("connections-form"),"show")||add_class(id("connections-form"),"show"),id("connections-name").value=a[t].connections[this.id].name,id("connections-account-num").value=a[t].connections[this.id].accountNumber,a[t].connections.splice(this.id,1),localStorage.setItem("users",JSON.stringify(a)),y.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""))}),e.appendChild(r),c.innerHTML='<i id="'.concat(i,'" class="fas fa-minus-circle"></i>'),add_event(c.querySelector("i"),"click",function(){var e=prompt('Are you sure to delete this connection?\nType "Y" for yes and "N" for no.',"N");return"y"==(null!=e?trim(e.toLowerCase()):console.clear())?(a[t].connections.splice(this.id,1),localStorage.setItem("users",JSON.stringify(a)),y.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""))):void 0}),e.appendChild(c),id("connections-table").appendChild(e)}}},{key:"click_copy",value:function(n){add_event(n,"click",function(){document.execCommand("copy")}),add_event(n,"copy",function(e){e.preventDefault(),e.clipboardData&&e.clipboardData.setData("text/plain",n.textContent)})}},{key:"individual_history",value:function(n){var e=y.userStorage(),a=e.findIndex(function(e){return e.accountNumber==n});if(null!=e[a])for(id("owner-transaction").innerHTML="",i=0;i<e[a].userTransactionHistory.length;i++){var t=create_el("li"),o=create_el("li");1==e[a].userTransactionHistory.length&&(o.innerHTML="No other transactions yet.",id("owner-transaction").appendChild(o)),t.innerHTML=e[a].userTransactionHistory[i],add_class(t,"mb-05"),id("owner-transaction").appendChild(t)}}},{key:"login_user",value:function(o,n){var a=y.adminStorage(),t=y.userStorage(),s=t.findIndex(function(e){return e.username==o}),e=t.findIndex(function(e){return e.password==n});if(remove_class(document.body,"modal-open"),a[0].username==o&&a[0].password==n)toggle_class(id("modal"),"hide"),add_class(id("expense-wrap"),"hide"),add_class(id("connections-wrap"),"hide"),id("withdraw-account").removeAttribute("value"),id("deposit-account").removeAttribute("value"),id("sender-account").removeAttribute("value"),add_event(id("admin-settings-form"),"submit",function(e){if(e.preventDefault(),a[0].password!=inner(id("admin-old-password").value))alert("Old password wrong!");else if(inner(id("admin-old-password").value)==inner(id("admin-confirm-new-password").value))alert("There have been no changes made for the password!");else if(inner(id("admin-new-password").value)!=inner(id("admin-confirm-new-password").value))alert("New password entries do not match!");else if(inner(id("admin-confirm-new-password").value).length<5){var n=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=n?n.toLowerCase():console.clear()))return;a[0].password=inner(id("admin-confirm-new-password").value),id("admin-settings-form").reset(),remove_class(id("admin-change-match-msg"),"fa-check"),remove_class(id("admin-change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("admin",JSON.stringify(a))}else a[0].password=inner(id("admin-confirm-new-password").value),id("admin-settings-form").reset(),remove_class(id("admin-change-match-msg"),"fa-check"),remove_class(id("admin-change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("admin",JSON.stringify(a));return!1});else if(t[s]&&t[e]&&s==e){for(add_class(document.body,"user"),i=0;i<t.length;i++)t[i].username==o&&t[i].password==n&&(setTimeout(function(){toggle_class(id("modal"),"hide"),add_class(id("withdraw-form"),"hide"),add_class(id("deposit-form"),"hide"),add_class(id("send-form"),"hide")},250),add_class(id("admin-settings-form"),"hide"),add_class(id("user-settings-form"),"show"),add_class(id("accounts-wrap"),"hide"),add_class(id("add-newaccount-wrap"),"hide"));id("owner").innerHTML="".concat(t[s].firstName," ").concat(t[s].middleName," ").concat(t[s].lastName),id("owner-acc-num").innerHTML=num_space(t[s].accountNumber),y.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),id("profile-name").innerHTML="".concat(t[s].firstName," ").concat(t[s].middleName," ").concat(t[s].lastName),id("profile-acc-type").innerHTML=t[s].accountType,id("profile-username").innerHTML=t[s].username,id("profile-email").innerHTML=t[s].email,id("profile-gender").innerHTML=t[s].gender.substring(0,1).toUpperCase()+t[s].gender.substring(1).toLowerCase(),add_att(id("withdraw-account"),"value",id("owner-acc-num").innerHTML),add_att(id("deposit-account"),"value",id("owner-acc-num").innerHTML),add_att(id("sender-account"),"value",id("owner-acc-num").innerHTML),add_event(id("change-email-form"),"submit",function(e){return e.preventDefault(),t[s].email==inner(trim(id("change-email").value))?alert("There have been no changes made for the email!"):(t[s].email=inner(trim(id("change-email").value)),id("profile-email").innerHTML=inner(trim(id("change-email").value)),alert("Change email successful!"),localStorage.setItem("users",JSON.stringify(t))),id("change-email-form").reset(),!1}),add_event(id("change-username-form"),"submit",function(e){for(e.preventDefault(),i=0;i<t.length;i++)if(t[i].username==inner(trim(id("change-username").value)))return void alert("Username already used!");return id("change-username").value.length<5?alert("Username cannot be less than 5 characters!"):(t[s].username=inner(trim(id("change-username").value)),id("profile-username").innerHTML=inner(trim(id("change-username").value)),alert("Change username successful!"),localStorage.setItem("users",JSON.stringify(t))),id("change-username-form").reset(),!1}),add_event(id("change-password-form"),"submit",function(e){if(e.preventDefault(),t[s].password!=inner(id("old-password").value))alert("Old password wrong!");else if(inner(id("old-password").value)==inner(id("confirm-new-password").value))alert("There have been no changes made for the password!");else if(inner(id("new-password").value)!=inner(id("confirm-new-password").value))alert("New password entries do not match!");else if(inner(id("confirm-new-password").value).length<5){var n=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=n?trim(n.toLowerCase()):console.clear()))return;t[s].password=inner(id("confirm-new-password").value),id("change-password-form").reset(),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("users",JSON.stringify(t))}else t[s].password=inner(id("confirm-new-password").value),id("change-password-form").reset(),remove_class(id("change-match-msg"),"fa-check"),remove_class(id("change-match-msg"),"fa-times"),alert("Change password successful!"),localStorage.setItem("users",JSON.stringify(t));return!1}),add_event(id("clear-items-btn"),"click",function(){var e=y.userStorage(),n=e.findIndex(function(e){return e.username==o});if(0!=e[n].expenseItems.length){var a=prompt('Are you sure to delete all items?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=a?trim(a.toLowerCase()):console.clear()))return;var t=0;e[n].gender;for(i=0;i<e[n].expenseItems.length;i++)t=parseFloat(t+parseFloat(e[n].expenseItems[i].cost));e[n].budget=parseFloat(parseFloat(e[n].budget)+t),e[n].expenseItems=[],localStorage.setItem("users",JSON.stringify(e)),User.list(id("owner-acc-num").innerHTML.split(" ").join("")),y.individual_history(id("owner-acc-num").innerHTML.split(" ").join("")),User.get_budget(id("owner-acc-num").innerHTML.split(" ").join("")),User.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""))}})}else t[s]?alert("Username and password do not match!"):alert("User does not exist!");setTimeout(function(){id("login-form").reset()},500)}},{key:"signup_user",value:function(n,a,t,e,o,s,r,c,l){var u=y.userStorage(),d=u.findIndex(function(e){return e.firstName==n}),m=u.findIndex(function(e){return e.middleName==a}),f=u.findIndex(function(e){return e.lastName==t}),p=u.findIndex(function(e){return e.accountNumber==l}),g=u.findIndex(function(e){return e.username==o}),h=u.findIndex(function(e){return e.password==s}),_=u.findIndex(function(e){return e.email==c});if(u[p].signedUp)return toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),alert("You have already signed up!"),void id("signup-form").reset();for(i=0;i<u.length;i++)if(u[i].username==o)return void alert("Username already used!");if(null==u[d]||""==u[d]||null==u[m]||""==u[m]||null==u[f]||""==u[f]||u[p].gender!=e||null==u[p]||""==u[p])alert("User not found!");else if(o.length<5)alert("Username cannot be less than 5 characters!");else if(s!=r)alert("Password entries do not match!");else if(r.length<5){var v=prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',"N");if("y"!=(null!=v?trim(v.toLowerCase()):console.clear())||null!=u[g]&&""!=u[g]&&null!=u[h]&&""!=u[h]&&null!=u[_]&&""!=u[_])return;toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),u[p].username=o,u[p].password=r,u[p].email=c,u[p].signedUp=!0,alert("You have successfuly signed up!"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),id("signup-form").reset()}else null!=u[g]&&""!=u[g]&&null!=u[h]&&""!=u[h]&&null!=u[_]&&""!=u[_]||(toggle_class(id("login-wrap"),"hide"),toggle_class(id("signup-wrap"),"show"),u[p].username=o,u[p].password=r,u[p].email=c,u[p].signedUp=!0,alert("You have successfuly signed up!"),remove_class(id("match-msg"),"fa-check"),remove_class(id("match-msg"),"fa-times"),id("signup-form").reset());localStorage.setItem("users",JSON.stringify(u))}},{key:"time_stamp",value:function(){var e=new Date,n=e.getMonth()<10?"0".concat(e.getMonth()+1):e.getMonth()+1,a=e.getDate()<10?"0".concat(e.getDate()):e.getDate(),t="".concat(n,"/").concat(a,"/").concat(e.getFullYear()),o=e.getHours()<10?"0".concat(e.getHours()):e.getHours(),s=e.getMinutes()<10?"0".concat(e.getMinutes()):e.getMinutes(),r=e.getSeconds()<10?"0".concat(e.getSeconds()):e.getSeconds(),i="".concat(o,":").concat(s,":").concat(r);return"".concat(t," - ").concat(i)}},{key:"withdraw",value:function(n,e){var a,t,o=y.userStorage(),s=o.findIndex(function(e){return e.accountNumber==n});null==o[s]||""==o[s]?alert("User not found!"):parseFloat(o[s].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(a="male"==o[s].gender?"His":"Her",o[s].balance=parseFloat(parseFloat(o[s].balance)-parseFloat(e)).toFixed(2),o[s].budget=parseFloat(parseFloat(o[s].budget)-parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(o[s].balance)+parseFloat(e)).toFixed(2),o[s].transactionHistory.unshift("<em>".concat(y.time_stamp(),"</em> : Withdrawal transaction amounting to <strong>₱").concat(num_commas(e),"</strong> from <strong>").concat(o[s].firstName,"</strong>'s account has been successful. ").concat(a," remaining account balance is now <strong>₱").concat(num_commas(o[s].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(t),"</strong>.")),o[s].userTransactionHistory.unshift("<em>".concat(y.time_stamp(),"</em> : Withdrawal transaction amounting to <strong>₱").concat(num_commas(e),"</strong> from your account has been successful. Your remaining account balance is now <strong>₱").concat(num_commas(o[s].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(t),"</strong>.")),alert("Withdrawal transaction has been successful!"),localStorage.setItem("users",JSON.stringify(o)))}},{key:"deposit",value:function(n,e){var a,t,o=y.userStorage(),s=o.findIndex(function(e){return e.accountNumber==n});null==o[s]||""==o[s]?alert("User not found!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):(a="male"==o[s].gender?"His":"Her",o[s].balance=parseFloat(parseFloat(o[s].balance)+parseFloat(e)).toFixed(2),o[s].budget=parseFloat(parseFloat(o[s].budget)+parseFloat(e)).toFixed(2),t=parseFloat(parseFloat(o[s].balance)-parseFloat(e)).toFixed(2),o[s].transactionHistory.unshift("<em>".concat(y.time_stamp(),"</em> : Deposit transaction amounting to <strong>₱").concat(num_commas(e),"</strong> into <strong>").concat(o[s].firstName,"</strong>'s account has been successful. ").concat(a," account balance is now <strong>₱").concat(num_commas(o[s].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(t),"</strong>.")),o[s].userTransactionHistory.unshift("<em>".concat(y.time_stamp(),"</em> : Deposit transaction amounting to <strong>₱").concat(num_commas(e),"</strong> into your account has been successful. Your account balance is now <strong>₱").concat(num_commas(o[s].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(t),"</strong>.")),alert("Deposit transaction account has been successful!"),localStorage.setItem("users",JSON.stringify(o)))}},{key:"send",value:function(n,a,e){var t,o,s,r,i=y.userStorage(),c=i.findIndex(function(e){return e.accountNumber==n}),l=i.findIndex(function(e){return e.accountNumber==a});null!=i[c]&&""!=i[c]||null!=i[l]&&""!=i[l]?null==i[c]||""==i[c]?alert("Sender's account not found!"):null==i[l]||""==i[l]?alert("Receiver's account not found!"):parseFloat(i[c].balance)<parseFloat(e)?alert("Not enough money!"):null==parseFloat(e)||""==parseFloat(e)?alert("Enter an amount!"):i[c].accountNumber==i[l].accountNumber?alert("Account number entries are not allowed!"):(t="male"==i[c].gender?"his":"her",o="male"==i[l].gender?"his":"her",i[c].balance=parseFloat(parseFloat(i[c].balance)-parseFloat(e)).toFixed(2),i[c].budget=parseFloat(parseFloat(i[c].budget)-parseFloat(e)).toFixed(2),s=parseFloat(parseFloat(i[c].balance)+parseFloat(e)).toFixed(2),i[c].transactionHistory.unshift("<em>".concat(y.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(num_commas(e),"</strong> from <strong>").concat(i[c].firstName,"</strong>'s account into ").concat(i[l].firstName,"'s account has been successful. <strong>").concat(i[c].firstName,"</strong>'s remaining account balance is now <strong>₱").concat(num_commas(i[c].balance),"</strong> from ").concat(t," previous account balance of <strong>₱").concat(num_commas(s),"</strong>.")),i[c].userTransactionHistory.unshift("<em>".concat(y.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(num_commas(e),"</strong> from your account into ").concat(i[l].firstName,"'s account has been successful. Your remaining account balance is now <strong>₱").concat(num_commas(i[c].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(s),"</strong>.")),i[l].balance=parseFloat(parseFloat(i[l].balance)+parseFloat(e)).toFixed(2),r=parseFloat(parseFloat(i[l].balance)-parseFloat(e)).toFixed(2),i[l].transactionHistory.unshift("<em>".concat(y.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(num_commas(e),"</strong> from ").concat(i[c].firstName,"'s account into <strong>").concat(i[l].firstName,"</strong>'s account has been successful. <strong>").concat(i[l].firstName,"</strong>'s account balance is now <strong>₱").concat(num_commas(i[l].balance),"</strong> from ").concat(o," previous account balance of <strong>₱").concat(num_commas(r),"</strong>.")),i[l].userTransactionHistory.unshift("<em>".concat(y.time_stamp(),"</em> : Incoming money transfer amounting to <strong>₱").concat(num_commas(e),"</strong> from ").concat(i[c].firstName,"'s account into your account has been successful. Your account balance is now <strong>₱").concat(num_commas(i[l].balance),"</strong> from a previous account balance of <strong>₱").concat(num_commas(r),"</strong>.")),alert("Money transfer has been successful!"),localStorage.setItem("users",JSON.stringify(i))):alert("Users not found!")}},{key:"get_balance",value:function(n,e){var a=y.userStorage(),t=a.findIndex(function(e){return e.accountNumber==n}),o=create_el("td");a[t]&&(o.innerHTML="₱".concat(num_commas(a[t].balance)),e.appendChild(o))}},{key:"list_users",value:function(){var m=y.userStorage();id("acc-table").innerHTML="";for(i=0;i<m.length;i++)!function(){var e=create_el("tr"),n=create_el("td"),a=create_el("td"),t=create_el("span"),o=create_el("td"),s=create_el("td"),r=create_el("div"),c=create_el("i"),l=create_el("ul"),u=create_el("li");for(n.innerHTML=num_space(m[i].accountNumber),e.appendChild(n),y.click_copy(n),t.innerHTML="".concat(m[i].firstName," ").concat(m[i].middleName," ").concat(m[i].lastName),add_event(t,"click",function(){add_class(document.body,"show"),add_class(r,"show")}),add_class(c,"far"),add_class(c,"fa-times-circle"),add_class(c,"fa-2x"),add_class(l,"xbul"),add_class(l,"wrap-scroll"),add_event(c,"click",function(){remove_class(document.body,"show"),remove_class(r,"show")}),1==m[i].transactionHistory.length&&(u.innerHTML="No other transactions yet.",l.appendChild(u)),j=0;j<m[i].transactionHistory.length;j++){var d=create_el("li");d.innerHTML=m[i].transactionHistory[j],add_class(d,"mb-05"),l.appendChild(d)}r.appendChild(c),r.appendChild(l),a.appendChild(t),a.appendChild(r),e.appendChild(a),o.innerHTML=m[i].accountType,e.appendChild(o),s.innerHTML='<i id="'.concat(m.indexOf(m[i]),'" class="fas fa-minus-circle"></i>'),add_event(s.querySelector("i"),"click",function(){var e=prompt('Are you sure to delete this account?\nType "Y" for yes and "N" for no.',"N");"y"==(null!=e?trim(e.toLowerCase()):console.clear())&&(m.splice(this.id,1),localStorage.setItem("users",JSON.stringify(m)),y.list_users())}),y.get_balance(m[i].accountNumber,e),e.appendChild(s),add_class(e,m[i].accountType.toLowerCase()),id("acc-table").appendChild(e)}()}},{key:"first_char",value:function(){qsel_all("[id*='-name']").forEach(function(e){add_event(e,"keyup",function(){0<e.value.length&&!(31<e.value.charCodeAt(0)&&(e.value.charCodeAt(0)<48||57<e.value.charCodeAt(0)))&&(alert("Invalid input!"),e.value="")})})}},{key:"negative_char",value:function(){qsel_all("[id*='-amount']").forEach(function(n){add_event(n,"keyup",function(e){189==(e.which||e.keyCode)&&(alert("Amount cannot be negative!"),n.id.includes("dec")?n.value="00":n.value="")})})}},{key:"num_only",value:function(){qsel_all("[id*='-account']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")}),qsel_all("[id*='-amount']").forEach(function(e){add_att(e,"onkeypress","return num_only(event)")})}},{key:"type_comma",value:function(){qsel_all("[id*='-amount']").forEach(function(n){add_event(n,"keyup",function(e){37<=e.which&&e.which<=40||37<=e.keyCode&&e.keyCode<=40||(n.value=n.value.replace(/,/gi,"").split(/(?=(?:\d{3})+$)/).join(","))})})}},{key:"dec_addZero",value:function(){qsel_all("[id*='-dec']").forEach(function(e){add_event(e,"change",function(){isNaN(e.value)||1!=e.value.length||(e.value="0".concat(e.value))})})}},{key:"password_match",value:function(e,n,a){add_event(e,"keyup",function(){this.value==n.value&&0!=this.value.length?(remove_class(a,"fa-times"),add_class(a,"fa-check")):this.value!=n.value&&1<=n.value.length?(remove_class(a,"fa-check"),add_class(a,"fa-times")):0==this.value.length&&(remove_class(a,"fa-check"),remove_class(a,"fa-times"))}),add_event(n,"keyup",function(){this.value==e.value&&0!=this.value.length?(remove_class(a,"fa-times"),add_class(a,"fa-check")):this.value!=e.value&&1<=e.value.length?(remove_class(a,"fa-check"),add_class(a,"fa-times")):0==this.value.length&&(remove_class(a,"fa-check"),remove_class(a,"fa-times"))})}},{key:"reset",value:function(){qsel_all("form").forEach(function(e){e.reset()})}}]),y}();
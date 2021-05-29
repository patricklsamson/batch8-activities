"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

doc_ready(function () {
  localStorage_space();
  var i, j; // SEPARATED ADMIN FOR BETTER DISTINCTION FROM REGULAR USERS ESPECIALLY FOR LOCAL STORAGE

  var Admin = function Admin(username, password, adminId) {
    _classCallCheck(this, Admin);

    this.username = username;
    this.password = password;
    this.adminId = adminId;
  };

  var ExpenseItem = function ExpenseItem(name, cost, owner) {
    _classCallCheck(this, ExpenseItem);

    this.name = name;
    this.cost = cost;
    this.owner = owner;
  }; // CONSTRUCTOR FOR EACH INDIVIDUAL USERS THAT INHERITS ADMIN USERNAME AND PASSWORD PROPERTIES


  var User =
  /*#__PURE__*/
  function (_Admin) {
    _inherits(User, _Admin);

    function User(username, password, email, signedUp, firstName, middleName, lastName, gender, accountNumber, accountType, balance) {
      var _this;

      _classCallCheck(this, User);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(User).call(this, username, password));
      _this.email = email;
      _this.firstName = firstName;
      _this.middleName = middleName;
      _this.lastName = lastName;
      _this.gender = gender;
      _this.accountNumber = accountNumber;
      _this.accountType = accountType;
      _this.balance = balance;
      _this.budget = balance;
      _this.signedUp = signedUp;
      _this.transactionHistory = [];
      _this.userTransactionHistory = [];
      _this.expenseItems = [];
      _this.connections = [];
      return _this;
    } // STATIC - TO BE ABLE USE THE FUNCTION WITHOUT AN OBJECT OF THE CLASS


    _createClass(User, null, [{
      key: "get_budget",
      value: function get_budget(owner) {
        var users = FnHandler.userStorage();
        var ownerCheck = users.findIndex(function (index) {
          return index.accountNumber == owner;
        });

        if (users[ownerCheck] != null) {
          id("owner-balance").innerHTML = "";
          id("owner-balance").innerHTML = num_commas(users[ownerCheck].budget);

          if (users[ownerCheck].budget < 0) {
            add_class(id("budget"), "negative");
          } else {
            remove_class(id("budget"), "negative");
          }
        }
      }
    }, {
      key: "total_expenses",
      value: function total_expenses(owner) {
        var users = FnHandler.userStorage();
        var ownerCheck = users.findIndex(function (index) {
          return index.accountNumber == owner;
        }),
            total = 0;

        if (users[ownerCheck] != null) {
          id("owner-expenses").innerHTML = "";

          for (i = 0; i < users[ownerCheck].expenseItems.length; i++) {
            total = parseFloat(total + parseFloat(users[ownerCheck].expenseItems[i].cost));
          }

          id("owner-expenses").innerHTML = num_commas(total.toFixed(2));
        }
      }
    }, {
      key: "add",
      value: function add(name, cost, owner) {
        var users = FnHandler.userStorage();
        var ownerCheck = users.findIndex(function (index) {
          return index.accountNumber == owner;
        }),
            nameCheck = users[ownerCheck].expenseItems.findIndex(function (index) {
          return index.name == name;
        });

        if (users[ownerCheck].expenseItems[nameCheck]) {
          alert("Expense item already exists!");
        } else {
          var newExpenseItem = new ExpenseItem(name, cost, owner);
          users[ownerCheck].budget = parseFloat(parseFloat(users[ownerCheck].budget) - parseFloat(cost)).toFixed(2);
          users[ownerCheck].expenseItems.push(newExpenseItem);
          localStorage.setItem("users", JSON.stringify(users));
          id("add-expense-form").reset();
        }
      }
    }, {
      key: "list",
      value: function list(owner) {
        var users = FnHandler.userStorage();
        var ownerCheck = users.findIndex(function (index) {
          return index.accountNumber == owner;
        });

        if (users[ownerCheck] != null) {
          id("expense-table").innerHTML = "";

          for (i = 0; i < users[ownerCheck].expenseItems.length; i++) {
            var tableRow = create_el("tr"),
                nameTd = create_el("td"),
                costTd = create_el("td"),
                editTd = create_el("td"),
                deleteTd = create_el("td");
            nameTd.innerHTML = users[ownerCheck].expenseItems[i].name;
            tableRow.appendChild(nameTd);
            costTd.innerHTML = "\u20B1".concat(num_commas(users[ownerCheck].expenseItems[i].cost));
            tableRow.appendChild(costTd);
            editTd.innerHTML = "<i id=\"".concat(i, "\" class=\"fas fa-edit\"></i>");
            add_event(editTd.querySelector("i"), "click", function () {
              var users = FnHandler.userStorage();
              var ownerCheck = users.findIndex(function (index) {
                return index.accountNumber == owner;
              });
              id("add-expense-name").value = users[ownerCheck].expenseItems[this.id].name;
              id("add-expense-amount").value = num_commas(users[ownerCheck].expenseItems[this.id].cost.split(".")[0]);
              id("add-expense-amount-dec").value = users[ownerCheck].expenseItems[this.id].cost.split(".")[1];
              users[ownerCheck].budget = parseFloat(parseFloat(users[ownerCheck].budget) + parseFloat(users[ownerCheck].expenseItems[this.id].cost)).toFixed(2);
              users[ownerCheck].expenseItems.splice(this.id, 1);
              localStorage.setItem("users", JSON.stringify(users));
              User.list(id("owner-acc-num").innerHTML.split(" ").join(""));
              FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
              FnHandler.list_users();
              User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
              User.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""));
            });
            tableRow.appendChild(editTd);
            deleteTd.innerHTML = "<i id=\"".concat(i, "\" class=\"fas fa-minus-circle\"></i>");
            add_event(deleteTd.querySelector("i"), "click", function () {
              var users = FnHandler.userStorage();
              var ownerCheck = users.findIndex(function (index) {
                return index.accountNumber == owner;
              }),
                  deletePrompt = prompt('Are you sure to delete this item?\n Type "Y" for yes and "N" for no.', "N"),
                  deleteAnswer = deletePrompt != null ? trim(deletePrompt.toLowerCase()) : console.clear();

              if (deleteAnswer == "y") {
                users[ownerCheck].budget = parseFloat(parseFloat(users[ownerCheck].budget) + parseFloat(users[ownerCheck].expenseItems[this.id].cost)).toFixed(2);
                users[ownerCheck].expenseItems.splice(this.id, 1);
                localStorage.setItem("users", JSON.stringify(users));
                User.list(id("owner-acc-num").innerHTML.split(" ").join(""));
                FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
                FnHandler.list_users();
                User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
                User.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""));
              } else {
                return;
              }
            });
            tableRow.appendChild(deleteTd);
            id("expense-table").appendChild(tableRow);
          }
        }
      }
    }]);

    return User;
  }(Admin);

  var FnHandler =
  /*#__PURE__*/
  function () {
    function FnHandler() {
      _classCallCheck(this, FnHandler);
    }

    _createClass(FnHandler, null, [{
      key: "adminStorage",
      value: function adminStorage() {
        var admin;
        /**
         * IF USERS KEY STILL DOES NOT EXISTS INSIDE THE LOCAL STORAGE, USERS EMPTY ARRAY WILL BE CREATED
         * ELSE ONCE IT ALREADY WAS CREATED INSIDE THE LOCAL STORAGE,
         * IT WILL GET THE USERS EMPTY ARRAY CREATED INSIDE THE LOCAL STORAGE
         * AND PARSE IT TO RETURN OBJECTS INSTEAD OF STRINGS
         */

        if (localStorage.getItem("admin") === null) {
          admin = [];
        } else {
          admin = JSON.parse(localStorage.getItem("admin"));
        }

        return admin;
      }
    }, {
      key: "addAdmin",
      value: function addAdmin(adminAccount) {
        // TO GET EITHER THE EMPTY ARRAY OR THE ONE INSIDE THE LOCAL STORAGE WHEN AFTER IT WAS ALREADY CREATED
        var admin = FnHandler.adminStorage();
        admin.push(adminAccount);
        /**
         * SETS AN ITEM OR KEY INSIDE THE LOCAL STORAGE CALLED "admin"
         * AND THEN ITS CORRESPONDING VALUE IS AN ARRAY CONTAINING THE "adminAccount" CREATED
         * BECAUSE OF PUSH, AND THEN STRINGIFY IT TO CONVERT THE OBJECT/S INTO STRING/S
         * NECESSARY FOR SENDING DATA TO THE WEB SERVER
         */

        localStorage.setItem("admin", JSON.stringify(admin));
      }
    }, {
      key: "userStorage",
      value: function userStorage() {
        var users;

        if (localStorage.getItem("users") === null) {
          users = [];
        } else {
          users = JSON.parse(localStorage.getItem("users"));
        }

        return users;
      }
    }, {
      key: "addUser",
      value: function addUser(userAccount) {
        var users = FnHandler.userStorage();
        users.push(userAccount);
        localStorage.setItem("users", JSON.stringify(users));
      }
    }, {
      key: "add_connections",
      value: function add_connections(user, name, connection) {
        var users = FnHandler.userStorage();
        var ownerCheck = users.findIndex(function (index) {
          return index.accountNumber == user;
        }),
            accountNumberCheck = users.findIndex(function (index) {
          return index.accountNumber == connection;
        });

        for (i = 0; i < users[ownerCheck].connections.length; i++) {
          if (users[ownerCheck].connections[i].accountNumber == connection) {
            alert("Connection already exists!");
            return;
          }
        }

        if (users[accountNumberCheck] == null || users[accountNumberCheck] == "") {
          alert("User not found");
        } else if (user == connection) {
          alert("Cannot add own account number!");
        } else {
          users[ownerCheck].connections.push({
            name: name,
            accountNumber: connection
          });
          remove_class(id("connections-form"), "show");
          id("connections-form").reset();
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    }, {
      key: "list_connections",
      value: function list_connections(user) {
        var users = FnHandler.userStorage();
        var ownerCheck = users.findIndex(function (index) {
          return index.accountNumber == user;
        });

        if (users[ownerCheck] != null) {
          id("connections-table").innerHTML = "";

          for (i = 0; i < users[ownerCheck].connections.length; i++) {
            var tableRow = create_el("tr"),
                nameTd = create_el("td"),
                accNumTd = create_el("td"),
                editTd = create_el("td"),
                deleteTd = create_el("td");
            nameTd.innerHTML = users[ownerCheck].connections[i].name;
            tableRow.appendChild(nameTd);
            accNumTd.innerHTML = num_space(users[ownerCheck].connections[i].accountNumber);
            FnHandler.click_copy(accNumTd);
            tableRow.appendChild(accNumTd);
            editTd.innerHTML = "<i id=\"".concat(i, "\" class=\"fas fa-edit\"></i>");
            add_event(editTd.querySelector("i"), "click", function () {
              if (!has_class(id("connections-form"), "show")) {
                add_class(id("connections-form"), "show");
              }

              id("connections-name").value = users[ownerCheck].connections[this.id].name;
              id("connections-account-num").value = users[ownerCheck].connections[this.id].accountNumber;
              users[ownerCheck].connections.splice(this.id, 1);
              localStorage.setItem("users", JSON.stringify(users));
              return FnHandler.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""));
            });
            tableRow.appendChild(editTd);
            deleteTd.innerHTML = "<i id=\"".concat(i, "\" class=\"fas fa-minus-circle\"></i>");
            add_event(deleteTd.querySelector("i"), "click", function () {
              var deletePrompt = prompt('Are you sure to delete this connection?\nType "Y" for yes and "N" for no.', "N"),
                  deleteAnswer = deletePrompt != null ? trim(deletePrompt.toLowerCase()) : console.clear();

              if (deleteAnswer == "y") {
                users[ownerCheck].connections.splice(this.id, 1);
                localStorage.setItem("users", JSON.stringify(users));
                return FnHandler.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""));
              } else {
                return;
              }
            });
            tableRow.appendChild(deleteTd);
            id("connections-table").appendChild(tableRow);
          }
        }
      }
    }, {
      key: "click_copy",
      value: function click_copy(element) {
        // ONE CLICK COPY FUNCTION OF A STRING OR TEXT
        add_event(element, "click", function () {
          document.execCommand("copy");
        }); // SETS OR PASSES THE TEXT COPIED INTO THE CLIPBOARD FOR PASTING

        add_event(element, "copy", function (e) {
          e.preventDefault();

          if (e.clipboardData) {
            e.clipboardData.setData("text/plain", element.textContent);
          }
        });
      }
    }, {
      key: "individual_history",
      value: function individual_history(user) {
        var users = FnHandler.userStorage();
        var accountNumCheck = users.findIndex(function (index) {
          return index.accountNumber == user;
        });

        if (users[accountNumCheck] != null) {
          id("owner-transaction").innerHTML = "";

          for (i = 0; i < users[accountNumCheck].userTransactionHistory.length; i++) {
            var transactionLi = create_el("li"),
                noTransact = create_el("li");

            if (users[accountNumCheck].userTransactionHistory.length == 1) {
              noTransact.innerHTML = "No other transactions yet.";
              id("owner-transaction").appendChild(noTransact);
            }

            transactionLi.innerHTML = users[accountNumCheck].userTransactionHistory[i];
            add_class(transactionLi, "mb-05");
            id("owner-transaction").appendChild(transactionLi);
          }
        }
      }
    }, {
      key: "login_user",
      value: function login_user(username, password) {
        var admin = FnHandler.adminStorage(),
            users = FnHandler.userStorage();
        var usernameCheck = users.findIndex(function (index) {
          return index.username == username;
        }),
            passwordCheck = users.findIndex(function (index) {
          return index.password == password;
        });
        remove_class(document.body, "modal-open");

        if (admin[0].username == username && admin[0].password == password) {
          toggle_class(id("modal"), "hide");
          add_class(id("expense-wrap"), "hide");
          add_class(id("connections-wrap"), "hide");
          id("withdraw-account").removeAttribute("value");
          id("deposit-account").removeAttribute("value");
          id("sender-account").removeAttribute("value");
          add_event(id("admin-settings-form"), "submit", function (e) {
            e.preventDefault();

            if (admin[0].password != inner(id("admin-old-password").value)) {
              alert("Old password wrong!");
            } else if (inner(id("admin-old-password").value) == inner(id("admin-confirm-new-password").value)) {
              alert("There have been no changes made for the password!");
            } else if (inner(id("admin-new-password").value) != inner(id("admin-confirm-new-password").value)) {
              alert("New password entries do not match!");
            } else if (inner(id("admin-confirm-new-password").value).length < 5) {
              var passwordPrompt = prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.', "N"),
                  passwordAnswer = passwordPrompt != null ? passwordPrompt.toLowerCase() : console.clear();

              if (passwordAnswer == "y") {
                admin[0].password = inner(id("admin-confirm-new-password").value);
                id("admin-settings-form").reset();
                remove_class(id("admin-change-match-msg"), "fa-check");
                remove_class(id("admin-change-match-msg"), "fa-times");
                alert("Change password successful!");
                localStorage.setItem("admin", JSON.stringify(admin));
              } else {
                return;
              }
            } else {
              admin[0].password = inner(id("admin-confirm-new-password").value);
              id("admin-settings-form").reset();
              remove_class(id("admin-change-match-msg"), "fa-check");
              remove_class(id("admin-change-match-msg"), "fa-times");
              alert("Change password successful!");
              localStorage.setItem("admin", JSON.stringify(admin));
            }

            return false;
          });
        } else if (users[usernameCheck] && users[passwordCheck] && usernameCheck == passwordCheck) {
          for (i = 0; i < users.length; i++) {
            if (users[i].username == username && users[i].password == password) {
              // NEEDED FOR BETTER TRANSITION TIMING WHEN SHOWING WINDOWS
              setTimeout(function () {
                toggle_class(id("modal"), "hide");
                add_class(id("withdraw-form"), "hide");
                add_class(id("deposit-form"), "hide");
                add_class(id("send-form"), "hide");
              }, 250);
              add_class(id("admin-settings-form"), "hide");
              add_class(id("user-settings-form"), "show");
              add_class(id("accounts-wrap"), "hide");
              add_class(id("add-newaccount-wrap"), "hide");
            }
          }

          id("owner").innerHTML = "".concat(users[usernameCheck].firstName, " ").concat(users[usernameCheck].middleName, " ").concat(users[usernameCheck].lastName);
          id("owner-acc-num").innerHTML = num_space(users[usernameCheck].accountNumber);
          FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
          id("profile-name").innerHTML = "".concat(users[usernameCheck].firstName, " ").concat(users[usernameCheck].middleName, " ").concat(users[usernameCheck].lastName);
          id("profile-acc-type").innerHTML = users[usernameCheck].accountType;
          id("profile-username").innerHTML = users[usernameCheck].username;
          id("profile-email").innerHTML = users[usernameCheck].email;
          id("profile-gender").innerHTML = users[usernameCheck].gender.substring(0, 1).toUpperCase() + users[usernameCheck].gender.substring(1).toLowerCase();
          add_att(id("withdraw-account"), "value", id("owner-acc-num").innerHTML);
          add_att(id("deposit-account"), "value", id("owner-acc-num").innerHTML);
          add_att(id("sender-account"), "value", id("owner-acc-num").innerHTML);
          add_event(id("change-email-form"), "submit", function (e) {
            e.preventDefault();

            if (users[usernameCheck].email == inner(trim(id("change-email").value))) {
              alert("There have been no changes made for the email!");
            } else {
              users[usernameCheck].email = inner(trim(id("change-email").value));
              id("profile-email").innerHTML = inner(trim(id("change-email").value));
              alert("Change email successful!");
              localStorage.setItem("users", JSON.stringify(users));
            }

            id("change-email-form").reset();
            return false;
          });
          add_event(id("change-username-form"), "submit", function (e) {
            e.preventDefault();

            for (i = 0; i < users.length; i++) {
              if (users[i].username == inner(trim(id("change-username").value))) {
                alert("Username already used!");
                return;
              }
            }

            if (id("change-username").value.length < 5) {
              alert("Username cannot be less than 5 characters!");
            } else {
              users[usernameCheck].username = inner(trim(id("change-username").value));
              id("profile-username").innerHTML = inner(trim(id("change-username").value));
              alert("Change username successful!");
              localStorage.setItem("users", JSON.stringify(users));
            }

            id("change-username-form").reset();
            return false;
          });
          add_event(id("change-password-form"), "submit", function (e) {
            e.preventDefault();

            if (users[usernameCheck].password != inner(id("old-password").value)) {
              alert("Old password wrong!");
            } else if (inner(id("old-password").value) == inner(id("confirm-new-password").value)) {
              alert("There have been no changes made for the password!");
            } else if (inner(id("new-password").value) != inner(id("confirm-new-password").value)) {
              alert("New password entries do not match!");
            } else if (inner(id("confirm-new-password").value).length < 5) {
              var passwordPrompt = prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.', "N"),
                  passwordAnswer = passwordPrompt != null ? trim(passwordPrompt.toLowerCase()) : console.clear();

              if (passwordAnswer == "y") {
                users[usernameCheck].password = inner(id("confirm-new-password").value);
                id("change-password-form").reset();
                remove_class(id("change-match-msg"), "fa-check");
                remove_class(id("change-match-msg"), "fa-times");
                alert("Change password successful!");
                localStorage.setItem("users", JSON.stringify(users));
              } else {
                return;
              }
            } else {
              users[usernameCheck].password = inner(id("confirm-new-password").value);
              id("change-password-form").reset();
              remove_class(id("change-match-msg"), "fa-check");
              remove_class(id("change-match-msg"), "fa-times");
              alert("Change password successful!");
              localStorage.setItem("users", JSON.stringify(users));
            }

            return false;
          });
          add_event(id("clear-items-btn"), "click", function () {
            var users = FnHandler.userStorage();
            var usernameCheck = users.findIndex(function (index) {
              return index.username == username;
            });

            if (users[usernameCheck].expenseItems.length != 0) {
              var deletePrompt = prompt('Are you sure to delete all items?\nType "Y" for yes and "N" for no.', "N"),
                  deleteAnswer = deletePrompt != null ? trim(deletePrompt.toLowerCase()) : console.clear();

              if (deleteAnswer == "y") {
                var total = 0,
                    gender = users[usernameCheck].gender == "male" ? "His" : "Her";

                for (i = 0; i < users[usernameCheck].expenseItems.length; i++) {
                  total = parseFloat(total + parseFloat(users[usernameCheck].expenseItems[i].cost));
                }

                users[usernameCheck].budget = parseFloat(parseFloat(users[usernameCheck].budget) + total);
                users[usernameCheck].expenseItems = [];
                localStorage.setItem("users", JSON.stringify(users));
                User.list(id("owner-acc-num").innerHTML.split(" ").join(""));
                FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
                User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
                User.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""));
              } else {
                return;
              }
            }
          });
        } else if (!users[usernameCheck]) {
          alert("User does not exist!");
        } else {
          alert("Username and password do not match!");
        }

        setTimeout(function () {
          id("login-form").reset();
        }, 500);
      }
    }, {
      key: "signup_user",
      value: function signup_user(firstName, middleName, lastName, gender, username, password, confirmPassword, email, accountNumber) {
        var users = FnHandler.userStorage();
        /**
         * FINDING THE INDEX OF EXISTING USERS ARRAY ITEM WHEREIN ITS CORRESPONDING PROPERTY
         * MATCHES WITH THE CURRENT ENTRY FOR THAT PROPERTY
         */

        var firstNameCheck = users.findIndex(function (index) {
          return index.firstName == firstName;
        }),
            middleNameCheck = users.findIndex(function (index) {
          return index.middleName == middleName;
        }),
            lastNameCheck = users.findIndex(function (index) {
          return index.lastName == lastName;
        }),
            accountNumberCheck = users.findIndex(function (index) {
          return index.accountNumber == accountNumber;
        }),
            usernameCheck = users.findIndex(function (index) {
          return index.username == username;
        }),
            passwordCheck = users.findIndex(function (index) {
          return index.password == password;
        }),
            emailCheck = users.findIndex(function (userIndex) {
          return userIndex.email == email;
        });

        if (users[accountNumberCheck].signedUp) {
          toggle_class(id("login-wrap"), "hide");
          toggle_class(id("signup-wrap"), "show");
          remove_class(id("match-msg"), "fa-check");
          remove_class(id("match-msg"), "fa-times");
          alert("You have already signed up!");
          id("signup-form").reset();
          return;
        } else {
          for (i = 0; i < users.length; i++) {
            if (users[i].username == username) {
              alert("Username already used!");
              return;
            }
          }

          if (users[firstNameCheck] == null || users[firstNameCheck] == "" || users[middleNameCheck] == null || users[middleNameCheck] == "" || users[lastNameCheck] == null || users[lastNameCheck] == "" || users[accountNumberCheck].gender != gender || users[accountNumberCheck] == null || users[accountNumberCheck] == "") {
            alert("User not found!");
          } else if (username.length < 5) {
            alert("Username cannot be less than 5 characters!");
          } else if (password != confirmPassword) {
            alert("Password entries do not match!");
          } else if (confirmPassword.length < 5) {
            var passwordPrompt = prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.', "N"),
                passwordAnswer = passwordPrompt != null ? trim(passwordPrompt.toLowerCase()) : console.clear();

            if (passwordAnswer == "y" && (users[usernameCheck] == null || users[usernameCheck] == "" || users[passwordCheck] == null || users[passwordCheck] == "" || users[emailCheck] == null || users[emailCheck] == "")) {
              toggle_class(id("login-wrap"), "hide");
              toggle_class(id("signup-wrap"), "show");
              users[accountNumberCheck].username = username;
              users[accountNumberCheck].password = confirmPassword;
              users[accountNumberCheck].email = email;
              users[accountNumberCheck].signedUp = true;
              alert("You have successfuly signed up!");
              remove_class(id("match-msg"), "fa-check");
              remove_class(id("match-msg"), "fa-times");
              id("signup-form").reset();
            } else {
              return;
            }
          } else if (users[usernameCheck] == null || users[usernameCheck] == "" || users[passwordCheck] == null || users[passwordCheck] == "" || users[emailCheck] == null || users[emailCheck] == "") {
            toggle_class(id("login-wrap"), "hide");
            toggle_class(id("signup-wrap"), "show");
            users[accountNumberCheck].username = username;
            users[accountNumberCheck].password = confirmPassword;
            users[accountNumberCheck].email = email;
            users[accountNumberCheck].signedUp = true;
            alert("You have successfuly signed up!");
            remove_class(id("match-msg"), "fa-check");
            remove_class(id("match-msg"), "fa-times");
            id("signup-form").reset();
          }
          /**
           * THIS IS REPEATED TO UPDATE THE USERS KEY INSIDE THE LOCAL STORAGE
           * BY OVERRIDING AND SETTING IT AGAIN, AND ALSO STRINGIFY IT AGAIN TOO
           */


          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    }, {
      key: "time_stamp",
      value: function time_stamp() {
        var today = new Date(),
            month = today.getMonth() < 10 ? "0".concat(today.getMonth() + 1) : today.getMonth() + 1,
            date = today.getDate() < 10 ? "0".concat(today.getDate()) : today.getDate(),
            dateFull = "".concat(month, "/").concat(date, "/").concat(today.getFullYear()),
            hour = today.getHours() < 10 ? "0".concat(today.getHours()) : today.getHours(),
            minute = today.getMinutes() < 10 ? "0".concat(today.getMinutes()) : today.getMinutes(),
            seconds = today.getSeconds() < 10 ? "0".concat(today.getSeconds()) : today.getSeconds(),
            timeFull = "".concat(hour, ":").concat(minute, ":").concat(seconds);
        return "".concat(dateFull, " - ").concat(timeFull);
      }
    }, {
      key: "withdraw",
      value: function withdraw(user, amount) {
        var users = FnHandler.userStorage();
        var userCheck = users.findIndex(function (index) {
          return index.accountNumber == user;
        });
        /**
         * IF THERE IS NO EXISTING INDEX OF USERS ARRAY ITEM
         * THAT CONTAINS THE CURRENT ACCOUNT NUMBER ENTRY,
         * THE USER WILL NEVER BE FOUND
         */

        if (users[userCheck] == null || users[userCheck] == "") {
          alert("User not found!");
        } else if (parseFloat(users[userCheck].balance) < parseFloat(amount)) {
          alert("Not enough money!");
        } else if (parseFloat(amount) == null || parseFloat(amount) == "") {
          alert("Enter an amount!");
        } else {
          var gender = users[userCheck].gender == "male" ? "His" : "Her"; // FIXED 2 DECIMAL PLACES

          users[userCheck].balance = parseFloat(parseFloat(users[userCheck].balance) - parseFloat(amount)).toFixed(2);
          users[userCheck].budget = parseFloat(parseFloat(users[userCheck].budget) - parseFloat(amount)).toFixed(2);
          var initialBal = parseFloat(parseFloat(users[userCheck].balance) + parseFloat(amount)).toFixed(2); // TRANSACTION HISTORY FOR ADMIN

          users[userCheck].transactionHistory.unshift("<em>".concat(FnHandler.time_stamp(), "</em> : Withdrawal transaction amounting to <strong>\u20B1").concat(num_commas(amount), "</strong> from <strong>").concat(users[userCheck].firstName, "</strong>'s account has been successful. ").concat(gender, " remaining account balance is now <strong>\u20B1").concat(num_commas(users[userCheck].balance), "</strong> from a previous account balance of <strong>\u20B1").concat(num_commas(initialBal), "</strong>.")); // TRANSACTION HISTORY FOR USER

          users[userCheck].userTransactionHistory.unshift("<em>".concat(FnHandler.time_stamp(), "</em> : Withdrawal transaction amounting to <strong>\u20B1").concat(num_commas(amount), "</strong> from your account has been successful. Your remaining account balance is now <strong>\u20B1").concat(num_commas(users[userCheck].balance), "</strong> from a previous account balance of <strong>\u20B1").concat(num_commas(initialBal), "</strong>."));
          alert("Withdrawal transaction has been successful!");
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    }, {
      key: "deposit",
      value: function deposit(user, amount) {
        var users = FnHandler.userStorage();
        var userCheck = users.findIndex(function (index) {
          return index.accountNumber == user;
        });

        if (users[userCheck] == null || users[userCheck] == "") {
          alert("User not found!");
        } else if (parseFloat(amount) == null || parseFloat(amount) == "") {
          alert("Enter an amount!");
        } else {
          var gender = users[userCheck].gender == "male" ? "His" : "Her";
          users[userCheck].balance = parseFloat(parseFloat(users[userCheck].balance) + parseFloat(amount)).toFixed(2);
          users[userCheck].budget = parseFloat(parseFloat(users[userCheck].budget) + parseFloat(amount)).toFixed(2);
          var initialBal = parseFloat(parseFloat(users[userCheck].balance) - parseFloat(amount)).toFixed(2);
          users[userCheck].transactionHistory.unshift("<em>".concat(FnHandler.time_stamp(), "</em> : Deposit transaction amounting to <strong>\u20B1").concat(num_commas(amount), "</strong> into <strong>").concat(users[userCheck].firstName, "</strong>'s account has been successful. ").concat(gender, " account balance is now <strong>\u20B1").concat(num_commas(users[userCheck].balance), "</strong> from a previous account balance of <strong>\u20B1").concat(num_commas(initialBal), "</strong>."));
          users[userCheck].userTransactionHistory.unshift("<em>".concat(FnHandler.time_stamp(), "</em> : Deposit transaction amounting to <strong>\u20B1").concat(num_commas(amount), "</strong> into your account has been successful. Your account balance is now <strong>\u20B1").concat(num_commas(users[userCheck].balance), "</strong> from a previous account balance of <strong>\u20B1").concat(num_commas(initialBal), "</strong>."));
          alert("Deposit transaction account has been successful!");
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    }, {
      key: "send",
      value: function send(from_user, to_user, amount) {
        var users = FnHandler.userStorage();
        var senderCheck = users.findIndex(function (index) {
          return index.accountNumber == from_user;
        }),
            receiverCheck = users.findIndex(function (index) {
          return index.accountNumber == to_user;
        });

        if ((users[senderCheck] == null || users[senderCheck] == "") && (users[receiverCheck] == null || users[receiverCheck] == "")) {
          alert("Users not found!");
        } else if (users[senderCheck] == null || users[senderCheck] == "") {
          alert("Sender's account not found!");
        } else if (users[receiverCheck] == null || users[receiverCheck] == "") {
          alert("Receiver's account not found!");
        } else if (parseFloat(users[senderCheck].balance) < parseFloat(amount)) {
          alert("Not enough money!");
        } else if (parseFloat(amount) == null || parseFloat(amount) == "") {
          alert("Enter an amount!");
        } else if (users[senderCheck].accountNumber == users[receiverCheck].accountNumber) {
          alert("Account number entries are not allowed!");
        } else {
          var senderGender = users[senderCheck].gender == "male" ? "his" : "her",
              receiverGender = users[receiverCheck].gender == "male" ? "his" : "her";
          users[senderCheck].balance = parseFloat(parseFloat(users[senderCheck].balance) - parseFloat(amount)).toFixed(2);
          users[senderCheck].budget = parseFloat(parseFloat(users[senderCheck].budget) - parseFloat(amount)).toFixed(2);
          var senderInitialBal = parseFloat(parseFloat(users[senderCheck].balance) + parseFloat(amount)).toFixed(2);
          users[senderCheck].transactionHistory.unshift("<em>".concat(FnHandler.time_stamp(), "</em> : Incoming money transfer amounting to <strong>\u20B1").concat(num_commas(amount), "</strong> from <strong>").concat(users[senderCheck].firstName, "</strong>'s account into ").concat(users[receiverCheck].firstName, "'s account has been successful. <strong>").concat(users[senderCheck].firstName, "</strong>'s remaining account balance is now <strong>\u20B1").concat(num_commas(users[senderCheck].balance), "</strong> from ").concat(senderGender, " previous account balance of <strong>\u20B1").concat(num_commas(senderInitialBal), "</strong>."));
          users[senderCheck].userTransactionHistory.unshift("<em>".concat(FnHandler.time_stamp(), "</em> : Incoming money transfer amounting to <strong>\u20B1").concat(num_commas(amount), "</strong> from your account into ").concat(users[receiverCheck].firstName, "'s account has been successful. Your remaining account balance is now <strong>\u20B1").concat(num_commas(users[senderCheck].balance), "</strong> from a previous account balance of <strong>\u20B1").concat(num_commas(senderInitialBal), "</strong>."));
          users[receiverCheck].balance = parseFloat(parseFloat(users[receiverCheck].balance) + parseFloat(amount)).toFixed(2);
          var receiverInitialBal = parseFloat(parseFloat(users[receiverCheck].balance) - parseFloat(amount)).toFixed(2);
          users[receiverCheck].transactionHistory.unshift("<em>".concat(FnHandler.time_stamp(), "</em> : Incoming money transfer amounting to <strong>\u20B1").concat(num_commas(amount), "</strong> from ").concat(users[senderCheck].firstName, "'s account into <strong>").concat(users[receiverCheck].firstName, "</strong>'s account has been successful. <strong>").concat(users[receiverCheck].firstName, "</strong>'s account balance is now <strong>\u20B1").concat(num_commas(users[receiverCheck].balance), "</strong> from ").concat(receiverGender, " previous account balance of <strong>\u20B1").concat(num_commas(receiverInitialBal), "</strong>."));
          users[receiverCheck].userTransactionHistory.unshift("<em>".concat(FnHandler.time_stamp(), "</em> : Incoming money transfer amounting to <strong>\u20B1").concat(num_commas(amount), "</strong> from ").concat(users[senderCheck].firstName, "'s account into your account has been successful. Your account balance is now <strong>\u20B1").concat(num_commas(users[receiverCheck].balance), "</strong> from a previous account balance of <strong>\u20B1").concat(num_commas(receiverInitialBal), "</strong>."));
          alert("Money transfer has been successful!");
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    }, {
      key: "get_balance",
      value: function get_balance(user, parentEl) {
        var users = FnHandler.userStorage();
        var userCheck = users.findIndex(function (index) {
          return index.accountNumber == user;
        }),
            balanceTd = create_el("td");
        /**
         * IF THE CONDITION IS MET AND TRUE OR USERS ARE ALREADY EXISTING, THE FUNCTION WILL CONTINUE TO EXECUTE
         * AND DISPLAY THE BALANCE LIST, IN THIS WAY ERRORS CAN BE AVOIDED IF THERE ARE STILL NO USERS EXISTING
         * INSIDE THE LOCAL STORAGE
         */

        if (users[userCheck]) {
          balanceTd.innerHTML = "\u20B1".concat(num_commas(users[userCheck].balance));
          parentEl.appendChild(balanceTd);
        }
      }
    }, {
      key: "list_users",
      value: function list_users() {
        var users = FnHandler.userStorage(); // EMPTYING THE INNERHTML OF THE TABLE TO PREVENT DUPLICATE STACKS OF DISPLAY PER UPDATE OF OBJECTS

        id("acc-table").innerHTML = ""; // ITERATION STARTS AT ONE TO PREVENT THE FIRST ARRAY ITEM TO DISPLAY WHICH IS FOR THE ADMIN

        var _loop = function _loop() {
          var tableRow = create_el("tr"),
              accNumTd = create_el("td"),
              accTd = create_el("td"),
              accTdSpan = create_el("span"),
              accTypeTd = create_el("td"),
              deleteTd = create_el("td"),
              historyModal = create_el("div"),
              historyModalClose = create_el("i"),
              historyUl = create_el("ul"),
              noTransact = create_el("li");
          accNumTd.innerHTML = num_space(users[i].accountNumber);
          tableRow.appendChild(accNumTd);
          FnHandler.click_copy(accNumTd);
          accTdSpan.innerHTML = "".concat(users[i].firstName, " ").concat(users[i].middleName, " ").concat(users[i].lastName);
          add_event(accTdSpan, "click", function () {
            add_class(document.body, "show");
            add_class(historyModal, "show");
          });
          add_class(historyModalClose, "far");
          add_class(historyModalClose, "fa-times-circle");
          add_class(historyModalClose, "fa-2x");
          add_class(historyUl, "xbul");
          add_class(historyUl, "wrap-scroll");
          add_event(historyModalClose, "click", function () {
            remove_class(document.body, "show");
            remove_class(historyModal, "show");
          }); // INDICATION WHEN NO OTHER TRANSACTIONS ARE MADE YET ASIDE FROM OPENING THE ACCOUNT

          if (users[i].transactionHistory.length == 1) {
            noTransact.innerHTML = "No other transactions yet.";
            historyUl.appendChild(noTransact);
          }

          for (j = 0; j < users[i].transactionHistory.length; j++) {
            var historyLi = create_el("li");
            historyLi.innerHTML = users[i].transactionHistory[j];
            add_class(historyLi, "mb-05");
            historyUl.appendChild(historyLi);
          } // OLD CODE
          // // REVERSE FOR LOOP, SO THAT LATEST TRANSACTION HISTORY LOG REMAINS AT THE TOP
          // for (j = users[i].transactionHistory.length - 1; j >= 0; j--) {
          //   let historyLi = create_el("li");
          //   historyLi.innerHTML = users[i].transactionHistory[j];
          //   add_class(historyLi, "mb-05");
          //   historyUl.appendChild(historyLi);
          // }
          // if (users[i].transactionHistory.length == 0) {
          //   let historyLi = create_el("li");
          //   historyLi.innerHTML = "No transactions yet.";
          //   historyUl.appendChild(historyLi);
          // } else {
          //   for (j = 0; j < users[i].transactionHistory.length; j++) {
          //     let historyLi = create_el("li");
          //     historyLi.innerHTML = users[i].transactionHistory[j];
          //     add_class(historyLi, "mb-05");
          //     historyUl.appendChild(historyLi);
          //   }
          // }


          historyModal.appendChild(historyModalClose);
          historyModal.appendChild(historyUl);
          accTd.appendChild(accTdSpan);
          accTd.appendChild(historyModal);
          tableRow.appendChild(accTd);
          accTypeTd.innerHTML = users[i].accountType;
          tableRow.appendChild(accTypeTd); // SETTING ID OF EACH DELETE BUTTON WITH REFERENCE TO THE INDICES OF ARRAY ITEMS INSIDE THE LOCAL STORAGE, FOR PRECISE AND ACCURATE DELETION

          deleteTd.innerHTML = "<i id=\"".concat(users.indexOf(users[i]), "\" class=\"fas fa-minus-circle\"></i>"); // TARGETING THE DELETE BUTTON ("i") INSIDE EACH "td" ELEMENT

          add_event(deleteTd.querySelector("i"), "click", function () {
            // PROMPT FOR DELETING AN INDIVIDUAL ACCOUNT, TO PREVENT ACCIDENTAL DELETION
            var deletePrompt = prompt('Are you sure to delete this account?\nType "Y" for yes and "N" for no.', "N"),
                deleteAnswer = deletePrompt != null ? trim(deletePrompt.toLowerCase()) : console.clear(); // THIS TERNARY OPERATOR PREVENTS ERROR POPPING UP WHEN THE PROMPT HAS BEEN CANCELED

            if (deleteAnswer == "y") {
              users.splice(this.id, 1);
              localStorage.setItem("users", JSON.stringify(users));
              FnHandler.list_users();
            } else {
              return;
            }
          });
          FnHandler.get_balance(users[i].accountNumber, tableRow);
          tableRow.appendChild(deleteTd);
          add_class(tableRow, users[i].accountType.toLowerCase());
          id("acc-table").appendChild(tableRow);
        };

        for (i = 0; i < users.length; i++) {
          _loop();
        }
      } // ONCE FIRST VALUE OR CHARACTER INPUTTED IS A NUMBER IN ALL NAME INPUTS ACROSS THE DOM, ALERT WILL EXEECUTE

    }, {
      key: "first_char",
      value: function first_char() {
        qsel_all("[id*='-name']").forEach(function (input) {
          add_event(input, "keyup", function () {
            if (input.value.length > 0 && !(input.value.charCodeAt(0) > 31 && (input.value.charCodeAt(0) < 48 || input.value.charCodeAt(0) > 57))) {
              alert("Invalid input!");
              input.value = "";
            }
          });
        });
      } // ONCE NEGATIVE OR MINUS SIGN IS INPUTTED IN ALL AMOUNT INPUTS ACROSS THE DOM, ALERT WILL EXECUTE

    }, {
      key: "negative_char",
      value: function negative_char() {
        qsel_all("[id*='-amount']").forEach(function (input) {
          add_event(input, "keyup", function (e) {
            if ((e.which || e.keyCode) == 189) {
              alert("Amount cannot be negative!"); // CHECKS IF INPUT ID INCLUDES "dec" (DECIMAL INPUTS), THEN CHANGES ITS VALUE ACCORDINGLY

              if (input.id.includes("dec")) {
                input.value = "00";
              } else {
                input.value = "";
              }
            }
          });
        });
      } // RESTRICT NUMBER INPUT IN ALL ACCOUNT INPUTS ACROSS THE DOM

    }, {
      key: "num_only",
      value: function num_only() {
        qsel_all("[id*='-account']").forEach(function (input) {
          add_att(input, "onkeypress", "return num_only(event)");
        });
        qsel_all("[id*='-amount']").forEach(function (input) {
          add_att(input, "onkeypress", "return num_only(event)");
        });
      } // UI FOR ADDING COMMAS WHILE TYPING IN ALL AMOUNT INPUTS ACROSS THE DOM

    }, {
      key: "type_comma",
      value: function type_comma() {
        qsel_all("[id*='-amount']").forEach(function (input) {
          add_event(input, "keyup", function (e) {
            // SKIP FOR ARROW KEYS
            if (e.which >= 37 && e.which <= 40 || e.keyCode >= 37 && e.keyCode <= 40) {
              return;
            }

            input.value = input.value.replace(/,/gi, "").split(/(?=(?:\d{3})+$)/).join(",");
          });
        });
      } // FORCING ALL DECIMAL INPUTS ACROSS THE DOM TO ADD ZERO WHEN IT IS STILL A SINGLE DIGIT NUMBER

    }, {
      key: "dec_addZero",
      value: function dec_addZero() {
        qsel_all("[id*='-dec']").forEach(function (input) {
          add_event(input, "change", function () {
            if (!isNaN(input.value) && input.value.length == 1) {
              input.value = "0".concat(input.value);
            }
          });
        });
      }
    }, {
      key: "password_match",
      value: function password_match(password, confirmPassword, message) {
        add_event(password, "keyup", function () {
          if (this.value == confirmPassword.value && this.value.length != 0) {
            remove_class(message, "fa-times");
            add_class(message, "fa-check");
          } else if (this.value != confirmPassword.value && confirmPassword.value.length >= 1) {
            remove_class(message, "fa-check");
            add_class(message, "fa-times");
          } else if (this.value.length == 0) {
            remove_class(message, "fa-check");
            remove_class(message, "fa-times");
          }
        });
        add_event(confirmPassword, "keyup", function () {
          if (this.value == password.value && this.value.length != 0) {
            remove_class(message, "fa-times");
            add_class(message, "fa-check");
          } else if (this.value != password.value && password.value.length >= 1) {
            remove_class(message, "fa-check");
            add_class(message, "fa-times");
          } else if (this.value.length == 0) {
            remove_class(message, "fa-check");
            remove_class(message, "fa-times");
          }
        });
      } // FOR RESETTING ALL FORMS AT ONCE

    }, {
      key: "reset",
      value: function reset() {
        qsel_all("form").forEach(function (form) {
          form.reset();
        });
      }
    }]);

    return FnHandler;
  }();

  add_class(document.body, "modal-open");
  match_height(".mh");
  FnHandler.list_users();
  FnHandler.first_char();
  FnHandler.negative_char();
  FnHandler.num_only();
  FnHandler.type_comma();
  FnHandler.dec_addZero();
  FnHandler.password_match(id("signup-password"), id("signup-confirm-password"), id("match-msg"));
  FnHandler.password_match(id("admin-new-password"), id("admin-confirm-new-password"), id("admin-change-match-msg"));
  FnHandler.password_match(id("new-password"), id("confirm-new-password"), id("change-match-msg"));

  var create_admin = function create_admin(username, password, adminId) {
    var admin = FnHandler.adminStorage();
    var adminCheck = admin.findIndex(function (index) {
      return index.adminId == adminId;
    }); // THIS MAKES THE CREATION OF ADMIN ACCOUNT ONLY ONCE

    if (admin[adminCheck]) {
      return;
    } else {
      var _admin = new Admin(username, password, adminId);

      FnHandler.addAdmin(_admin);
    }
  };

  create_admin("admin", "admin", "1");
  /**
   * FUNCTION FOR CREATING A NEW USER, CONNECTING THE CLASS "User"
   * INTO THE CLASS "FnHandler" TO PUSH EVERY NEW USER CREATED INTO THE LOCAL STORAGE
   */

  var create_user = function create_user(username, password, email, signedUp, firstName, middleName, lastName, gender, accountNumber, accountType, balance) {
    var users = FnHandler.userStorage();
    var fNameCheck = users.findIndex(function (index) {
      return index.firstName == firstName;
    }),
        lNameCheck = users.findIndex(function (index) {
      return index.lastName == lastName;
    });
    /**
     * THIS PREVENTS DUPLICATE USERS, EVERY FIRST NAME AND LAST NAME INPUTS ARE CHECKED
     * IF IT IS ALREADY EXISTING INSIDE THE LOCAL STORAGE
     */

    if (users[fNameCheck] && users[lNameCheck]) {
      alert("User already exists!");
    } else {
      var newUserAccount = new User(username, password, email, signedUp, firstName, middleName, lastName, gender, accountNumber, accountType, balance); // FIRST LOG INSIDE THE TRANSACTION HISTORY INDICATING WHEN THE ACCOUNT WAS CREATED OR OPENED

      newUserAccount.transactionHistory.push("<em>".concat(FnHandler.time_stamp(), "</em> : Opened a ").concat(newUserAccount.accountType.toLowerCase(), " account for <strong>").concat(newUserAccount.firstName, "</strong> ").concat(newUserAccount.middleName, " ").concat(newUserAccount.lastName, " with an initial account balance of <strong>\u20B1").concat(num_commas(newUserAccount.balance), "</strong>."));
      newUserAccount.userTransactionHistory.push("<em>".concat(FnHandler.time_stamp(), "</em> : You have opened a ").concat(newUserAccount.accountType.toLowerCase(), " account with an initial account balance of <strong>\u20B1").concat(num_commas(newUserAccount.balance), "</strong>."));
      FnHandler.addUser(newUserAccount);
    }
  }; // LOADS INITIAL DATA FOR IMMEDIATE TESTING PURPOSES OF WHOEVER VISITS THE SITE


  add_event(id("load-data-btn"), "click", function () {
    var users = FnHandler.userStorage();
    var janeCheck = users.findIndex(function (index) {
      return index.firstName == "JANE";
    }),
        doeCheck = users.findIndex(function (index) {
      return index.lastName == "DOE";
    }),
        juanCheck = users.findIndex(function (index) {
      return index.firstName == "JUAN";
    }),
        delaCruzCheck = users.findIndex(function (index) {
      return index.lastName == "DELA CRUZ";
    }),
        juanitaCheck = users.findIndex(function (index) {
      return index.firstName == "JUANITA";
    }),
        samonteCheck = users.findIndex(function (index) {
      return index.lastName == "SAMONTE";
    }),
        johnCheck = users.findIndex(function (index) {
      return index.firstName == "JOHN";
    }),
        schmoeCheck = users.findIndex(function (index) {
      return index.lastName == "SCHMOE";
    }); // THIS PREVENTS MULTIPLE LOADING OF INITIAL DATA, AND JUST LOAD IT ONCE WHEN THE DATA STILL DON'T EXIST

    if (!users[janeCheck] && !users[doeCheck]) {
      var balance = 7200.05; // USERNAME AND PASSWORD ARGUMENTS ARE SET TO BLANK (""), THEY WILL ONLY HAVE VALUES FROM SIGNUP FORM

      create_user("janedoe", "janedoe", "janedoe@mail.com", true, "JANE", "HILLS", "DOE", "female", "023451282250", "Checking", balance.toFixed(2));
    }

    if (!users[juanCheck] && !users[delaCruzCheck]) {
      var _balance = 2700;
      create_user("juandelacruz", "juandelacruz", "juandelacruz@mail.com", true, "JUAN", "", "DELA CRUZ", "male", "071096025466", "Savings", _balance.toFixed(2));
    }

    if (!users[juanitaCheck] && !users[samonteCheck]) {
      var _balance2 = 5200.5;
      create_user("", "", "", false, "JUANITA", "HERMAN", "SAMONTE", "female", "031734218924", "Checking", _balance2.toFixed(2));
    }

    if (!users[johnCheck] && !users[schmoeCheck]) {
      var _balance3 = 2500;
      create_user("", "", "", false, "JOHN", "", "SCHMOE", "male", "064581565583", "Savings", _balance3.toFixed(2));
    } // THIS FUNCTION IS CALLED AGAIN TO REFRESH THE LIST IN THE UI


    FnHandler.list_users();
  }); // PROMPT FOR CLEARING ALL DATA, TO PREVENT ACCIDENTAL DELETION

  add_event(id("clear-all-btn"), "click", function () {
    var users = FnHandler.userStorage();

    if (users.length != 0) {
      var clearPrompt = prompt('Are you sure to delete all stored datas?\nType "Y" for yes and "N" for no.', "N"),
          clearAnswer = clearPrompt != null ? trim(clearPrompt.toLowerCase()) : console.clear();

      if (clearAnswer == "y") {
        // DOES NOT INCLUDE FIRST ARRAY ITEM IN SPLICING OR DELETING WHICH IS THE ADMIN USERNAME AND PASSWORD
        localStorage.removeItem("users");
        FnHandler.list_users();
      } else {
        return;
      }
    }
  });
  add_event(id("add-form"), "submit", function (e) {
    e.preventDefault();
    var gender = id("male").checked ? "male" : "female",
        acc_num = id("savings").checked ? ["05", "06", "07", "08", "09"] : ["00", "01", "02", "03", "04"],
        account_type = id("savings").checked ? "Savings" : "Checking",
        account_type_bal = id("savings").checked ? 2000 : 5000,
        depositAmount = id("add-deposit-amount").value.length == 0 ? "0" : id("add-deposit-amount").value.split(",").join(""),
        add_deposit = "".concat(depositAmount, ".").concat(id("add-deposit-amount-dec").value);
    /**
     * BECAUSE OF "FnHandler.type_comma()"
     * ".split(",").join("")" IS NECESSARY TO CONVERT THE VALUE TYPED
     * BACK TO WITHOUT COMMAS FOR STORING
     */
    // OLD CODE
    //  add_deposit_dec =
    //  parseFloat(id("add-deposit-amount-dec").value) < 10
    //    ? `0${parseFloat(id("add-deposit-amount-dec").value)}`
    //    : id("add-deposit-amount-dec").value,

    create_user("", "", "", false, inner(trim(id("add-first-name").value.toUpperCase())), inner(trim(id("add-middle-name").value.toUpperCase())), inner(trim(id("add-last-name").value.toUpperCase())), gender, acc_num[rand(acc_num.length)] + (rand(9000000000) + 1000000000), account_type, parseFloat(account_type_bal + parseFloat(add_deposit)).toFixed(2));
    FnHandler.list_users();
    alert("".concat(inner(trim(id("add-first-name").value.toUpperCase())), "'s account have been successfully created!"));
    id("add-form").reset();
    return false;
  });
  add_event(id("login-form"), "submit", function (e) {
    e.preventDefault();
    var users = FnHandler.userStorage();
    var janeCheck = users.findIndex(function (index) {
      return index.accountNumber = "023451282250";
    });

    if (users[janeCheck]) {
      var connectionCheck = users[janeCheck].connections.findIndex(function (index) {
        return index.accountNumber == "071096025466";
      });

      if (!users[janeCheck].connections[connectionCheck]) {
        users[janeCheck].connections.push({
          name: "JUAN",
          accountNumber: "071096025466"
        });
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    FnHandler.login_user(inner(trim(id("login-username").value)), inner(trim(id("login-password").value)));
    FnHandler.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.list(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.total_expenses(id("owner-acc-num").innerHTML.split(" ").join("")); // OLD CODE
    // if (users[usernameCheck] && users[passwordCheck]) {
    //   // TO CONTROL WHICH WINDOW WILL APPEAR FOR THE ADMIN AND THE REGULAR USERS
    //   if (
    //     users[0].username == id("login-username").value &&
    //     users[0].password == id("login-password").value
    //   ) {
    //     toggle_class(id("modal"), "hide");
    //     add_class(id("friends-li"), "hide");
    //     add_class(id("transactions-li"), "hide");
    //   } else {
    //     for (i = 1; i < users.length; i++) {
    //       if (
    //         users[i].username == id("login-username").value &&
    //         users[i].password == id("login-password").value
    //       ) {
    //         // NEEDED FOR BETTER TRANSITION TIMING WHEN SHOWING WINDOWS
    //         setTimeout(() => {
    //           toggle_class(id("modal"), "hide");
    //         }, 250);
    //         add_class(id("accounts-wrap"), "hide");
    //         add_class(id("add-newaccount-wrap"), "hide");
    //       }
    //     }
    //   }
    // } else {
    //   alert("User not found!");
    // }

    return false;
  });
  add_event(id("log-out-btn"), "click", function (e) {
    e.preventDefault();
    toggle_class(id("modal"), "hide"); // NEEDED FOR BETTER TRANSITION TIMING WHEN HIDING WINDOWS

    setTimeout(function () {
      add_class(document.body, "modal-open");
      remove_class(id("accounts-wrap"), "hide");
      remove_class(id("search-wrap"), "active");
      id("search-name").value = "";
      id("filter").value = "all";

      for (i = 0; i < id("acc-table").querySelectorAll("tr").length; i++) {
        remove_class(id("acc-table").querySelectorAll("tr")[i], "hide");
        remove_class(id("acc-table").querySelectorAll("tr")[i], "search-hide");
      }

      remove_class(id("expense-wrap"), "hide");
      remove_class(id("connections-wrap"), "hide");
      remove_class(id("connections-form"), "show");
      remove_class(id("add-newaccount-wrap"), "hide");
      remove_class(id("withdraw-form"), "hide");
      remove_class(id("deposit-form"), "hide");
      remove_class(id("send-form"), "hide");
    }, 500);
    remove_class(id("admin-settings-form"), "hide");
    remove_class(id("user-settings-form"), "show");
    FnHandler.reset();
    return false;
  });
  add_event(id("open-signup-btn"), "click", function () {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
  });
  add_event(id("signup-form"), "submit", function (e) {
    e.preventDefault();
    var gender = id("signup-male").checked ? "male" : "female";
    FnHandler.signup_user(inner(trim(id("signup-first-name").value.toUpperCase())), inner(trim(id("signup-middle-name").value.toUpperCase())), inner(trim(id("signup-last-name").value.toUpperCase())), gender, inner(trim(id("signup-username").value)), inner(id("signup-password").value), inner(id("signup-confirm-password").value), inner(trim(id("signup-email").value)), id("signup-account-num").value.split(" ").join(""));
    return false;
  });
  add_event(id("back-signup-btn"), "click", function () {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
    remove_class(id("match-msg"), "fa-check");
    remove_class(id("match-msg"), "fa-times");
    FnHandler.reset();
  });
  add_event(id("open-search-btn"), "click", function () {
    toggle_class(id("search-wrap"), "active");
    id("search-name").value = "";

    for (i = 0; i < id("acc-table").querySelectorAll("tr").length; i++) {
      remove_class(id("acc-table").querySelectorAll("tr")[i], "search-hide");
    }

    setTimeout(function () {
      id("search-name").focus();
    }, 100);
  });
  add_event(id("search-name"), "keyup", function () {
    for (i = 0; i < id("acc-table").querySelectorAll("tr").length; i++) {
      if (id("acc-table").querySelectorAll("tr")[i].querySelectorAll("td")[1].querySelector("span")) {
        if (id("acc-table").querySelectorAll("tr")[i].querySelectorAll("td")[1].querySelector("span").innerHTML.toUpperCase().indexOf(id("search-name").value.toUpperCase()) > -1) {
          remove_class(id("acc-table").querySelectorAll("tr")[i], "search-hide");
        } else {
          add_class(id("acc-table").querySelectorAll("tr")[i], "search-hide");
        }
      }
    }
  });
  add_event(id("filter"), "click", function () {
    if (id("filter").value == "all") {
      for (i = 0; i < id("acc-table").querySelectorAll("tr").length; i++) {
        remove_class(id("acc-table").querySelectorAll("tr")[i], "hide");
      }
    } else if (id("filter").value == "savings") {
      for (i = 0; i < id("acc-table").querySelectorAll("tr").length; i++) {
        if (has_class(id("acc-table").querySelectorAll("tr")[i], "checking")) {
          add_class(id("acc-table").querySelectorAll("tr")[i], "hide");
        } else {
          remove_class(id("acc-table").querySelectorAll("tr")[i], "hide");
        }
      }
    } else {
      for (i = 0; i < id("acc-table").querySelectorAll("tr").length; i++) {
        if (has_class(id("acc-table").querySelectorAll("tr")[i], "savings")) {
          add_class(id("acc-table").querySelectorAll("tr")[i], "hide");
        } else {
          remove_class(id("acc-table").querySelectorAll("tr")[i], "hide");
        }
      }
    }
  });
  add_event(id("settings-btn"), "click", function () {
    add_class(id("settings-modal"), "show");
  });
  add_event(id("close-settings-btn"), "click", function () {
    remove_class(id("settings-modal"), "show");
    remove_class(id("change-match-msg"), "fa-check");
    remove_class(id("change-match-msg"), "fa-times");
    remove_class(id("admin-change-match-msg"), "fa-check");
    remove_class(id("admin-change-match-msg"), "fa-times");
    FnHandler.reset();
  });
  add_event(id("owner-transaction-btn"), "click", function () {
    add_class(id("owner-transaction-modal"), "show");
  });
  add_event(id("close-owner-transaction-btn"), "click", function () {
    remove_class(id("owner-transaction-modal"), "show");
  });
  add_event(id("owner"), "click", function () {
    add_class(id("profile-modal"), "show");
  });
  add_event(id("close-profile-btn"), "click", function () {
    remove_class(id("profile-modal"), "show");
  });
  add_event(id("add-expense-form"), "submit", function (e) {
    e.preventDefault();
    var expense_amount = "".concat(id("add-expense-amount").value.split(",").join(""), ".").concat(id("add-expense-amount-dec").value);
    User.add(inner(trim(id("add-expense-name").value.toUpperCase())), expense_amount, id("owner-acc-num").innerHTML.split(" ").join(""));
    User.list(id("owner-acc-num").innerHTML.split(" ").join(""));
    FnHandler.list_users();
    FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""));
    return false;
  });
  add_event(id("add-connections-btn"), "click", function () {
    toggle_class(id("connections-form"), "show");
    id("connections-form").reset();
  });
  add_event(id("connections-form"), "submit", function (e) {
    e.preventDefault();
    FnHandler.add_connections(id("owner-acc-num").innerHTML.split(" ").join(""), inner(trim(id("connections-name").value.toUpperCase())), id("connections-account-num").value.split(" ").join(""));
    FnHandler.list_connections(id("owner-acc-num").innerHTML.split(" ").join(""));
    return false;
  });
  add_event(id("withdraw-form"), "submit", function (e) {
    e.preventDefault();
    var withdraw_amount = "".concat(id("withdraw-amount").value.split(",").join(""), ".").concat(id("withdraw-amount-dec").value);
    /**
     * ".split(" ").join("")" IS NECESSARY TO CONVERT THE ACCOUNT NUMBER
     * WITH SPACES WHEN COPIED BACK TO WITHOUT SPACES FOR STORING
     */

    FnHandler.withdraw(id("withdraw-account").value.split(" ").join(""), withdraw_amount);
    FnHandler.list_users();
    FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    id("withdraw-form").reset();
    return false;
  });
  add_event(id("deposit-form"), "submit", function (e) {
    e.preventDefault();
    var deposit_amount = "".concat(id("deposit-amount").value.split(",").join(""), ".").concat(id("deposit-amount-dec").value);
    FnHandler.deposit(id("deposit-account").value.split(" ").join(""), deposit_amount);
    FnHandler.list_users();
    FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    id("deposit-form").reset();
    return false;
  });
  add_event(id("send-form"), "submit", function (e) {
    e.preventDefault();
    var send_amount = "".concat(id("send-amount").value.split(",").join(""), ".").concat(id("send-amount-dec").value);
    FnHandler.send(id("sender-account").value.split(" ").join(""), id("receiver-account").value.split(" ").join(""), send_amount);
    FnHandler.list_users();
    FnHandler.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    id("send-form").reset();
    return false;
  });
  add_event(id("open-add-form-btn"), "click", function () {
    toggle_class(this, "active");
    remove_class(id("open-connections-form-btn"), "active");
    remove_class(id("open-withdraw-form-btn"), "active");
    remove_class(id("open-deposit-form-btn"), "active");
    remove_class(id("open-send-form-btn"), "active");
  });
  add_event(id("open-connections-form-btn"), "click", function () {
    toggle_class(this, "active");
    remove_class(id("open-add-form-btn"), "active");
    remove_class(id("open-withdraw-form-btn"), "active");
    remove_class(id("open-deposit-form-btn"), "active");
    remove_class(id("open-send-form-btn"), "active");
  });
  add_event(id("open-withdraw-form-btn"), "click", function () {
    toggle_class(this, "active");
    remove_class(id("open-add-form-btn"), "active");
    remove_class(id("open-connections-form-btn"), "active");
    remove_class(id("open-deposit-form-btn"), "active");
    remove_class(id("open-send-form-btn"), "active");
  });
  add_event(id("open-deposit-form-btn"), "click", function () {
    toggle_class(this, "active");
    remove_class(id("open-add-form-btn"), "active");
    remove_class(id("open-connections-form-btn"), "active");
    remove_class(id("open-withdraw-form-btn"), "active");
    remove_class(id("open-send-form-btn"), "active");
  });
  add_event(id("open-send-form-btn"), "click", function () {
    toggle_class(this, "active");
    remove_class(id("open-add-form-btn"), "active");
    remove_class(id("open-connections-form-btn"), "active");
    remove_class(id("open-withdraw-form-btn"), "active");
    remove_class(id("open-deposit-form-btn"), "active");
  });
});
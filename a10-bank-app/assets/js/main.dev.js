"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

doc_ready(function () {
  var i;

  var User = function User(firstName, middleName, lastName, accountNumber, accountType, balance) {
    _classCallCheck(this, User);

    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.accountNumber = accountNumber;
    this.accountType = accountType;
    this.balance = balance;
  };

  var FnHandler =
  /*#__PURE__*/
  function () {
    function FnHandler() {
      _classCallCheck(this, FnHandler);
    }

    _createClass(FnHandler, null, [{
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
      key: "withdraw",
      value: function withdraw(user, amount) {
        var users = FnHandler.userStorage();
        var userCheck = users.findIndex(function (userIndex) {
          return userIndex.accountNumber == user;
        });

        if (users[userCheck] == null || users[userCheck] == "") {
          alert("User not found!");
        } else if (parseFloat(users[userCheck].balance) < parseFloat(amount)) {
          alert("Balance cannot be negative!");
        } else if (parseFloat(amount) == 0) {
          alert("Enter an amount!");
        } else {
          users[userCheck].balance = parseFloat(parseFloat(users[userCheck].balance) - parseFloat(amount)).toFixed(2);
        }

        localStorage.setItem("users", JSON.stringify(users));
      }
    }, {
      key: "deposit",
      value: function deposit(user, amount) {
        var users = FnHandler.userStorage();
        var userCheck = users.findIndex(function (userIndex) {
          return userIndex.accountNumber == user;
        });

        if (users[userCheck] == null || users[userCheck] == "") {
          alert("User not found!");
        } else if (parseFloat(amount) == 0) {
          alert("Enter an amount!");
        } else {
          users[userCheck].balance = parseFloat(parseFloat(users[userCheck].balance) + parseFloat(amount)).toFixed(2);
        }

        localStorage.setItem("users", JSON.stringify(users));
      }
    }, {
      key: "send",
      value: function send(from_user, to_user, amount) {
        var users = FnHandler.userStorage();
        var senderCheck = users.findIndex(function (userIndex) {
          return userIndex.accountNumber == from_user;
        }),
            receiverCheck = users.findIndex(function (userIndex) {
          return userIndex.accountNumber == to_user;
        });

        if (users[senderCheck] == null || users[senderCheck] == "" || users[receiverCheck] == null || users[receiverCheck] == "") {
          alert("Users not found!");
        } else if (parseFloat(users[senderCheck].balance) < parseFloat(amount)) {
          alert("Balance cannot be negative!");
        } else if (parseFloat(amount) == 0) {
          alert("Enter an amount!");
        } else {
          users[senderCheck].balance = parseFloat(parseFloat(users[senderCheck].balance) - parseFloat(amount)).toFixed(2);
          users[receiverCheck].balance = parseFloat(parseFloat(users[receiverCheck].balance) + parseFloat(amount)).toFixed(2);
        }

        localStorage.setItem("users", JSON.stringify(users));
      }
    }, {
      key: "list_users",
      value: function list_users() {
        id("acc-num-ul").innerHTML = "";
        id("acc-ul").innerHTML = "";
        id("acc-type-ul").innerHTML = "";
        id("balance-ul").innerHTML = "";

        if (FnHandler.userStorage().length != 0) {
          var _loop = function _loop() {
            var accNumLi = create_el("li"),
                accLi = create_el("li"),
                accTypeLi = create_el("li"),
                balanceLi = create_el("li");
            accNumLi.innerHTML = num_space(FnHandler.userStorage()[i].accountNumber);
            id("acc-num-ul").appendChild(accNumLi);
            add_event(accNumLi, "click", function () {
              document.execCommand("copy");
            });
            add_event(accNumLi, "copy", function (e) {
              e.preventDefault();

              if (e.clipboardData) {
                e.clipboardData.setData("text/plain", accNumLi.textContent);
              }
            });
            accLi.innerHTML = "".concat(FnHandler.userStorage()[i].firstName, " ").concat(FnHandler.userStorage()[i].middleName, " ").concat(FnHandler.userStorage()[i].lastName);
            id("acc-ul").appendChild(accLi);
            accTypeLi.innerHTML = FnHandler.userStorage()[i].accountType;
            id("acc-type-ul").appendChild(accTypeLi);
            balanceLi.innerHTML = "\u20B1".concat(num_commas(FnHandler.userStorage()[i].balance));
            id("balance-ul").appendChild(balanceLi);
          };

          for (i = 0; i < FnHandler.userStorage().length; i++) {
            _loop();
          }
        }
      }
    }, {
      key: "firstChar",
      value: function firstChar() {
        qsel_all("[id*='-name']").forEach(function (input) {
          add_event(input, "keyup", function () {
            if (input.value.length > 0 && !(input.value.charCodeAt(0) > 31 && (input.value.charCodeAt(0) < 48 || input.value.charCodeAt(0) > 57))) {
              alert("Invalid input!");
              input.value = "";
            }
          });
        });
      }
    }]);

    return FnHandler;
  }();

  FnHandler.list_users();
  FnHandler.firstChar();

  var create_user = function create_user(firstName, middleName, lastName, accountNumber, accountType, balance) {
    var users = FnHandler.userStorage();
    var fNameCheck = users.findIndex(function (userIndex) {
      return userIndex.firstName == firstName;
    }),
        lNameCheck = users.findIndex(function (userIndex) {
      return userIndex.lastName == lastName;
    });

    if (users[fNameCheck] && users[lNameCheck]) {
      alert("User already exists!");
    } else {
      var newUserAccount = new User(firstName, middleName, lastName, accountNumber, accountType, balance);
      FnHandler.addUser(newUserAccount);
    }
  };

  add_event(id("login-form"), "submit", function (e) {
    e.preventDefault();

    if (id("login-username").value == "admin" && id("login-password").value == "admin") {
      toggle_class(id("modal"), "hide");
    }

    return false;
  });
  add_event(id("open-signup-btn"), "click", function () {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
  });
  add_event(id("signup-form"), "submit", function (e) {
    e.preventDefault();
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
    return false;
  });
  add_event(id("back-signup-btn"), "click", function () {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
  });
  add_event(id("add-form"), "submit", function (e) {
    e.preventDefault();
    var account_type = id("savings").checked ? "Savings" : "Checking",
        account_type_bal = id("savings").checked ? 2000 : 5000,
        add_deposit_dec = parseFloat(id("add-deposit-dec").value) < 10 ? "0".concat(parseFloat(id("add-deposit-dec").value)) : id("add-deposit-dec").value,
        add_deposit = "".concat(id("add-deposit").value, ".").concat(add_deposit_dec);

    if (id("add-first-name").value.length != 0 && id("add-last-name").value.length != 0) {
      create_user(inner(id("add-first-name").value.toUpperCase()), inner(id("add-middle-name").value.toUpperCase()), inner(id("add-last-name").value.toUpperCase()), rand(900000000000) + 100000000000, account_type, parseFloat(account_type_bal + parseFloat(add_deposit)).toFixed(2));
      FnHandler.list_users();
      id("add-first-name").value = "";
      id("add-middle-name").value = "";
      id("add-last-name").value = "";
      id("add-deposit").value = "0";
      id("add-deposit-dec").value = "00";
    } else {
      alert("Please complete the necessary details");
    }

    return false;
  });
  add_event(id("withdraw-form"), "submit", function (e) {
    e.preventDefault();
    var withdraw_amount_dec = parseFloat(id("withdraw-amount-dec").value) < 10 ? "0".concat(parseFloat(id("withdraw-amount-dec").value)) : id("withdraw-amount-dec").value,
        withdraw_amount = "".concat(id("withdraw-amount").value, ".").concat(withdraw_amount_dec);
    FnHandler.withdraw(inner(id("withdraw-account").value.split(" ").join("")), withdraw_amount);
    FnHandler.list_users();
    id("withdraw-account").value = "";
    id("withdraw-amount").value = "0";
    id("withdraw-amount-dec").value = "00";
    return false;
  });
  add_event(id("deposit-form"), "submit", function (e) {
    e.preventDefault();
    var deposit_amount_dec = parseFloat(id("deposit-amount-dec").value) < 10 ? "0".concat(parseFloat(id("deposit-amount-dec").value)) : id("deposit-amount-dec").value,
        deposit_amount = "".concat(id("deposit-amount").value, ".").concat(deposit_amount_dec);
    FnHandler.deposit(inner(id("deposit-account").value.split(" ").join("")), deposit_amount);
    FnHandler.list_users();
    id("deposit-account").value = "";
    id("deposit-amount").value = "0";
    id("deposit-amount-dec").value = "00";
    return false;
  });
  add_event(id("send-form"), "submit", function (e) {
    e.preventDefault();
    var send_amount_dec = parseFloat(id("send-amount-dec").value) < 10 ? "0".concat(parseFloat(id("send-amount-dec").value)) : id("send-amount-dec").value,
        send_amount = "".concat(id("send-amount").value, ".").concat(send_amount_dec);
    FnHandler.send(inner(id("sender-account").value.split(" ").join("")), inner(id("receiver-account").value.split(" ").join("")), send_amount);
    FnHandler.list_users();
    id("sender-account").value = "";
    id("receiver-account").value = "";
    id("send-amount").value = "0";
    id("send-amount-dec").value = "00";
    return false;
  });
});
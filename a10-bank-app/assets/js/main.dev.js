"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

doc_ready(function () {
  var i;

  var User = function User(firstName, middleName, lastName, gender, accountNumber, accountType, balance) {
    _classCallCheck(this, User);

    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.gender = gender;
    this.accountNumber = accountNumber;
    this.accountType = accountType;
    this.balance = balance;
    this.transactionHistory = [];
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
        /**
         * IF USERS KEY STILL DOES NOT EXISTS INSIDE THE LOCAL STORAGE, USERS EMPTY ARRAY WILL BE CREATED
         * ELSE ONCE IT ALREADY WAS CREATED INSIDE THE LOCAL STORAGE,
         * IT WILL GET THE USERS EMPTY ARRAY CREATED INSIDE THE LOCAL STORAGE
         * AND PARSE IT TO RETURN OBJECTS INSTEAD OF STRINGS
         */

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
        // TO GET EITHER THE EMPTY ARRAY OR THE ONE INSIDE THE LOCAL STORAGE AFTER IT WAS ALREADY CREATED
        var users = FnHandler.userStorage();
        users.push(userAccount);
        /**
         * SETS AN ITEM OR KEY INSIDE THE LOCAL STORAGE CALLED USERS
         * AND THEN ITS CORRESPONDING VALUE IS AN ARRAY CONTAINING THE "userAccount" CREATED
         * BECAUSE OF PUSH, AND THEN STRINGIFY IT TO CONVERT THE OBJECTS INTO STRINGS
         * NECESSARY FOR SENDING DATA TO THE WEB SERVER
         */

        localStorage.setItem("users", JSON.stringify(users));
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
        var users = FnHandler.userStorage(); // FINDING THE INDEX OF EXISTING USERS ARRAY ITEM WHEREIN ITS ACCOUNT NUMBER WITH THE CURRENT ACCOUNT NUMBER ENTRY

        var userCheck = users.findIndex(function (userIndex) {
          return userIndex.accountNumber == user;
        });
        /**
         * IF THERE IS NO EXISTING INDEX OF USERS ARRAY ITEM THAT CONTAINS THE CURRENT ACCOUNT NUMBER ENTRY,
         * THE USER WILL NEVER BE FOUND
         */

        if (users[userCheck] == null || users[userCheck] == "") {
          alert("User not found!");
        } else if (parseFloat(users[userCheck].balance) < parseFloat(amount)) {
          alert("Not enough money!");
        } else if (parseFloat(amount) == 0) {
          alert("Enter an amount!");
        } else {
          var gender = users[userCheck].gender == "male" ? "his" : "her"; // FIXED 2 DECIMAL PLACES

          users[userCheck].balance = parseFloat(parseFloat(users[userCheck].balance) - parseFloat(amount)).toFixed(2);
          var initialBal = parseFloat(parseFloat(users[userCheck].balance) + parseFloat(amount)).toFixed(2);
          users[userCheck].transactionHistory.push("<em>".concat(FnHandler.time_stamp(), "</em> : Withdrawn an amount of <strong>\u20B1").concat(amount, "</strong> from <strong>").concat(users[userCheck].firstName, "</strong>'s account. From an initial account balance of <strong>\u20B1").concat(initialBal, "</strong>, ").concat(gender, " remaining account balance is now <strong>\u20B1").concat(users[userCheck].balance, "</strong>."));
          alert("Withdrawal transaction from ".concat(users[userCheck].firstName, "'s account has been successful!"));
        }
        /**
         * THIS IS REPEATED TO UPDATE THE USERS KEY INSIDE THE LOCAL STORAGE
         * BY OVERRIDING AND SETTING IT AGAIN, AND ALSO STRINGIFY IT AGAIN TOO
         */


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
          var gender = users[userCheck].gender == "male" ? "his" : "her";
          users[userCheck].balance = parseFloat(parseFloat(users[userCheck].balance) + parseFloat(amount)).toFixed(2);
          var initialBal = parseFloat(parseFloat(users[userCheck].balance) - parseFloat(amount)).toFixed(2);
          users[userCheck].transactionHistory.push("<em>".concat(FnHandler.time_stamp(), "</em> : Deposited an amount of <strong>\u20B1").concat(amount, "</strong> into <strong>").concat(users[userCheck].firstName, "</strong>'s account. From an initial account balance of <strong>\u20B1").concat(initialBal, "</strong>, ").concat(gender, " account balance is now <strong>\u20B1").concat(users[userCheck].balance, "</strong>."));
          alert("Deposit transaction from ".concat(users[userCheck].firstName, "'s account has been successful!"));
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

        if ((users[senderCheck] == null || users[senderCheck] == "") && (users[receiverCheck] == null || users[receiverCheck] == "")) {
          alert("Users not found!");
        } else if (users[senderCheck] == null || users[senderCheck] == "") {
          alert("Sender's account not found!");
        } else if (users[receiverCheck] == null || users[receiverCheck] == "") {
          alert("Receiver's account not found!");
        } else if (parseFloat(users[senderCheck].balance) < parseFloat(amount)) {
          alert("Not enough money!");
        } else if (parseFloat(amount) == 0) {
          alert("Enter an amount!");
        } else if (users[senderCheck].accountNumber == users[receiverCheck].accountNumber) {
          alert("Account number entries are not allowed!");
        } else {
          var senderGender = users[senderCheck].gender == "male" ? "his" : "her",
              receiverGender = users[receiverCheck].gender == "male" ? "his" : "her";
          users[senderCheck].balance = parseFloat(parseFloat(users[senderCheck].balance) - parseFloat(amount)).toFixed(2);
          var senderInitialBal = parseFloat(parseFloat(users[senderCheck].balance) + parseFloat(amount)).toFixed(2);
          users[senderCheck].transactionHistory.push("<em>".concat(FnHandler.time_stamp(), "</em> : Sent an amount of <strong>\u20B1").concat(amount, "</strong> from <strong>").concat(users[senderCheck].firstName, "</strong>'s account into ").concat(users[receiverCheck].firstName, "'s account. From <strong>").concat(users[senderCheck].firstName, "</strong>'s initial account balance of <strong>\u20B1").concat(senderInitialBal, "</strong>, ").concat(senderGender, " remaining account balance is now <strong>\u20B1").concat(users[senderCheck].balance, "</strong>."));
          users[receiverCheck].balance = parseFloat(parseFloat(users[receiverCheck].balance) + parseFloat(amount)).toFixed(2);
          var receiverInitialBal = parseFloat(parseFloat(users[receiverCheck].balance) - parseFloat(amount)).toFixed(2);
          users[receiverCheck].transactionHistory.push("<em>".concat(FnHandler.time_stamp(), "</em> : Received an amount of <strong>\u20B1").concat(amount, "</strong> from ").concat(users[senderCheck].firstName, "'s account into <strong>").concat(users[receiverCheck].firstName, "</strong>'s account. From <strong>").concat(users[receiverCheck].firstName, "</strong>'s initial account balance of <strong>\u20B1").concat(receiverInitialBal, "</strong>, ").concat(receiverGender, " account balance is now <strong>\u20B1").concat(users[receiverCheck].balance, "</strong>."));
          alert("Successfuly sent money from ".concat(users[senderCheck].firstName, "'s account into ").concat(users[receiverCheck].firstName, "'s account!"));
        }

        localStorage.setItem("users", JSON.stringify(users));
      }
    }, {
      key: "get_balance",
      value: function get_balance(user, parent) {
        var users = FnHandler.userStorage();
        var userCheck = users.findIndex(function (userIndex) {
          return userIndex.accountNumber == user;
        }),
            balanceTd = create_el("td"),
            balanceLi = create_el("li");
        /**
         * IF THE CONDITION IS MET AND TRUE OR USERS ARE EXISTING, THE FUNCTION WILL CONTINUE TO EXECUTE
         * AND DISPLAY THE BALANCE LIST, IN THIS WAY ERRORS CAN BE AVOIDED IF THERE ARE STILL NO USERS EXISTING
         * INSIDE THE LOCAL STORAGE
         */

        if (users[userCheck]) {
          balanceTd.innerHTML = "\u20B1".concat(num_commas(users[userCheck].balance));
          parent.appendChild(balanceTd);
        }
      }
    }, {
      key: "list_users",
      value: function list_users() {
        var users = FnHandler.userStorage(); // EMPTYING THE INNERHTML OF THE TABLE TO PREVENT DUPLICATE STACKS OF DISPLAY PER UPDATE OF OBJECTS

        id("acc-table").innerHTML = "";

        var _loop = function _loop() {
          var j = void 0,
              tableRow = create_el("tr"),
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
          tableRow.appendChild(accNumTd); // ONE CLICK COPY FUNCTION OF A STRING OR TEXT

          add_event(accNumTd, "click", function () {
            document.execCommand("copy");
          }); // SETS OR PASSES THE TEXT COPIED INTO THE CLIPBOARD FOR PASTING

          add_event(accNumTd, "copy", function (e) {
            e.preventDefault();

            if (e.clipboardData) {
              e.clipboardData.setData("text/plain", accNumTd.textContent);
            }
          });
          accTdSpan.innerHTML = "".concat(users[i].firstName, " ").concat(users[i].middleName, " ").concat(users[i].lastName);
          add_class(historyModalClose, "far");
          add_class(historyModalClose, "fa-times-circle");
          add_class(historyModalClose, "fa-2x");
          add_class(historyUl, "xbul");
          add_class(historyUl, "wrap-scroll"); // INDICATION WHEN NO OTHER TRANSACTIONS ARE MADE YET ASIDE FROM OPENING THE ACCOUNT

          if (users[i].transactionHistory.length == 1) {
            noTransact.innerHTML = "No other transactions yet.";
            historyUl.appendChild(noTransact);
          } // REVERSE FOR LOOP, SO THAT LATEST TRANSACTION HISTORY LOG REMAINS AT THE TOP


          for (j = users[i].transactionHistory.length - 1; j >= 0; j--) {
            var historyLi = create_el("li");
            historyLi.innerHTML = users[i].transactionHistory[j];
            add_class(historyLi, "mb-05");
            historyUl.appendChild(historyLi);
          } // OLD CODE
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
          add_event(accTdSpan, "click", function () {
            add_class(historyModal, "show");
          });
          add_event(historyModalClose, "click", function () {
            remove_class(historyModal, "show");
          });
          accTypeTd.innerHTML = users[i].accountType;
          tableRow.appendChild(accTypeTd); // SETTING ID OF EACH DELETE BUTTON WITH REFERENCE TO THE INDICES OF ARRAY ITEMS INSIDE THE LOCAL STORAGE, FOR PRECISE AND ACCURATE DELETION

          deleteTd.innerHTML = "<i id=\"".concat(users.indexOf(users[i]), "\" class=\"fas fa-minus-circle\"></i>");
          /**
           * TARGETING THE DELETE BUTTON ("i") INSIDE EACH "td" ELEMENT AND THEN
           * GETTING THE USERS ARRAY INSIDE THE LOCAL STORAGE TO SPLICE IT AND
           * OVERRIDING AND SETTING IT AGAIN BACK INSIDE THE LOCAL STORAGE FOR UPDATING
           * WHEREIN THE ARRAY ITEMS OF THE USERS ARE ALREADY SPLICED OR RATHER DELETED
           * PROMPT FOR DELETING AN ACCOUNT, TO PREVENT ACCIDENTAL DELETION
           */

          add_event(deleteTd.querySelector("i"), "click", function () {
            var deletePrompt = prompt('Are you sure to delete this account?\nType "Y" for yes and "N" for no.', "N"),
                deleteAnswer = deletePrompt.toLowerCase();

            if (deleteAnswer == "y") {
              var getLocalStorage = JSON.parse(localStorage.getItem("users"));
              getLocalStorage.splice(this.id, 1);
              localStorage.setItem("users", JSON.stringify(getLocalStorage));
              FnHandler.list_users();
            } else {
              return;
            }
          });
          FnHandler.get_balance(users[i].accountNumber, tableRow);
          tableRow.appendChild(deleteTd);
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
                input.value = "0";
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
      }
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

  match_height(".mh");
  FnHandler.list_users();
  FnHandler.first_char();
  FnHandler.negative_char();
  FnHandler.num_only(); // FUNCTION FOR CREATING A NEW USER, CONNECTING THE CLASS "User" INTO THE CLASS "FnHandler" TO PUSH EVERY NEW USER CREATED INTO THE LOCAL STORAGE

  var create_user = function create_user(firstName, middleName, lastName, gender, accountNumber, accountType, balance) {
    var users = FnHandler.userStorage();
    var fNameCheck = users.findIndex(function (userIndex) {
      return userIndex.firstName == firstName;
    }),
        lNameCheck = users.findIndex(function (userIndex) {
      return userIndex.lastName == lastName;
    });
    /**
     * THIS PREVENTS DUPLICATE USERS, EVERY FIRST NAME AND LAST NAME INPUTS ARE CHECKED
     * IF IT IS ALREADY EXISTING INSIDE THE LOCAL STORAGE
     */

    if (users[fNameCheck] && users[lNameCheck]) {
      alert("User already exists!");
    } else {
      var newUserAccount = new User(firstName, middleName, lastName, gender, accountNumber, accountType, balance);
      newUserAccount.transactionHistory.push("<em>".concat(FnHandler.time_stamp(), "</em> : Opened a ").concat(newUserAccount.accountType.toLowerCase(), " account for <strong>").concat(newUserAccount.firstName, "</strong> ").concat(newUserAccount.middleName, " ").concat(newUserAccount.lastName, "."));
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
  }); // LOADS INITIAL DATA FOR IMMEDIATE TESTING PURPOSES OF WHOEVER VISITS THE SITE

  add_event(id("load-data-btn"), "click", function (e) {
    e.preventDefault();
    var users = FnHandler.userStorage();
    var juanCheck = users.findIndex(function (userIndex) {
      return userIndex.firstName == "JUAN";
    }),
        delaCruzCheck = users.findIndex(function (userIndex) {
      return userIndex.lastName == "DELA CRUZ";
    }),
        janeCheck = users.findIndex(function (userIndex) {
      return userIndex.firstName == "JANE";
    }),
        doeCheck = users.findIndex(function (userIndex) {
      return userIndex.lastName == "DOE";
    }); // THIS PREVENTS MULTIPLE LOADING OF INITIAL DATA, AND JUST LOAD IT ONCE

    if (!users[juanCheck] && !users[delaCruzCheck]) {
      var balance = 2500.5;
      create_user("JUAN", "HERMAN", "DELA CRUZ", "male", "07" + (rand(9000000000) + 1000000000), "Savings", balance.toFixed(2));
    }

    if (!users[janeCheck] && !users[doeCheck]) {
      var _balance = 5200;
      create_user("JANE", "HILLS", "DOE", "female", "02" + (rand(9000000000) + 1000000000), "Checking", _balance.toFixed(2));
    }

    FnHandler.list_users();
    return false;
  });
  add_event(id("log-out-btn"), "click", function (e) {
    e.preventDefault();
    toggle_class(id("modal"), "hide");
    FnHandler.reset();
    return false;
  }); // PROMPT FOR CLEARING ALL DATA, TO PREVENT ACCIDENTAL DELETION

  add_event(id("clear-all-btn"), "click", function () {
    var users = FnHandler.userStorage();

    if (users.length != 0) {
      var clearPrompt = prompt('Are you sure to delete all stored datas?\nType "Y" for yes and "N" for no.', "N"),
          clearAnswer = clearPrompt != null ? clearPrompt.toLowerCase() : console.clear();

      if (clearAnswer == "y") {
        window.localStorage.clear();
        FnHandler.list_users();
      } else {
        return;
      }
    }
  });
  add_event(id("add-form"), "submit", function (e) {
    e.preventDefault();
    var gender = id("male").checked ? "male" : "female",
        acc_num = id("savings").checked ? ["05", "06", "07", "08", "09"] : ["01", "02", "03", "04"],
        account_type = id("savings").checked ? "Savings" : "Checking",
        account_type_bal = id("savings").checked ? 2000 : 5000,
        add_deposit_dec = parseFloat(id("add-deposit-amount-dec").value) < 10 ? "0".concat(parseFloat(id("add-deposit-amount-dec").value)) : id("add-deposit-amount-dec").value,
        add_deposit = "".concat(id("add-deposit-amount").value, ".").concat(add_deposit_dec);

    if (id("add-first-name").value.length != 0 && id("add-last-name").value.length != 0) {
      create_user(inner(id("add-first-name").value.toUpperCase()), inner(id("add-middle-name").value.toUpperCase()), inner(id("add-last-name").value.toUpperCase()), gender, acc_num[rand(acc_num.length)] + (rand(9000000000) + 1000000000), account_type, parseFloat(account_type_bal + parseFloat(add_deposit)).toFixed(2));
      FnHandler.list_users();
      alert("".concat(id("add-first-name").value.toUpperCase(), "'s account have been successfully created!"));
      FnHandler.reset();
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
    FnHandler.reset();
    return false;
  });
  add_event(id("deposit-form"), "submit", function (e) {
    e.preventDefault();
    var deposit_amount_dec = parseFloat(id("deposit-amount-dec").value) < 10 ? "0".concat(parseFloat(id("deposit-amount-dec").value)) : id("deposit-amount-dec").value,
        deposit_amount = "".concat(id("deposit-amount").value, ".").concat(deposit_amount_dec);
    FnHandler.deposit(inner(id("deposit-account").value.split(" ").join("")), deposit_amount);
    FnHandler.list_users();
    FnHandler.reset();
    return false;
  });
  add_event(id("send-form"), "submit", function (e) {
    e.preventDefault();
    var send_amount_dec = parseFloat(id("send-amount-dec").value) < 10 ? "0".concat(parseFloat(id("send-amount-dec").value)) : id("send-amount-dec").value,
        send_amount = "".concat(id("send-amount").value, ".").concat(send_amount_dec);
    FnHandler.send(inner(id("sender-account").value.split(" ").join("")), inner(id("receiver-account").value.split(" ").join("")), send_amount);
    FnHandler.list_users();
    FnHandler.reset();
    return false;
  });
});
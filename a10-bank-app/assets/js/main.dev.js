"use strict";

doc_ready(function () {
  localStorage_space();
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
  create_admin("admin", "admin", "1"); // LOADS INITIAL DATA FOR IMMEDIATE TESTING PURPOSES OF WHOEVER VISITS THE SITE

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
      remove_class(document.body, "user");
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
      remove_class(id("open-add-form-btn"), "active");
      remove_class(id("connections-form"), "show");
      remove_class(id("open-connections-wrap-btn"), "active");
      remove_class(id("open-withdraw-form-btn"), "active");
      remove_class(id("open-deposit-form-btn"), "active");
      remove_class(id("open-send-form-btn"), "active");
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
    remove_class(id("open-connections-wrap-btn"), "active");
    remove_class(id("open-withdraw-form-btn"), "active");
    remove_class(id("open-deposit-form-btn"), "active");
    remove_class(id("open-send-form-btn"), "active");
  });
  add_event(id("open-connections-wrap-btn"), "click", function () {
    toggle_class(this, "active");
    remove_class(id("open-add-form-btn"), "active");
    toggle_class(id("connections-form"), "show");
    remove_class(id("open-withdraw-form-btn"), "active");
    remove_class(id("open-deposit-form-btn"), "active");
    remove_class(id("open-send-form-btn"), "active");
  });
  add_event(id("open-withdraw-form-btn"), "click", function () {
    toggle_class(this, "active");
    remove_class(id("open-add-form-btn"), "active");
    remove_class(id("open-connections-wrap-btn"), "active");
    remove_class(id("connections-form"), "show");
    remove_class(id("open-deposit-form-btn"), "active");
    remove_class(id("open-send-form-btn"), "active");
  });
  add_event(id("open-deposit-form-btn"), "click", function () {
    toggle_class(this, "active");
    remove_class(id("open-add-form-btn"), "active");
    remove_class(id("open-connections-wrap-btn"), "active");
    remove_class(id("connections-form"), "show");
    remove_class(id("open-withdraw-form-btn"), "active");
    remove_class(id("open-send-form-btn"), "active");
  });
  add_event(id("open-send-form-btn"), "click", function () {
    toggle_class(this, "active");
    remove_class(id("open-add-form-btn"), "active");
    remove_class(id("open-connections-wrap-btn"), "active");
    remove_class(id("connections-form"), "show");
    remove_class(id("open-withdraw-form-btn"), "active");
    remove_class(id("open-deposit-form-btn"), "active");
  });
});
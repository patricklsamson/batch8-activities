doc_ready(() => {
  localStorage_space();
  match_height(".mh");
  User.list_users();
  Helper.first_char();
  Helper.negative_char();
  Helper.num_only();
  Helper.type_comma();
  Helper.dec_addZero();

  Helper.password_match(
    id("signup-password"),
    id("signup-confirm-password"),
    id("match-msg")
  );

  Helper.password_match(
    id("admin-new-password"),
    id("admin-confirm-new-password"),
    id("admin-change-match-msg")
  );

  Helper.password_match(
    id("new-password"),
    id("confirm-new-password"),
    id("change-match-msg")
  );

  create_admin("admin", "admin", "1");

  // LOADS INITIAL DATA FOR IMMEDIATE TESTING PURPOSES OF WHOEVER VISITS THE SITE
  add_event(id("load-data-btn"), "click", () => {
    const users = User.userStorage();

    let janeCheck = users.findIndex((index) => index.firstName == "JANE"),
      doeCheck = users.findIndex((index) => index.lastName == "DOE"),
      juanCheck = users.findIndex((index) => index.firstName == "JUAN"),
      delaCruzCheck = users.findIndex((index) => index.lastName == "DELA CRUZ"),
      juanitaCheck = users.findIndex((index) => index.firstName == "JUANITA"),
      samonteCheck = users.findIndex((index) => index.lastName == "SAMONTE"),
      johnCheck = users.findIndex((index) => index.firstName == "JOHN"),
      schmoeCheck = users.findIndex((index) => index.lastName == "SCHMOE");

    // THIS PREVENTS MULTIPLE LOADING OF INITIAL DATA, AND JUST LOAD IT ONCE WHEN THE DATA STILL DON'T EXIST
    if (!users[janeCheck] && !users[doeCheck]) {
      let balance = 7200.05;

      // USERNAME AND PASSWORD ARGUMENTS ARE SET TO BLANK (""), THEY WILL ONLY HAVE VALUES FROM SIGNUP FORM
      create_user(
        "janedoe",
        "janedoe",
        "janedoe@mail.com",
        true,
        "JANE",
        "HILLS",
        "DOE",
        "female",
        "023451282250",
        "Checking",
        balance.toFixed(2)
      );

      ExpenseItem.add("GROCERIES", "1500.00", "023451282250");
    }

    if (!users[juanCheck] && !users[delaCruzCheck]) {
      let balance = 2700;

      create_user(
        "juandelacruz",
        "juandelacruz",
        "juandelacruz@mail.com",
        true,
        "JUAN",
        "",
        "DELA CRUZ",
        "male",
        "071096025466",
        "Savings",
        balance.toFixed(2)
      );
    }

    if (!users[juanitaCheck] && !users[samonteCheck]) {
      let balance = 5200.5;

      create_user(
        "",
        "",
        "",
        false,
        "JUANITA",
        "HERMAN",
        "SAMONTE",
        "female",
        "031734218924",
        "Checking",
        balance.toFixed(2)
      );
    }

    if (!users[johnCheck] && !users[schmoeCheck]) {
      let balance = 2500;

      create_user(
        "",
        "",
        "",
        false,
        "JOHN",
        "",
        "SCHMOE",
        "male",
        "064581565583",
        "Savings",
        balance.toFixed(2)
      );

      Connection.add_connections("023451282250", "JUAN", "071096025466");
    }

    // THIS FUNCTION IS CALLED AGAIN TO REFRESH THE LIST IN THE UI
    User.list_users();
  });

  // PROMPT FOR CLEARING ALL DATA, TO PREVENT ACCIDENTAL DELETION
  add_event(id("clear-all-btn"), "click", () => {
    let users = User.userStorage();

    if (users.length != 0) {
      let clearPrompt = prompt(
          'Are you sure to delete all stored datas?\nType "Y" for yes and "N" for no.',
          "N"
        ),
        clearAnswer =
          clearPrompt != null
            ? trimStr(clearPrompt.toLowerCase())
            : console.clear();

      if (clearAnswer == "y") {
        // DOES NOT INCLUDE FIRST ARRAY ITEM IN SPLICING OR DELETING WHICH IS THE ADMIN USERNAME AND PASSWORD
        localStorage.removeItem("users");
        User.list_users();
      } else {
        return;
      }
    }
  });

  add_event(id("add-form"), "submit", (e) => {
    e.preventDefault();

    let gender = id("male").checked ? "male" : "female",
      acc_num = id("savings").checked
        ? ["05", "06", "07", "08", "09"]
        : ["00", "01", "02", "03", "04"],
      account_type = id("savings").checked ? "Savings" : "Checking",
      account_type_bal = id("savings").checked ? 2000 : 5000,
      depositAmount =
        id("add-deposit-amount").value.length == 0
          ? "0"
          : id("add-deposit-amount").value.split(",").join(""),
      add_deposit = `${depositAmount}.${id("add-deposit-amount-dec").value}`;
    /**
     * BECAUSE OF "Helper.type_comma()"
     * ".split(",").join("")" IS NECESSARY TO CONVERT THE VALUE TYPED
     * BACK TO WITHOUT COMMAS FOR STORING
     */

    // OLD CODE
    //  add_deposit_dec =
    //  parseFloat(id("add-deposit-amount-dec").value) < 10
    //    ? `0${parseFloat(id("add-deposit-amount-dec").value)}`
    //    : id("add-deposit-amount-dec").value,

    create_user(
      "",
      "",
      "",
      false,
      inner(trimStr(id("add-first-name").value.toUpperCase())),
      inner(trimStr(id("add-middle-name").value.toUpperCase())),
      inner(trimStr(id("add-last-name").value.toUpperCase())),
      gender,
      acc_num[rand(acc_num.length)] + (rand(9000000000) + 1000000000),
      account_type,
      parseFloat(account_type_bal + parseFloat(add_deposit)).toFixed(2)
    );

    User.list_users();

    alert(
      `${inner(
        trimStr(id("add-first-name").value.toUpperCase())
      )}'s account have been successfully created!`
    );

    id("add-form").reset();

    return false;
  });

  add_event(id("login-form"), "submit", (e) => {
    e.preventDefault();

    User.login_user(
      inner(trimStr(id("login-username").value)),
      inner(trimStr(id("login-password").value))
    );

    Connection.list_connections(
      id("owner-acc-num").innerHTML.split(" ").join("")
    );

    ExpenseItem.list(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""));

    // OLD CODE
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

  add_event(id("log-out-btn"), "click", (e) => {
    e.preventDefault();
    toggle_class(id("modal"), "hide");

    // NEEDED FOR BETTER TRANSITION TIMING WHEN HIDING WINDOWS
    setTimeout(() => {
      add_class(document.body, "y-hidden");
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

      qsel_all(".btn-accordion").forEach((btn) => {
        remove_class(btn, "active");
      });
    }, 500);

    remove_class(id("admin-settings-form"), "hide");
    remove_class(id("user-settings-form"), "show");
    Helper.reset();
    return false;
  });

  add_event(id("open-signup-btn"), "click", () => {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
  });

  add_event(id("signup-form"), "submit", (e) => {
    e.preventDefault();

    let gender = id("signup-male").checked ? "male" : "female";

    User.signup_user(
      inner(trimStr(id("signup-first-name").value.toUpperCase())),
      inner(trimStr(id("signup-middle-name").value.toUpperCase())),
      inner(trimStr(id("signup-last-name").value.toUpperCase())),
      gender,
      inner(trimStr(id("signup-username").value)),
      inner(id("signup-password").value),
      inner(id("signup-confirm-password").value),
      inner(trimStr(id("signup-email").value)),
      id("signup-account-num").value.split(" ").join("")
    );

    return false;
  });

  add_event(id("back-signup-btn"), "click", () => {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
    remove_class(id("match-msg"), "fa-check");
    remove_class(id("match-msg"), "fa-times");
    Helper.reset();
  });

  add_event(id("open-search-btn"), "click", () => {
    toggle_class(id("search-wrap"), "active");
    id("search-name").value = "";

    for (i = 0; i < id("acc-table").querySelectorAll("tr").length; i++) {
      remove_class(id("acc-table").querySelectorAll("tr")[i], "search-hide");
    }

    setTimeout(() => {
      id("search-name").focus();
    }, 100);
  });

  add_event(id("search-name"), "keyup", () => {
    for (i = 0; i < id("acc-table").querySelectorAll("tr").length; i++) {
      if (
        id("acc-table")
          .querySelectorAll("tr")
          [i].querySelectorAll("td")[1]
          .querySelector("span")
      ) {
        if (
          id("acc-table")
            .querySelectorAll("tr")
            [i].querySelectorAll("td")[1]
            .querySelector("span")
            .innerHTML.toUpperCase()
            .indexOf(id("search-name").value.toUpperCase()) > -1
        ) {
          remove_class(
            id("acc-table").querySelectorAll("tr")[i],
            "search-hide"
          );
        } else {
          add_class(id("acc-table").querySelectorAll("tr")[i], "search-hide");
        }
      }
    }
  });

  add_event(id("filter"), "click", () => {
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

  add_event(id("settings-btn"), "click", () => {
    add_class(id("settings-modal"), "show");
  });

  add_event(id("close-settings-btn"), "click", () => {
    remove_class(id("settings-modal"), "show");
    remove_class(id("change-match-msg"), "fa-check");
    remove_class(id("change-match-msg"), "fa-times");
    remove_class(id("admin-change-match-msg"), "fa-check");
    remove_class(id("admin-change-match-msg"), "fa-times");
    Helper.reset();
  });

  add_event(id("owner-transaction-btn"), "click", () => {
    add_class(id("owner-transaction-modal"), "show");
  });

  add_event(id("close-owner-transaction-btn"), "click", () => {
    remove_class(id("owner-transaction-modal"), "show");
  });

  add_event(id("owner"), "click", () => {
    add_class(id("profile-modal"), "show");
  });

  add_event(id("close-profile-btn"), "click", () => {
    remove_class(id("profile-modal"), "show");
  });

  add_event(id("add-expense-form"), "submit", (e) => {
    e.preventDefault();

    let expense_amount = `${id("add-expense-amount")
      .value.split(",")
      .join("")}.${id("add-expense-amount-dec").value}`;

    ExpenseItem.add(
      inner(trimStr(id("add-expense-name").value.toUpperCase())),
      expense_amount,
      id("owner-acc-num").innerHTML.split(" ").join("")
    );

    ExpenseItem.list(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.list_users();
    User.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.total_expenses(id("owner-acc-num").innerHTML.split(" ").join(""));

    return false;
  });

  add_event(id("add-connections-btn"), "click", () => {
    toggle_class(id("connections-form"), "show");
    id("connections-form").reset();
  });

  add_event(id("connections-form"), "submit", (e) => {
    e.preventDefault();

    Connection.add_connections(
      id("owner-acc-num").innerHTML.split(" ").join(""),
      inner(trimStr(id("connections-name").value.toUpperCase())),
      id("connections-account-num").value.split(" ").join("")
    );

    Connection.list_connections(
      id("owner-acc-num").innerHTML.split(" ").join("")
    );

    return false;
  });

  add_event(id("withdraw-form"), "submit", (e) => {
    e.preventDefault();

    let withdraw_amount = `${id("withdraw-amount").value.split(",").join("")}.${
      id("withdraw-amount-dec").value
    }`;

    /**
     * ".split(" ").join("")" IS NECESSARY TO CONVERT THE ACCOUNT NUMBER
     * WITH SPACES WHEN COPIED BACK TO WITHOUT SPACES FOR STORING
     */
    Bank.withdraw(
      id("withdraw-account").value.split(" ").join(""),
      withdraw_amount
    );

    User.list_users();
    User.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    id("withdraw-form").reset();
    return false;
  });

  add_event(id("deposit-form"), "submit", (e) => {
    e.preventDefault();

    let deposit_amount = `${id("deposit-amount").value.split(",").join("")}.${
      id("deposit-amount-dec").value
    }`;

    Bank.deposit(
      id("deposit-account").value.split(" ").join(""),
      deposit_amount
    );

    User.list_users();
    User.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    id("deposit-form").reset();
    return false;
  });

  add_event(id("send-form"), "submit", (e) => {
    e.preventDefault();

    let send_amount = `${id("send-amount").value.split(",").join("")}.${
      id("send-amount-dec").value
    }`;

    Bank.send(
      id("sender-account").value.split(" ").join(""),
      id("receiver-account").value.split(" ").join(""),
      send_amount
    );

    User.list_users();
    User.individual_history(id("owner-acc-num").innerHTML.split(" ").join(""));
    User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
    id("send-form").reset();
    return false;
  });

  qsel_all(".btn-accordion").forEach((btn) => {
    add_event(btn, "click", function () {
      qsel_all(".btn-accordion").forEach((btn) => {
        remove_class(btn, "active");
      });

      add_class(btn, "active");
    });
  });

  // add_event(id("open-add-form-btn"), "click", function () {
  //   toggle_class(this, "active");
  //   remove_class(id("open-connections-wrap-btn"), "active");
  //   remove_class(id("open-withdraw-form-btn"), "active");
  //   remove_class(id("open-deposit-form-btn"), "active");
  //   remove_class(id("open-send-form-btn"), "active");
  // });

  // add_event(id("open-connections-wrap-btn"), "click", function () {
  //   toggle_class(this, "active");
  //   remove_class(id("open-add-form-btn"), "active");
  //   toggle_class(id("connections-form"), "show");
  //   remove_class(id("open-withdraw-form-btn"), "active");
  //   remove_class(id("open-deposit-form-btn"), "active");
  //   remove_class(id("open-send-form-btn"), "active");
  // });

  // add_event(id("open-withdraw-form-btn"), "click", function () {
  //   toggle_class(this, "active");
  //   remove_class(id("open-add-form-btn"), "active");
  //   remove_class(id("open-connections-wrap-btn"), "active");
  //   remove_class(id("connections-form"), "show");
  //   remove_class(id("open-deposit-form-btn"), "active");
  //   remove_class(id("open-send-form-btn"), "active");
  // });

  // add_event(id("open-deposit-form-btn"), "click", function () {
  //   toggle_class(this, "active");
  //   remove_class(id("open-add-form-btn"), "active");
  //   remove_class(id("open-connections-wrap-btn"), "active");
  //   remove_class(id("connections-form"), "show");
  //   remove_class(id("open-withdraw-form-btn"), "active");
  //   remove_class(id("open-send-form-btn"), "active");
  // });

  // add_event(id("open-send-form-btn"), "click", function () {
  //   toggle_class(this, "active");
  //   remove_class(id("open-add-form-btn"), "active");
  //   remove_class(id("open-connections-wrap-btn"), "active");
  //   remove_class(id("connections-form"), "show");
  //   remove_class(id("open-withdraw-form-btn"), "active");
  //   remove_class(id("open-deposit-form-btn"), "active");
  // });
});

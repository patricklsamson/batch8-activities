// SEPARATED ADMIN FOR BETTER DISTINCTION FROM REGULAR USERS ESPECIALLY FOR LOCAL STORAGE
class Admin {
  constructor(username, password, adminId) {
    this.username = username;
    this.password = password;
    this.adminId = adminId;
  }

  static adminStorage() {
    let admin;

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

  static addAdmin(adminAccount) {
    // TO GET EITHER THE EMPTY ARRAY OR THE ONE INSIDE THE LOCAL STORAGE WHEN AFTER IT WAS ALREADY CREATED
    const admin = Admin.adminStorage();

    admin.push(adminAccount);

    /**
     * SETS AN ITEM OR KEY INSIDE THE LOCAL STORAGE CALLED "admin"
     * AND THEN ITS CORRESPONDING VALUE IS AN ARRAY CONTAINING THE "adminAccount" CREATED
     * BECAUSE OF PUSH, AND THEN STRINGIFY IT TO CONVERT THE OBJECT/S INTO STRING/S
     * NECESSARY FOR SENDING DATA TO THE WEB SERVER
     */
    localStorage.setItem("admin", JSON.stringify(admin));
  }

  static individual_history(user) {
    const users = User.userStorage();

    let accountNumCheck = users.findIndex(
      (index) => index.accountNumber == user
    );

    if (users[accountNumCheck] != null) {
      id("owner-transaction").innerHTML = "";

      for (
        i = 0;
        i < users[accountNumCheck].userTransactionHistory.length;
        i++
      ) {
        let transactionLi = create_el("li"),
          noTransact = create_el("li");

        if (users[accountNumCheck].userTransactionHistory.length == 1) {
          noTransact.innerHTML = "No other transactions yet.";
          id("owner-transaction").appendChild(noTransact);
        }

        transactionLi.innerHTML =
          users[accountNumCheck].userTransactionHistory[i];

        add_class(transactionLi, "mb-05");
        id("owner-transaction").appendChild(transactionLi);
      }
    }
  }

  static login_user(username, password) {
    const admin = Admin.adminStorage(),
      users = User.userStorage();

    let usernameCheck = users.findIndex((index) => index.username == username),
      passwordCheck = users.findIndex((index) => index.password == password);

    if (admin[0].username == username && admin[0].password == password) {
      remove_class(document.body, "y-hidden");
      toggle_class(id("modal"), "hide");
      add_class(id("expense-wrap"), "hide");
      add_class(id("connections-wrap"), "hide");
      id("withdraw-account").removeAttribute("value");
      id("deposit-account").removeAttribute("value");
      id("sender-account").removeAttribute("value");

      add_event(id("admin-settings-form"), "submit", (e) => {
        e.preventDefault();

        if (admin[0].password != inner(id("admin-old-password").value)) {
          alert("Old password wrong!");
        } else if (
          inner(id("admin-old-password").value) ==
          inner(id("admin-confirm-new-password").value)
        ) {
          alert("There have been no changes made for the password!");
        } else if (
          inner(id("admin-new-password").value) !=
          inner(id("admin-confirm-new-password").value)
        ) {
          alert("New password entries do not match!");
        } else if (inner(id("admin-confirm-new-password").value).length < 5) {
          let passwordPrompt = prompt(
              'Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',
              "N"
            ),
            passwordAnswer =
              passwordPrompt != null
                ? passwordPrompt.toLowerCase()
                : console_log();

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
    } else if (
      users[usernameCheck] &&
      users[passwordCheck] &&
      usernameCheck == passwordCheck
    ) {
      remove_class(document.body, "y-hidden");
      add_class(document.body, "user");

      for (i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
          // NEEDED FOR BETTER TRANSITION TIMING WHEN SHOWING WINDOWS
          setTimeout(() => {
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

      id(
        "owner"
      ).innerHTML = `${users[usernameCheck].firstName} ${users[usernameCheck].middleName} ${users[usernameCheck].lastName}`;

      id("owner-acc-num").innerHTML = num_space(
        users[usernameCheck].accountNumber
      );

      Admin.individual_history(
        id("owner-acc-num").innerHTML.split(" ").join("")
      );

      id(
        "profile-name"
      ).innerHTML = `${users[usernameCheck].firstName} ${users[usernameCheck].middleName} ${users[usernameCheck].lastName}`;

      id("profile-acc-type").innerHTML = users[usernameCheck].accountType;
      id("profile-username").innerHTML = users[usernameCheck].username;
      id("profile-email").innerHTML = users[usernameCheck].email;

      id("profile-gender").innerHTML =
        users[usernameCheck].gender.substring(0, 1).toUpperCase() +
        users[usernameCheck].gender.substring(1).toLowerCase();

      add_att(id("withdraw-account"), "value", id("owner-acc-num").innerHTML);
      add_att(id("deposit-account"), "value", id("owner-acc-num").innerHTML);
      add_att(id("sender-account"), "value", id("owner-acc-num").innerHTML);

      add_event(id("change-email-form"), "submit", (e) => {
        e.preventDefault();

        if (
          users[usernameCheck].email == inner(trim(id("change-email").value))
        ) {
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

      add_event(id("change-username-form"), "submit", (e) => {
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
          users[usernameCheck].username = inner(
            trim(id("change-username").value)
          );

          id("profile-username").innerHTML = inner(
            trim(id("change-username").value)
          );

          alert("Change username successful!");
          localStorage.setItem("users", JSON.stringify(users));
        }

        id("change-username-form").reset();
        return false;
      });

      add_event(id("change-password-form"), "submit", (e) => {
        e.preventDefault();

        if (users[usernameCheck].password != inner(id("old-password").value)) {
          alert("Old password wrong!");
        } else if (
          inner(id("old-password").value) ==
          inner(id("confirm-new-password").value)
        ) {
          alert("There have been no changes made for the password!");
        } else if (
          inner(id("new-password").value) !=
          inner(id("confirm-new-password").value)
        ) {
          alert("New password entries do not match!");
        } else if (inner(id("confirm-new-password").value).length < 5) {
          let passwordPrompt = prompt(
              'Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',
              "N"
            ),
            passwordAnswer =
              passwordPrompt != null
                ? trim(passwordPrompt.toLowerCase())
                : console_log();

          if (passwordAnswer == "y") {
            users[usernameCheck].password = inner(
              id("confirm-new-password").value
            );

            id("change-password-form").reset();
            remove_class(id("change-match-msg"), "fa-check");
            remove_class(id("change-match-msg"), "fa-times");
            alert("Change password successful!");
            localStorage.setItem("users", JSON.stringify(users));
          } else {
            return;
          }
        } else {
          users[usernameCheck].password = inner(
            id("confirm-new-password").value
          );

          id("change-password-form").reset();
          remove_class(id("change-match-msg"), "fa-check");
          remove_class(id("change-match-msg"), "fa-times");
          alert("Change password successful!");
          localStorage.setItem("users", JSON.stringify(users));
        }

        return false;
      });

      add_event(id("clear-items-btn"), "click", () => {
        const users = User.userStorage();

        let usernameCheck = users.findIndex(
          (index) => index.username == username
        );

        if (users[usernameCheck].expenseItems.length != 0) {
          let deletePrompt = prompt(
              'Are you sure to delete all items?\nType "Y" for yes and "N" for no.',
              "N"
            ),
            deleteAnswer =
              deletePrompt != null
                ? trim(deletePrompt.toLowerCase())
                : console_log();

          if (deleteAnswer == "y") {
            let total = 0;

            for (i = 0; i < users[usernameCheck].expenseItems.length; i++) {
              total = parseFloat(
                total + parseFloat(users[usernameCheck].expenseItems[i].cost)
              );
            }

            users[usernameCheck].budget = parseFloat(
              parseFloat(users[usernameCheck].budget) + total
            );

            users[usernameCheck].expenseItems = [];
            localStorage.setItem("users", JSON.stringify(users));

            ExpenseItem.list(id("owner-acc-num").innerHTML.split(" ").join(""));

            Admin.individual_history(
              id("owner-acc-num").innerHTML.split(" ").join("")
            );

            User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));

            User.total_expenses(
              id("owner-acc-num").innerHTML.split(" ").join("")
            );
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

    setTimeout(() => {
      id("login-form").reset();
    }, 500);
  }

  static signup_user(
    firstName,
    middleName,
    lastName,
    gender,
    username,
    password,
    confirmPassword,
    email,
    accountNumber
  ) {
    const users = User.userStorage();

    /**
     * FINDING THE INDEX OF EXISTING USERS ARRAY ITEM WHEREIN ITS CORRESPONDING PROPERTY
     * MATCHES WITH THE CURRENT ENTRY FOR THAT PROPERTY
     */
    let firstNameCheck = users.findIndex(
        (index) => index.firstName == firstName
      ),
      middleNameCheck = users.findIndex(
        (index) => index.middleName == middleName
      ),
      lastNameCheck = users.findIndex((index) => index.lastName == lastName),
      accountNumberCheck = users.findIndex(
        (index) => index.accountNumber == accountNumber
      ),
      usernameCheck = users.findIndex((index) => index.username == username),
      passwordCheck = users.findIndex((index) => index.password == password),
      emailCheck = users.findIndex((index) => index.email == email);

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

      if (
        users[firstNameCheck] == null ||
        users[firstNameCheck] == "" ||
        users[middleNameCheck] == null ||
        users[middleNameCheck] == "" ||
        users[lastNameCheck] == null ||
        users[lastNameCheck] == "" ||
        users[accountNumberCheck].gender != gender ||
        users[accountNumberCheck] == null ||
        users[accountNumberCheck] == ""
      ) {
        alert("User not found!");
      } else if (username.length < 5) {
        alert("Username cannot be less than 5 characters!");
      } else if (password != confirmPassword) {
        alert("Password entries do not match!");
      } else if (confirmPassword.length < 5) {
        let passwordPrompt = prompt(
            'Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',
            "N"
          ),
          passwordAnswer =
            passwordPrompt != null
              ? trim(passwordPrompt.toLowerCase())
              : console_log();

        if (
          passwordAnswer == "y" &&
          (users[usernameCheck] == null ||
            users[usernameCheck] == "" ||
            users[passwordCheck] == null ||
            users[passwordCheck] == "" ||
            users[emailCheck] == null ||
            users[emailCheck] == "")
        ) {
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
      } else if (
        users[usernameCheck] == null ||
        users[usernameCheck] == "" ||
        users[passwordCheck] == null ||
        users[passwordCheck] == "" ||
        users[emailCheck] == null ||
        users[emailCheck] == ""
      ) {
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

  static withdraw(user, amount) {
    const users = User.userStorage();

    let userCheck = users.findIndex((index) => index.accountNumber == user);

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
      let gender = users[userCheck].gender == "male" ? "His" : "Her";

      // FIXED 2 DECIMAL PLACES
      users[userCheck].balance = parseFloat(
        parseFloat(users[userCheck].balance) - parseFloat(amount)
      ).toFixed(2);

      users[userCheck].budget = parseFloat(
        parseFloat(users[userCheck].budget) - parseFloat(amount)
      ).toFixed(2);

      let initialBal = parseFloat(
        parseFloat(users[userCheck].balance) + parseFloat(amount)
      ).toFixed(2);

      // TRANSACTION HISTORY FOR ADMIN
      users[userCheck].transactionHistory.unshift(
        `<em>${Helper.time_stamp()}</em> : Withdrawal transaction amounting to <strong>₱${num_commas(
          amount
        )}</strong> from <strong>${
          users[userCheck].firstName
        }</strong>'s account has been successful. ${gender} remaining account balance is now <strong>₱${num_commas(
          users[userCheck].balance
        )}</strong> from a previous account balance of <strong>₱${num_commas(
          initialBal
        )}</strong>.`
      );

      // TRANSACTION HISTORY FOR USER
      users[userCheck].userTransactionHistory.unshift(
        `<em>${Helper.time_stamp()}</em> : Withdrawal transaction amounting to <strong>₱${num_commas(
          amount
        )}</strong> from your account has been successful. Your remaining account balance is now <strong>₱${num_commas(
          users[userCheck].balance
        )}</strong> from a previous account balance of <strong>₱${num_commas(
          initialBal
        )}</strong>.`
      );

      alert(`Withdrawal transaction has been successful!`);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  static deposit(user, amount) {
    const users = User.userStorage();

    let userCheck = users.findIndex((index) => index.accountNumber == user);

    if (users[userCheck] == null || users[userCheck] == "") {
      alert("User not found!");
    } else if (parseFloat(amount) == null || parseFloat(amount) == "") {
      alert("Enter an amount!");
    } else {
      let gender = users[userCheck].gender == "male" ? "His" : "Her";

      users[userCheck].balance = parseFloat(
        parseFloat(users[userCheck].balance) + parseFloat(amount)
      ).toFixed(2);

      users[userCheck].budget = parseFloat(
        parseFloat(users[userCheck].budget) + parseFloat(amount)
      ).toFixed(2);

      let initialBal = parseFloat(
        parseFloat(users[userCheck].balance) - parseFloat(amount)
      ).toFixed(2);

      users[userCheck].transactionHistory.unshift(
        `<em>${Helper.time_stamp()}</em> : Deposit transaction amounting to <strong>₱${num_commas(
          amount
        )}</strong> into <strong>${
          users[userCheck].firstName
        }</strong>'s account has been successful. ${gender} account balance is now <strong>₱${num_commas(
          users[userCheck].balance
        )}</strong> from a previous account balance of <strong>₱${num_commas(
          initialBal
        )}</strong>.`
      );

      users[userCheck].userTransactionHistory.unshift(
        `<em>${Helper.time_stamp()}</em> : Deposit transaction amounting to <strong>₱${num_commas(
          amount
        )}</strong> into your account has been successful. Your account balance is now <strong>₱${num_commas(
          users[userCheck].balance
        )}</strong> from a previous account balance of <strong>₱${num_commas(
          initialBal
        )}</strong>.`
      );

      alert(`Deposit transaction account has been successful!`);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  static send(from_user, to_user, amount) {
    const users = User.userStorage();

    let senderCheck = users.findIndex(
        (index) => index.accountNumber == from_user
      ),
      receiverCheck = users.findIndex(
        (index) => index.accountNumber == to_user
      );

    if (
      (users[senderCheck] == null || users[senderCheck] == "") &&
      (users[receiverCheck] == null || users[receiverCheck] == "")
    ) {
      alert("Users not found!");
    } else if (users[senderCheck] == null || users[senderCheck] == "") {
      alert("Sender's account not found!");
    } else if (users[receiverCheck] == null || users[receiverCheck] == "") {
      alert("Receiver's account not found!");
    } else if (parseFloat(users[senderCheck].balance) < parseFloat(amount)) {
      alert("Not enough money!");
    } else if (parseFloat(amount) == null || parseFloat(amount) == "") {
      alert("Enter an amount!");
    } else if (
      users[senderCheck].accountNumber == users[receiverCheck].accountNumber
    ) {
      alert("Account number entries are not allowed!");
    } else {
      let senderGender = users[senderCheck].gender == "male" ? "his" : "her",
        receiverGender = users[receiverCheck].gender == "male" ? "his" : "her";

      users[senderCheck].balance = parseFloat(
        parseFloat(users[senderCheck].balance) - parseFloat(amount)
      ).toFixed(2);

      users[senderCheck].budget = parseFloat(
        parseFloat(users[senderCheck].budget) - parseFloat(amount)
      ).toFixed(2);

      let senderInitialBal = parseFloat(
        parseFloat(users[senderCheck].balance) + parseFloat(amount)
      ).toFixed(2);

      users[senderCheck].transactionHistory.unshift(
        `<em>${Helper.time_stamp()}</em> : Incoming money transfer amounting to <strong>₱${num_commas(
          amount
        )}</strong> from <strong>${
          users[senderCheck].firstName
        }</strong>'s account into ${
          users[receiverCheck].firstName
        }'s account has been successful. <strong>${
          users[senderCheck].firstName
        }</strong>'s remaining account balance is now <strong>₱${num_commas(
          users[senderCheck].balance
        )}</strong> from ${senderGender} previous account balance of <strong>₱${num_commas(
          senderInitialBal
        )}</strong>.`
      );

      users[senderCheck].userTransactionHistory.unshift(
        `<em>${Helper.time_stamp()}</em> : Incoming money transfer amounting to <strong>₱${num_commas(
          amount
        )}</strong> from your account into ${
          users[receiverCheck].firstName
        }'s account has been successful. Your remaining account balance is now <strong>₱${num_commas(
          users[senderCheck].balance
        )}</strong> from a previous account balance of <strong>₱${num_commas(
          senderInitialBal
        )}</strong>.`
      );

      users[receiverCheck].balance = parseFloat(
        parseFloat(users[receiverCheck].balance) + parseFloat(amount)
      ).toFixed(2);

      let receiverInitialBal = parseFloat(
        parseFloat(users[receiverCheck].balance) - parseFloat(amount)
      ).toFixed(2);

      users[receiverCheck].transactionHistory.unshift(
        `<em>${Helper.time_stamp()}</em> : Incoming money transfer amounting to <strong>₱${num_commas(
          amount
        )}</strong> from ${
          users[senderCheck].firstName
        }'s account into <strong>${
          users[receiverCheck].firstName
        }</strong>'s account has been successful. <strong>${
          users[receiverCheck].firstName
        }</strong>'s account balance is now <strong>₱${num_commas(
          users[receiverCheck].balance
        )}</strong> from ${receiverGender} previous account balance of <strong>₱${num_commas(
          receiverInitialBal
        )}</strong>.`
      );

      users[receiverCheck].userTransactionHistory.unshift(
        `<em>${Helper.time_stamp()}</em> : Incoming money transfer amounting to <strong>₱${num_commas(
          amount
        )}</strong> from ${
          users[senderCheck].firstName
        }'s account into your account has been successful. Your account balance is now <strong>₱${num_commas(
          users[receiverCheck].balance
        )}</strong> from a previous account balance of <strong>₱${num_commas(
          receiverInitialBal
        )}</strong>.`
      );

      alert(`Money transfer has been successful!`);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  static list_users() {
    const users = User.userStorage();

    // EMPTYING THE INNERHTML OF THE TABLE TO PREVENT DUPLICATE STACKS OF DISPLAY PER UPDATE OF OBJECTS
    id("acc-table").innerHTML = "";

    // ITERATION STARTS AT ONE TO PREVENT THE FIRST ARRAY ITEM TO DISPLAY WHICH IS FOR THE ADMIN
    for (i = 0; i < users.length; i++) {
      let tableRow = create_el("tr"),
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
      Helper.click_copy(accNumTd);

      accTdSpan.innerHTML = `${users[i].firstName} ${users[i].middleName} ${users[i].lastName}`;

      add_event(accTdSpan, "click", () => {
        add_class(document.body, "show");
        add_class(historyModal, "show");
      });

      add_class(historyModalClose, "far");
      add_class(historyModalClose, "fa-times-circle");
      add_class(historyModalClose, "fa-2x");
      add_class(historyUl, "xbul");
      add_class(historyUl, "wrap-scroll");

      add_event(historyModalClose, "click", () => {
        remove_class(document.body, "show");
        remove_class(historyModal, "show");
      });

      // INDICATION WHEN NO OTHER TRANSACTIONS ARE MADE YET ASIDE FROM OPENING THE ACCOUNT
      if (users[i].transactionHistory.length == 1) {
        noTransact.innerHTML = "No other transactions yet.";
        historyUl.appendChild(noTransact);
      }

      for (j = 0; j < users[i].transactionHistory.length; j++) {
        let historyLi = create_el("li");

        historyLi.innerHTML = users[i].transactionHistory[j];
        add_class(historyLi, "mb-05");
        historyUl.appendChild(historyLi);
      }

      // OLD CODE
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
      tableRow.appendChild(accTypeTd);

      // SETTING ID OF EACH DELETE BUTTON WITH REFERENCE TO THE INDICES OF ARRAY ITEMS INSIDE THE LOCAL STORAGE, FOR PRECISE AND ACCURATE DELETION
      deleteTd.innerHTML = `<i id="${users.indexOf(
        users[i]
      )}" class="fas fa-minus-circle"></i>`;

      // TARGETING THE DELETE BUTTON ("i") INSIDE EACH "td" ELEMENT
      add_event(deleteTd.querySelector("i"), "click", function () {
        // PROMPT FOR DELETING AN INDIVIDUAL ACCOUNT, TO PREVENT ACCIDENTAL DELETION
        let deletePrompt = prompt(
            'Are you sure to delete this account?\nType "Y" for yes and "N" for no.',
            "N"
          ),
          deleteAnswer =
            deletePrompt != null
              ? trim(deletePrompt.toLowerCase())
              : console_log();
        // THIS TERNARY OPERATOR PREVENTS ERROR POPPING UP WHEN THE PROMPT HAS BEEN CANCELED

        if (deleteAnswer == "y") {
          users.splice(this.id, 1);
          localStorage.setItem("users", JSON.stringify(users));
          Admin.list_users();
        } else {
          return;
        }
      });

      User.get_balance(users[i].accountNumber, tableRow);
      tableRow.appendChild(deleteTd);
      add_class(tableRow, users[i].accountType.toLowerCase());
      id("acc-table").appendChild(tableRow);
    }
  }
}

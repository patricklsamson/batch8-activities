// CONSTRUCTOR FOR EACH INDIVIDUAL USERS THAT INHERITS ADMIN USERNAME AND PASSWORD PROPERTIES
class User extends Admin {
  constructor(
    username,
    password,
    email,
    signedUp,
    firstName,
    middleName,
    lastName,
    gender,
    accountNumber,
    accountType,
    balance
  ) {
    super(username, password);
    this.email = email;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.gender = gender;
    this.accountNumber = accountNumber;
    this.accountType = accountType;
    this.balance = balance;
    this.budget = balance;
    this.signedUp = signedUp;
    this.transactionHistory = [];
    this.userTransactionHistory = [];
    this.expenseItems = [];
    this.connections = [];
  }

  static userStorage() {
    let users;

    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }

    return users;
  }

  static addUser(userAccount) {
    const users = User.userStorage();

    users.push(userAccount);
    localStorage.setItem("users", JSON.stringify(users));
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

      User.individual_history(
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
          users[usernameCheck].email == inner(trimStr(id("change-email").value))
        ) {
          alert("There have been no changes made for the email!");
        } else {
          users[usernameCheck].email = inner(trimStr(id("change-email").value));

          id("profile-email").innerHTML = inner(trimStr(id("change-email").value));

          alert("Change email successful!");
          localStorage.setItem("users", JSON.stringify(users));
        }

        id("change-email-form").reset();
        return false;
      });

      add_event(id("change-username-form"), "submit", (e) => {
        e.preventDefault();

        for (i = 0; i < users.length; i++) {
          if (users[i].username == inner(trimStr(id("change-username").value))) {
            alert("Username already used!");
            return;
          }
        }

        if (id("change-username").value.length < 5) {
          alert("Username cannot be less than 5 characters!");
        } else {
          users[usernameCheck].username = inner(
            trimStr(id("change-username").value)
          );

          id("profile-username").innerHTML = inner(
            trimStr(id("change-username").value)
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
                ? trimStr(passwordPrompt.toLowerCase())
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
                ? trimStr(deletePrompt.toLowerCase())
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

            User.individual_history(
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
              ? trimStr(passwordPrompt.toLowerCase())
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

  static get_budget(owner) {
    const users = User.userStorage();

    let ownerCheck = users.findIndex((index) => index.accountNumber == owner);

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

  static get_balance(user, parentEl) {
    const users = User.userStorage();

    let userCheck = users.findIndex((index) => index.accountNumber == user),
      balanceTd = create_el("td");

    /**
     * IF THE CONDITION IS MET AND TRUE OR USERS ARE ALREADY EXISTING, THE FUNCTION WILL CONTINUE TO EXECUTE
     * AND DISPLAY THE BALANCE LIST, IN THIS WAY ERRORS CAN BE AVOIDED IF THERE ARE STILL NO USERS EXISTING
     * INSIDE THE LOCAL STORAGE
     */
    if (users[userCheck]) {
      balanceTd.innerHTML = `₱${num_commas(users[userCheck].balance)}`;
      parentEl.appendChild(balanceTd);
    }
  }

  static total_expenses(owner) {
    const users = User.userStorage();

    let ownerCheck = users.findIndex((index) => index.accountNumber == owner),
      total = 0;

    if (users[ownerCheck] != null) {
      id("owner-expenses").innerHTML = "";

      for (i = 0; i < users[ownerCheck].expenseItems.length; i++) {
        total = parseFloat(
          total + parseFloat(users[ownerCheck].expenseItems[i].cost)
        );
      }

      id("owner-expenses").innerHTML = num_commas(total.toFixed(2));
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
              ? trimStr(deletePrompt.toLowerCase())
              : console_log();
        // THIS TERNARY OPERATOR PREVENTS ERROR POPPING UP WHEN THE PROMPT HAS BEEN CANCELED

        if (deleteAnswer == "y") {
          users.splice(this.id, 1);
          localStorage.setItem("users", JSON.stringify(users));
          User.list_users();
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
}

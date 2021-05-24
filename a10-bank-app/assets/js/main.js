doc_ready(() => {
  let i;

  // SEPARATED ADMIN FOR BETTER DISTINCTION FROM REGULAR USERS ESPECIALLY FOR LOCAL STORAGE
  class Admin {
    constructor(username, password, adminId) {
      this.username = username;
      this.password = password;
      this.adminId = adminId;
    }
  }

  // CONSTRUCTOR FOR EACH INDIVIDUAL USERS THAT INHERITS ADMIN USERNAME AND PASSWORD PROPERTIES
  class User extends Admin {
    constructor(
      username,
      password,
      email,
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
      this.transactionHistory = [];
      this.userTransactionHistory = [];
      this.expenseItems = [];
      this.friends = [];
    }
  }

  class ExpenseItem {
    constructor(name, cost, owner) {
      this.name = name;
      this.cost = cost;
      this.owner = owner;
    }
  }

  class FnHandler {
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
      const admin = FnHandler.adminStorage();

      admin.push(adminAccount);

      /**
       * SETS AN ITEM OR KEY INSIDE THE LOCAL STORAGE CALLED "admin"
       * AND THEN ITS CORRESPONDING VALUE IS AN ARRAY CONTAINING THE "adminAccount" CREATED
       * BECAUSE OF PUSH, AND THEN STRINGIFY IT TO CONVERT THE OBJECT/S INTO STRING/S
       * NECESSARY FOR SENDING DATA TO THE WEB SERVER
       */
      localStorage.setItem("admin", JSON.stringify(admin));
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
      const users = FnHandler.userStorage();

      users.push(userAccount);
      localStorage.setItem("users", JSON.stringify(users));
    }

    static login_user(username, password) {
      const admin = FnHandler.adminStorage(),
        users = FnHandler.userStorage();

      let adminUsernameCheck = admin.findIndex(
          (index) => index.username == username
        ),
        adminPasswordCheck = admin.findIndex(
          (index) => index.password == password
        ),
        usernameCheck = users.findIndex((index) => index.username == username),
        passwordCheck = users.findIndex((index) => index.password == password);

      if (admin[adminUsernameCheck] && admin[adminPasswordCheck]) {
        toggle_class(id("modal"), "hide");
        add_class(id("friends-li"), "hide");
        add_class(id("transactions-li"), "hide");
        add_class(id("expense-wrap"), "hide");
      } else if (users[usernameCheck] && users[passwordCheck]) {
        let j;

        for (i = 0; i < users.length; i++) {
          if (users[i].username == username && users[i].password == password) {
            // NEEDED FOR BETTER TRANSITION TIMING WHEN SHOWING WINDOWS
            setTimeout(() => {
              toggle_class(id("modal"), "hide");
            }, 250);

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

        for (
          j = 0;
          j < users[usernameCheck].userTransactionHistory.length;
          j++
        ) {
          let transactionLi = create_el("li"),
            noTransact = create_el("li");

          if (users[usernameCheck].userTransactionHistory.length == 1) {
            noTransact.innerHTML = "No other transactions yet.";
            id("owner-transaction").appendChild(noTransact);
          }

          transactionLi.innerHTML =
            users[usernameCheck].userTransactionHistory[j];

          id("owner-transaction").appendChild(transactionLi);
        }
      } else {
        alert("User not found!");
      }
    }

    static signup_user(
      firstName,
      middleName,
      lastName,
      gender,
      username,
      password,
      email,
      accountNumber
    ) {
      const users = FnHandler.userStorage();

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
        emailCheck = users.findIndex((userIndex) => userIndex.email == email);

      // IF USERNAME PASSWORD AND EMAIL ARE STILL NULL OR EMPTY, THE SIGNING UP WILL CONTINUE, OTHERWISE NOT
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
        users[accountNumberCheck].password = password;
        users[accountNumberCheck].email = email;
      } else {
        alert("You have already signed up!");
      }

      /**
       * THIS IS REPEATED TO UPDATE THE USERS KEY INSIDE THE LOCAL STORAGE
       * BY OVERRIDING AND SETTING IT AGAIN, AND ALSO STRINGIFY IT AGAIN TOO
       */
      localStorage.setItem("users", JSON.stringify(users));
    }

    static time_stamp() {
      const today = new Date(),
        month =
          today.getMonth() < 10
            ? `0${today.getMonth() + 1}`
            : today.getMonth() + 1,
        date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate(),
        dateFull = `${month}/${date}/${today.getFullYear()}`,
        hour =
          today.getHours() < 10 ? `0${today.getHours()}` : today.getHours(),
        minute =
          today.getMinutes() < 10
            ? `0${today.getMinutes()}`
            : today.getMinutes(),
        seconds =
          today.getSeconds() < 10
            ? `0${today.getSeconds()}`
            : today.getSeconds(),
        timeFull = `${hour}:${minute}:${seconds}`;

      return `${dateFull} - ${timeFull}`;
    }

    static withdraw(user, amount) {
      const users = FnHandler.userStorage();

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
        let gender = users[userCheck].gender == "male" ? "his" : "her";

        // FIXED 2 DECIMAL PLACES
        users[userCheck].balance = parseFloat(
          parseFloat(users[userCheck].balance) - parseFloat(amount)
        ).toFixed(2);

        let initialBal = parseFloat(
          parseFloat(users[userCheck].balance) + parseFloat(amount)
        ).toFixed(2);

        // TRANSACTION HISTORY FOR ADMIN
        users[userCheck].transactionHistory.unshift(
          `<em>${FnHandler.time_stamp()}</em> : Withdrawn an amount of <strong>₱${amount}</strong> from <strong>${
            users[userCheck].firstName
          }</strong>'s account. From a previous account balance of <strong>₱${initialBal}</strong>, ${gender} remaining account balance is now <strong>₱${
            users[userCheck].balance
          }</strong>.`
        );

        // TRANSACTION HISTORY FOR USER
        users[userCheck].userTransactionHistory.unshift(
          `<em>${FnHandler.time_stamp()}</em> : You withdrawed an amount of <strong>₱${amount}</strong> from your account. From a previous account balance of <strong>₱${initialBal}</strong>, your remaining account balance is now <strong>₱${
            users[userCheck].balance
          }</strong>.`
        );

        alert(`Withdrawal transaction has been successful!`);
      }

      localStorage.setItem("users", JSON.stringify(users));
    }

    static deposit(user, amount) {
      const users = FnHandler.userStorage();

      let userCheck = users.findIndex((index) => index.accountNumber == user);

      if (users[userCheck] == null || users[userCheck] == "") {
        alert("User not found!");
      } else if (parseFloat(amount) == null || parseFloat(amount) == "") {
        alert("Enter an amount!");
      } else {
        let gender = users[userCheck].gender == "male" ? "his" : "her";

        users[userCheck].balance = parseFloat(
          parseFloat(users[userCheck].balance) + parseFloat(amount)
        ).toFixed(2);

        let initialBal = parseFloat(
          parseFloat(users[userCheck].balance) - parseFloat(amount)
        ).toFixed(2);

        users[userCheck].transactionHistory.unshift(
          `<em>${FnHandler.time_stamp()}</em> : Deposited an amount of <strong>₱${amount}</strong> into <strong>${
            users[userCheck].firstName
          }</strong>'s account. From a previous account balance of <strong>₱${initialBal}</strong>, ${gender} account balance is now <strong>₱${
            users[userCheck].balance
          }</strong>.`
        );

        users[userCheck].userTransactionHistory.unshift(
          `<em>${FnHandler.time_stamp()}</em> : You deposited an amount of <strong>₱${amount}</strong> into your account. From a previous account balance of <strong>₱${initialBal}</strong>, your remaining account balance is now <strong>₱${
            users[userCheck].balance
          }</strong>.`
        );

        alert(`Deposit transaction account has been successful!`);
      }

      localStorage.setItem("users", JSON.stringify(users));
    }

    static send(from_user, to_user, amount) {
      const users = FnHandler.userStorage();

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
          receiverGender =
            users[receiverCheck].gender == "male" ? "his" : "her";

        users[senderCheck].balance = parseFloat(
          parseFloat(users[senderCheck].balance) - parseFloat(amount)
        ).toFixed(2);

        let senderInitialBal = parseFloat(
          parseFloat(users[senderCheck].balance) + parseFloat(amount)
        ).toFixed(2);

        users[senderCheck].transactionHistory.unshift(
          `<em>${FnHandler.time_stamp()}</em> : Sent an amount of <strong>₱${amount}</strong> from <strong>${
            users[senderCheck].firstName
          }</strong>'s account into ${
            users[receiverCheck].firstName
          }'s account. From <strong>${
            users[senderCheck].firstName
          }</strong>'s previous account balance of <strong>₱${senderInitialBal}</strong>, ${senderGender} remaining account balance is now <strong>₱${
            users[senderCheck].balance
          }</strong>.`
        );

        users[senderCheck].userTransactionHistory.unshift(
          `<em>${FnHandler.time_stamp()}</em> : You sent an amount of <strong>₱${amount}</strong> from your account into ${
            users[receiverCheck].firstName
          }'s account. From a previous account balance of <strong>₱${senderInitialBal}</strong>, your remaining account balance is now <strong>₱${
            users[senderCheck].balance
          }</strong>.`
        );

        users[receiverCheck].balance = parseFloat(
          parseFloat(users[receiverCheck].balance) + parseFloat(amount)
        ).toFixed(2);

        let receiverInitialBal = parseFloat(
          parseFloat(users[receiverCheck].balance) - parseFloat(amount)
        ).toFixed(2);

        users[receiverCheck].transactionHistory.unshift(
          `<em>${FnHandler.time_stamp()}</em> : Received an amount of <strong>₱${amount}</strong> from ${
            users[senderCheck].firstName
          }'s account into <strong>${
            users[receiverCheck].firstName
          }</strong>'s account. From <strong>${
            users[receiverCheck].firstName
          }</strong>'s previous account balance of <strong>₱${receiverInitialBal}</strong>, ${receiverGender} account balance is now <strong>₱${
            users[receiverCheck].balance
          }</strong>.`
        );

        users[receiverCheck].userTransactionHistory.unshift(
          `<em>${FnHandler.time_stamp()}</em> : You received an amount of <strong>₱${amount}</strong> from ${
            users[senderCheck].firstName
          }'s account into your account. From a previous account balance of <strong>₱${receiverInitialBal}</strong>, your account balance is now <strong>₱${
            users[receiverCheck].balance
          }</strong>.`
        );

        alert(`Money transfer transaction has been successful!`);
      }

      localStorage.setItem("users", JSON.stringify(users));
    }

    static get_balance(user, parent) {
      const users = FnHandler.userStorage();

      let userCheck = users.findIndex((index) => index.accountNumber == user),
        balanceTd = create_el("td");

      /**
       * IF THE CONDITION IS MET AND TRUE OR USERS ARE ALREADY EXISTING, THE FUNCTION WILL CONTINUE TO EXECUTE
       * AND DISPLAY THE BALANCE LIST, IN THIS WAY ERRORS CAN BE AVOIDED IF THERE ARE STILL NO USERS EXISTING
       * INSIDE THE LOCAL STORAGE
       */
      if (users[userCheck]) {
        balanceTd.innerHTML = `₱${num_commas(users[userCheck].balance)}`;
        parent.appendChild(balanceTd);
      }
    }

    static list_users() {
      const users = FnHandler.userStorage();

      // EMPTYING THE INNERHTML OF THE TABLE TO PREVENT DUPLICATE STACKS OF DISPLAY PER UPDATE OF OBJECTS
      id("acc-table").innerHTML = "";

      // ITERATION STARTS AT ONE TO PREVENT THE FIRST ARRAY ITEM TO DISPLAY WHICH IS FOR THE ADMIN
      for (i = 0; i < users.length; i++) {
        let j,
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
        tableRow.appendChild(accNumTd);

        // ONE CLICK COPY FUNCTION OF A STRING OR TEXT
        add_event(accNumTd, "click", () => {
          document.execCommand("copy");
        });

        // SETS OR PASSES THE TEXT COPIED INTO THE CLIPBOARD FOR PASTING
        add_event(accNumTd, "copy", (e) => {
          e.preventDefault();

          if (e.clipboardData) {
            e.clipboardData.setData("text/plain", accNumTd.textContent);
          }
        });

        accTdSpan.innerHTML = `${users[i].firstName} ${users[i].middleName} ${users[i].lastName}`;
        add_class(historyModalClose, "far");
        add_class(historyModalClose, "fa-times-circle");
        add_class(historyModalClose, "fa-2x");
        add_class(historyUl, "xbul");
        add_class(historyUl, "wrap-scroll");

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

        add_event(accTdSpan, "click", () => {
          add_class(historyModal, "show");
        });

        add_event(historyModalClose, "click", () => {
          remove_class(historyModal, "show");
        });

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
                ? deletePrompt.toLowerCase()
                : console.clear();
          // THIS TERNARY OPERATOR PREVENTS ERROR POPPING UP WHEN THE PROMPT HAS BEEN CANCELED

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

        id("acc-table").appendChild(tableRow);
      }
    }

    // ONCE FIRST VALUE OR CHARACTER INPUTTED IS A NUMBER IN ALL NAME INPUTS ACROSS THE DOM, ALERT WILL EXEECUTE
    static first_char() {
      qsel_all("[id*='-name']").forEach((input) => {
        add_event(input, "keyup", () => {
          if (
            input.value.length > 0 &&
            !(
              input.value.charCodeAt(0) > 31 &&
              (input.value.charCodeAt(0) < 48 || input.value.charCodeAt(0) > 57)
            )
          ) {
            alert("Invalid input!");
            input.value = "";
          }
        });
      });
    }

    // ONCE NEGATIVE OR MINUS SIGN IS INPUTTED IN ALL AMOUNT INPUTS ACROSS THE DOM, ALERT WILL EXECUTE
    static negative_char() {
      qsel_all("[id*='-amount']").forEach((input) => {
        add_event(input, "keyup", (e) => {
          if ((e.which || e.keyCode) == 189) {
            alert("Amount cannot be negative!");

            // CHECKS IF INPUT ID INCLUDES "dec" (DECIMAL INPUTS), THEN CHANGES ITS VALUE ACCORDINGLY
            if (input.id.includes("dec")) {
              input.value = "00";
            } else {
              input.value = "";
            }
          }
        });
      });
    }

    // RESTRICT NUMBER INPUT IN ALL ACCOUNT INPUTS ACROSS THE DOM
    static num_only() {
      qsel_all("[id*='-account']").forEach((input) => {
        add_att(input, "onkeypress", "return num_only(event)");
      });

      qsel_all("[id*='-amount']").forEach((input) => {
        add_att(input, "onkeypress", "return num_only(event)");
      });
    }

    // UI FOR ADDING COMMAS WHILE TYPING IN ALL AMOUNT INPUTS ACROSS THE DOM
    static type_comma() {
      qsel_all("[id*='-amount']").forEach((input) => {
        add_event(input, "keyup", (e) => {
          // SKIP FOR ARROW KEYS
          if (
            (e.which >= 37 && e.which <= 40) ||
            (e.keyCode >= 37 && e.keyCode <= 40)
          ) {
            return;
          }

          input.value = input.value
            .replace(/,/gi, "")
            .split(/(?=(?:\d{3})+$)/)
            .join(",");
        });
      });
    }

    // FORCING ALL DECIMAL INPUTS ACROSS THE DOM TO ADD ZERO WHEN IT IS STILL A SINGLE DIGIT NUMBER
    static dec_addZero() {
      qsel_all("[id*='-dec']").forEach((input) => {
        add_event(input, "change", () => {
          if (!isNaN(input.value) && input.value.length == 1) {
            input.value = `0${input.value}`;
          }
        });
      });
    }

    static password_match() {
      add_event(id("signup-password"), "keyup", function () {
        if (
          this.value == id("signup-confirm-password").value &&
          this.value.length != 0
        ) {
          remove_class(id("match-msg"), "fa-times");
          add_class(id("match-msg"), "fa-check");
        } else if (
          this.value != id("signup-confirm-password").value &&
          id("signup-confirm-password").value.length >= 1
        ) {
          remove_class(id("match-msg"), "fa-check");
          add_class(id("match-msg"), "fa-times");
        } else if (this.value.length == 0) {
          remove_class(id("match-msg"), "fa-check");
          remove_class(id("match-msg"), "fa-times");
        }
      });

      add_event(id("signup-confirm-password"), "keyup", function () {
        if (
          this.value == id("signup-password").value &&
          this.value.length != 0
        ) {
          remove_class(id("match-msg"), "fa-times");
          add_class(id("match-msg"), "fa-check");
        } else if (
          this.value != id("signup-password").value &&
          id("signup-password").value.length >= 1
        ) {
          remove_class(id("match-msg"), "fa-check");
          add_class(id("match-msg"), "fa-times");
        } else if (this.value.length == 0) {
          remove_class(id("match-msg"), "fa-check");
          remove_class(id("match-msg"), "fa-times");
        }
      });
    }

    // FOR RESETTING ALL FORMS AT ONCE
    static reset() {
      qsel_all("form").forEach((form) => {
        form.reset();
      });
    }
  }

  match_height(".mh");
  FnHandler.list_users();
  FnHandler.first_char();
  FnHandler.negative_char();
  FnHandler.num_only();
  FnHandler.type_comma();
  FnHandler.dec_addZero();
  FnHandler.password_match();

  const create_admin = (username, password, adminId) => {
    const admin = FnHandler.adminStorage();

    let adminCheck = admin.findIndex((index) => index.adminId == adminId);

    // THIS MAKES THE CREATION OF ADMIN ACCOUNT ONLY ONCE
    if (admin[adminCheck]) {
      return;
    } else {
      const admin = new Admin(username, password, adminId);

      FnHandler.addAdmin(admin);
    }
  };

  create_admin("admin", "admin", "1");

  /**
   * FUNCTION FOR CREATING A NEW USER, CONNECTING THE CLASS "User"
   * INTO THE CLASS "FnHandler" TO PUSH EVERY NEW USER CREATED INTO THE LOCAL STORAGE
   */
  const create_user = (
    username,
    password,
    email,
    firstName,
    middleName,
    lastName,
    gender,
    accountNumber,
    accountType,
    balance
  ) => {
    const users = FnHandler.userStorage();

    let fNameCheck = users.findIndex((index) => index.firstName == firstName),
      lNameCheck = users.findIndex((index) => index.lastName == lastName);

    /**
     * THIS PREVENTS DUPLICATE USERS, EVERY FIRST NAME AND LAST NAME INPUTS ARE CHECKED
     * IF IT IS ALREADY EXISTING INSIDE THE LOCAL STORAGE
     */
    if (users[fNameCheck] && users[lNameCheck]) {
      alert("User already exists!");
    } else {
      const newUserAccount = new User(
        username,
        password,
        email,
        firstName,
        middleName,
        lastName,
        gender,
        accountNumber,
        accountType,
        balance
      );

      // FIRST LOG INSIDE THE TRANSACTION HISTORY INDICATING WHEN THE ACCOUNT WAS CREATED OR OPENED
      newUserAccount.transactionHistory.push(
        `<em>${FnHandler.time_stamp()}</em> : Opened a ${newUserAccount.accountType.toLowerCase()} account for <strong>${
          newUserAccount.firstName
        }</strong> ${newUserAccount.middleName} ${
          newUserAccount.lastName
        } with an initial account balance of <strong>₱${
          newUserAccount.balance
        }</strong>.`
      );

      newUserAccount.userTransactionHistory.push(
        `<em>${FnHandler.time_stamp()}</em> : You have opened a ${newUserAccount.accountType.toLowerCase()} account with an initial account balance of <strong>₱${
          newUserAccount.balance
        }</strong>.`
      );

      FnHandler.addUser(newUserAccount);
    }
  };

  // LOADS INITIAL DATA FOR IMMEDIATE TESTING PURPOSES OF WHOEVER VISITS THE SITE
  add_event(id("load-data-btn"), "click", () => {
    const users = FnHandler.userStorage();

    let juanCheck = users.findIndex((index) => index.firstName == "JUAN"),
      delaCruzCheck = users.findIndex((index) => index.lastName == "DELA CRUZ"),
      janeCheck = users.findIndex((index) => index.firstName == "JANE"),
      doeCheck = users.findIndex((index) => index.lastName == "DOE");

    // THIS PREVENTS MULTIPLE LOADING OF INITIAL DATA, AND JUST LOAD IT ONCE WHEN THE DATA STILL DON'T EXIST
    if (!users[juanCheck] && !users[delaCruzCheck]) {
      let loadPrompt = prompt(
          'Continuing will load initial data for immediate testing purposes?\nType "Y" to continue or "N" otherwise.',
          "Y"
        ),
        loadAnswer =
          loadPrompt != null ? loadPrompt.toLowerCase() : console.clear(),
        balance = 2500.05;

      if (loadAnswer == "n" || loadAnswer == null || loadAnswer == "") {
        return;
      } else {
        // USERNAME AND PASSWORD ARGUMENTS ARE SET TO BLANK (""), THEY WILL ONLY HAVE VALUES FROM SIGNUP FORM
        create_user(
          "juandelacruz",
          "juanjuan",
          "juandelacruz@mail.com",
          "JUAN",
          "",
          "DELA CRUZ",
          "male",
          "071096025466",
          "Savings",
          balance.toFixed(2)
        );
      }
    }

    if (!users[janeCheck] && !users[doeCheck]) {
      let balance = 5200;

      create_user(
        "",
        "",
        "",
        "JANE",
        "HILLS",
        "DOE",
        "female",
        "023451282250",
        "Checking",
        balance.toFixed(2)
      );
    }

    // THIS FUNCTION IS CALLED AGAIN TO REFRESH THE LIST IN THE UI
    FnHandler.list_users();
  });

  // PROMPT FOR CLEARING ALL DATA, TO PREVENT ACCIDENTAL DELETION
  add_event(id("clear-all-btn"), "click", () => {
    let users = FnHandler.userStorage();

    if (users.length != 0) {
      let clearPrompt = prompt(
          'Are you sure to delete all stored datas?\nType "Y" for yes and "N" for no.',
          "N"
        ),
        clearAnswer =
          clearPrompt != null ? clearPrompt.toLowerCase() : console.clear();

      if (clearAnswer == "y") {
        // DOES NOT INCLUDE FIRST ARRAY ITEM IN SPLICING OR DELETING WHICH IS THE ADMIN USERNAME AND PASSWORD
        localStorage.removeItem("users");
        FnHandler.list_users();
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
     * BECAUSE OF "FnHandler.type_comma()"
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
      inner(id("add-first-name").value.toUpperCase()),
      inner(id("add-middle-name").value.toUpperCase()),
      inner(id("add-last-name").value.toUpperCase()),
      gender,
      acc_num[rand(acc_num.length)] + (rand(9000000000) + 1000000000),
      account_type,
      parseFloat(account_type_bal + parseFloat(add_deposit)).toFixed(2)
    );

    FnHandler.list_users();

    alert(
      `${id(
        "add-first-name"
      ).value.toUpperCase()}'s account have been successfully created!`
    );

    id("add-form").reset();

    return false;
  });

  add_event(id("login-form"), "submit", (e) => {
    e.preventDefault();

    FnHandler.login_user(
      id("login-username").value,
      id("login-password").value
    );

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
      remove_class(id("friends-li"), "hide");
      remove_class(id("transactions-li"), "hide");
      remove_class(id("accounts-wrap"), "hide");
      remove_class(id("expense-wrap"), "hide");
      remove_class(id("add-newaccount-wrap"), "hide");
    }, 500);

    FnHandler.reset();
    return false;
  });

  add_event(id("open-signup-btn"), "click", () => {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
  });

  add_event(id("signup-form"), "submit", (e) => {
    e.preventDefault();

    if (id("signup-password").value != id("signup-confirm-password").value) {
      return;
    } else {
      let gender = id("signup-male").checked ? "male" : "female";

      FnHandler.signup_user(
        id("signup-first-name").value.toUpperCase(),
        id("signup-middle-name").value.toUpperCase(),
        id("signup-last-name").value.toUpperCase(),
        gender,
        id("signup-username").value,
        id("signup-password").value,
        id("signup-email").value,
        id("signup-account-num").value.split(" ").join("")
      );

      id("signup-form").reset();
    }

    remove_class(id("match-msg"), "fa-check");
    remove_class(id("match-msg"), "fa-times");
    return false;
  });

  add_event(id("back-signup-btn"), "click", () => {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
    remove_class(id("match-msg"), "fa-check");
    remove_class(id("match-msg"), "fa-times");
    FnHandler.reset();
  });

  add_event(id("owner-transaction-btn"), "click", () => {
    add_class(id("owner-transaction-modal"), "show");
  });

  add_event(id("close-owner-transaction-btn"), "click", () => {
    remove_class(id("owner-transaction-modal"), "show");
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
    FnHandler.withdraw(
      inner(id("withdraw-account").value.split(" ").join("")),
      withdraw_amount
    );

    FnHandler.list_users();
    id("withdraw-form").reset();
    return false;
  });

  add_event(id("deposit-form"), "submit", (e) => {
    e.preventDefault();

    let deposit_amount = `${id("deposit-amount").value.split(",").join("")}.${
      id("deposit-amount-dec").value
    }`;

    FnHandler.deposit(
      inner(id("deposit-account").value.split(" ").join("")),
      deposit_amount
    );

    FnHandler.list_users();
    id("deposit-form").reset();
    return false;
  });

  add_event(id("send-form"), "submit", (e) => {
    e.preventDefault();

    let send_amount = `${id("send-amount").value.split(",").join("")}.${
      id("send-amount-dec").value
    }`;

    FnHandler.send(
      inner(id("sender-account").value.split(" ").join("")),
      inner(id("receiver-account").value.split(" ").join("")),
      send_amount
    );

    FnHandler.list_users();
    id("send-form").reset();
    return false;
  });
});

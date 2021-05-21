doc_ready(() => {
  let i;

  class User {
    constructor(
      firstName,
      middleName,
      lastName,
      gender,
      accountNumber,
      accountType,
      balance
    ) {
      this.firstName = firstName;
      this.middleName = middleName;
      this.lastName = lastName;
      this.gender = gender;
      this.accountNumber = accountNumber;
      this.accountType = accountType;
      this.balance = balance;
      this.transactionHistory = [];
    }
  }

  class FnHandler {
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

    static withdraw(user, amount) {
      const users = FnHandler.userStorage();

      let userCheck = users.findIndex(
        (userIndex) => userIndex.accountNumber == user
      );

      if (users[userCheck] == null || users[userCheck] == "") {
        alert("User not found!");
      } else if (parseFloat(users[userCheck].balance) < parseFloat(amount)) {
        alert("Balance cannot be negative!");
      } else if (parseFloat(amount) == 0) {
        alert("Enter an amount!");
      } else {
        let gender = users[userCheck].gender == "male" ? "His" : "Her";

        users[userCheck].balance = parseFloat(
          parseFloat(users[userCheck].balance) - parseFloat(amount)
        ).toFixed(2);

        users[userCheck].transactionHistory.push(
          `${
            users[userCheck].firstName
          } withdrew an amount of ₱${amount} from ${
            gender.charAt(0).toLowerCase() + gender.substring(1)
          } account. ${gender} remaining balance is now ₱${
            users[userCheck].balance
          }.`
        );
      }

      localStorage.setItem("users", JSON.stringify(users));
    }

    static deposit(user, amount) {
      const users = FnHandler.userStorage();

      let userCheck = users.findIndex(
        (userIndex) => userIndex.accountNumber == user
      );

      if (users[userCheck] == null || users[userCheck] == "") {
        alert("User not found!");
      } else if (parseFloat(amount) == 0) {
        alert("Enter an amount!");
      } else {
        let gender = users[userCheck].gender == "male" ? "His" : "Her";

        users[userCheck].balance = parseFloat(
          parseFloat(users[userCheck].balance) + parseFloat(amount)
        ).toFixed(2);

        users[userCheck].transactionHistory.push(
          `${
            users[userCheck].firstName
          } deposited an amount of ₱${amount} into ${
            gender.charAt(0).toLowerCase() + gender.substring(1)
          } account. ${gender} remaining balance is now ₱${
            users[userCheck].balance
          }.`
        );
      }

      localStorage.setItem("users", JSON.stringify(users));
    }

    static send(from_user, to_user, amount) {
      const users = FnHandler.userStorage();

      let senderCheck = users.findIndex(
          (userIndex) => userIndex.accountNumber == from_user
        ),
        receiverCheck = users.findIndex(
          (userIndex) => userIndex.accountNumber == to_user
        );

      if (
        users[senderCheck] == null ||
        users[senderCheck] == "" ||
        users[receiverCheck] == null ||
        users[receiverCheck] == ""
      ) {
        alert("Users not found!");
      } else if (parseFloat(users[senderCheck].balance) < parseFloat(amount)) {
        alert("Balance cannot be negative!");
      } else if (parseFloat(amount) == 0) {
        alert("Enter an amount!");
      } else {
        let senderGender = users[senderCheck].gender == "male" ? "His" : "Her",
          receiverGender =
            users[receiverCheck].gender == "male" ? "His" : "Her";

        users[senderCheck].balance = parseFloat(
          parseFloat(users[senderCheck].balance) - parseFloat(amount)
        ).toFixed(2);

        users[senderCheck].transactionHistory.push(
          `${users[senderCheck].firstName} sent an amount of ₱${amount} into ${users[receiverCheck].firstName}'s account. ${senderGender} remaining balance is now ₱${users[senderCheck].balance}.`
        );

        users[receiverCheck].balance = parseFloat(
          parseFloat(users[receiverCheck].balance) + parseFloat(amount)
        ).toFixed(2);

        users[receiverCheck].transactionHistory.push(
          `${users[receiverCheck].firstName} received an amount of ₱${amount} from ${users[senderCheck].firstName}'s account. ${receiverGender} remaining balance is now ₱${users[receiverCheck].balance}.`
        );
      }

      localStorage.setItem("users", JSON.stringify(users));
    }

    static get_balance(user) {
      const users = FnHandler.userStorage();

      let userCheck = users.findIndex(
          (userIndex) => userIndex.accountNumber == user
        ),
        balanceLi = create_el("li");

      if (users[userCheck]) {
        balanceLi.innerHTML = `₱${num_commas(users[userCheck].balance)}`;
        id("balance-ul").appendChild(balanceLi);
      }
    }

    static list_users() {
      const users = FnHandler.userStorage();

      id("acc-num-ul").innerHTML = "";
      id("acc-ul").innerHTML = "";
      id("acc-type-ul").innerHTML = "";
      id("balance-ul").innerHTML = "";
      id("delete-ul").innerHTML = "";

      for (i = 0; i < users.length; i++) {
        let j,
          accNumLi = create_el("li"),
          accLi = create_el("li"),
          accTypeLi = create_el("li"),
          deleteLi = create_el("li"),
          historyUl = create_el("ul");

        accNumLi.innerHTML = num_space(users[i].accountNumber);

        id("acc-num-ul").appendChild(accNumLi);

        add_event(accNumLi, "click", () => {
          document.execCommand("copy");
        });

        add_event(accNumLi, "copy", (e) => {
          e.preventDefault();

          if (e.clipboardData) {
            e.clipboardData.setData("text/plain", accNumLi.textContent);
          }
        });

        accLi.innerHTML = `${users[i].firstName} ${users[i].middleName} ${users[i].lastName}`;

        id("acc-ul").appendChild(accLi);
        accLi.appendChild(historyUl);
        add_class(historyUl, "xbul");
        historyUl.id = `h${users.indexOf(users[i])}`;

        for (j = 0; j < users[i].transactionHistory.length; j++) {
          let historyLi = create_el("li");

          historyLi.innerHTML = users[i].transactionHistory[j];
          historyUl.appendChild(historyLi);
        }

        accTypeLi.innerHTML = users[i].accountType;
        id("acc-type-ul").appendChild(accTypeLi);

        deleteLi.innerHTML = `<i id="${users.indexOf(
          users[i]
        )}" class="fas fa-minus-circle"></i>`;

        id("delete-ul").appendChild(deleteLi);

        add_event(deleteLi.querySelector("i"), "click", function () {
          let getLocalStorage = JSON.parse(localStorage.getItem("users"));

          getLocalStorage.splice(this.id, 1);
          localStorage.setItem("users", JSON.stringify(getLocalStorage));
          FnHandler.list_users();
        });

        FnHandler.get_balance(users[i].accountNumber);
      }
    }

    static firstChar() {
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
  }

  FnHandler.list_users();
  FnHandler.firstChar();

  const create_user = (
    firstName,
    middleName,
    lastName,
    gender,
    accountNumber,
    accountType,
    balance
  ) => {
    const users = FnHandler.userStorage();

    let fNameCheck = users.findIndex(
        (userIndex) => userIndex.firstName == firstName
      ),
      lNameCheck = users.findIndex(
        (userIndex) => userIndex.lastName == lastName
      );

    if (users[fNameCheck] && users[lNameCheck]) {
      alert("User already exists!");
    } else {
      const newUserAccount = new User(
        firstName,
        middleName,
        lastName,
        gender,
        accountNumber,
        accountType,
        balance
      );

      FnHandler.addUser(newUserAccount);
    }
  };

  add_event(id("login-form"), "submit", (e) => {
    e.preventDefault();

    if (
      id("login-username").value == "admin" &&
      id("login-password").value == "admin"
    ) {
      toggle_class(id("modal"), "hide");
    }

    return false;
  });

  add_event(id("open-signup-btn"), "click", () => {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
  });

  add_event(id("signup-form"), "submit", (e) => {
    e.preventDefault();
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
    return false;
  });

  add_event(id("back-signup-btn"), "click", () => {
    toggle_class(id("login-wrap"), "hide");
    toggle_class(id("signup-wrap"), "show");
  });

  add_event(id("load-data-btn"), "click", (e) => {
    e.preventDefault();

    const users = FnHandler.userStorage();

    let juanCheck = users.findIndex(
        (userIndex) => userIndex.firstName == "JUAN"
      ),
      delaCruzCheck = users.findIndex(
        (userIndex) => userIndex.lastName == "DELA CRUZ"
      ),
      janeCheck = users.findIndex((userIndex) => userIndex.firstName == "JANE"),
      doeCheck = users.findIndex((userIndex) => userIndex.lastName == "DOE");

    if (!users[juanCheck] && !users[delaCruzCheck]) {
      let balance = 2500;

      create_user(
        "JUAN",
        "HERMOSA",
        "DELA CRUZ",
        "male",
        "07" + (rand(9000000000) + 1000000000),
        "Savings",
        balance.toFixed(2)
      );
    }

    if (!users[janeCheck] && !users[doeCheck]) {
      let balance = 5200;

      create_user(
        "JANE",
        "HILLS",
        "DOE",
        "female",
        "02" + (rand(9000000000) + 1000000000),
        "Checking",
        balance.toFixed(2)
      );
    }

    FnHandler.list_users();
    return false;
  });

  add_event(id("log-out-btn"), "click", (e) => {
    e.preventDefault();
    toggle_class(id("modal"), "hide");
    return false;
  });

  add_event(id("clear-all-btn"), "click", () => {
    let clearPrompt = prompt(
        'Are you sure to delete all stored datas?\nType "Y" for yes and "N" for no.',
        "N"
      ),
      clearAnswer = clearPrompt.toLowerCase();

    if (clearAnswer == "y") {
      window.localStorage.clear();
      FnHandler.list_users();
    } else {
      return;
    }
  });

  add_event(id("add-form"), "submit", (e) => {
    e.preventDefault();

    let gender = id("male").checked ? "male" : "female",
      acc_num = id("savings").checked
        ? ["05", "06", "07", "08", "09"]
        : ["01", "02", "03", "04"],
      account_type = id("savings").checked ? "Savings" : "Checking",
      account_type_bal = id("savings").checked ? 2000 : 5000,
      add_deposit_dec =
        parseFloat(id("add-deposit-dec").value) < 10
          ? `0${parseFloat(id("add-deposit-dec").value)}`
          : id("add-deposit-dec").value,
      add_deposit = `${id("add-deposit").value}.${add_deposit_dec}`;

    if (
      id("add-first-name").value.length != 0 &&
      id("add-last-name").value.length != 0
    ) {
      create_user(
        inner(id("add-first-name").value.toUpperCase()),
        inner(id("add-middle-name").value.toUpperCase()),
        inner(id("add-last-name").value.toUpperCase()),
        gender,
        acc_num[rand(acc_num.length)] + (rand(9000000000) + 1000000000),
        account_type,
        parseFloat(account_type_bal + parseFloat(add_deposit)).toFixed(2)
      );

      FnHandler.list_users();
      id("add-first-name").value = "";
      id("add-middle-name").value = "";
      id("add-last-name").value = "";
      id("male").checked = true;
      id("savings").checked = true;
      id("add-deposit").value = "0";
      id("add-deposit-dec").value = "00";
    } else {
      alert("Please complete the necessary details");
    }

    return false;
  });

  add_event(id("withdraw-form"), "submit", (e) => {
    e.preventDefault();

    let withdraw_amount_dec =
        parseFloat(id("withdraw-amount-dec").value) < 10
          ? `0${parseFloat(id("withdraw-amount-dec").value)}`
          : id("withdraw-amount-dec").value,
      withdraw_amount = `${id("withdraw-amount").value}.${withdraw_amount_dec}`;

    FnHandler.withdraw(
      inner(id("withdraw-account").value.split(" ").join("")),
      withdraw_amount
    );

    FnHandler.list_users();

    id("withdraw-account").value = "";
    id("withdraw-amount").value = "0";
    id("withdraw-amount-dec").value = "00";
    return false;
  });

  add_event(id("deposit-form"), "submit", (e) => {
    e.preventDefault();

    let deposit_amount_dec =
        parseFloat(id("deposit-amount-dec").value) < 10
          ? `0${parseFloat(id("deposit-amount-dec").value)}`
          : id("deposit-amount-dec").value,
      deposit_amount = `${id("deposit-amount").value}.${deposit_amount_dec}`;

    FnHandler.deposit(
      inner(id("deposit-account").value.split(" ").join("")),
      deposit_amount
    );

    FnHandler.list_users();
    id("deposit-account").value = "";
    id("deposit-amount").value = "0";
    id("deposit-amount-dec").value = "00";
    return false;
  });

  add_event(id("send-form"), "submit", (e) => {
    e.preventDefault();

    let send_amount_dec =
        parseFloat(id("send-amount-dec").value) < 10
          ? `0${parseFloat(id("send-amount-dec").value)}`
          : id("send-amount-dec").value,
      send_amount = `${id("send-amount").value}.${send_amount_dec}`;

    FnHandler.send(
      inner(id("sender-account").value.split(" ").join("")),
      inner(id("receiver-account").value.split(" ").join("")),
      send_amount
    );

    FnHandler.list_users();
    id("sender-account").value = "";
    id("receiver-account").value = "";
    id("send-amount").value = "0";
    id("send-amount-dec").value = "00";
    return false;
  });
});

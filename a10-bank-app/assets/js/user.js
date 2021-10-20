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

  // STATIC - TO BE ABLE USE THE FUNCTION WITHOUT AN OBJECT OF THE CLASS
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
}

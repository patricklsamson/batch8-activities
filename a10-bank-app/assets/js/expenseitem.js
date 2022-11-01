class ExpenseItem {
  constructor(name, cost, owner) {
    this.name = name;
    this.cost = cost;
    this.owner = owner;
  }

  static add(name, cost, owner) {
    const users = User.userStorage();

    let ownerCheck = users.findIndex((index) => index.accountNumber == owner),
      nameCheck = users[ownerCheck].expenseItems.findIndex(
        (index) => index.name == name
      );

    if (users[ownerCheck].expenseItems[nameCheck]) {
      alert("Expense item already exists!");
    } else {
      const newExpenseItem = new ExpenseItem(name, cost, owner);

      users[ownerCheck].budget = parseFloat(
        parseFloat(users[ownerCheck].budget) - parseFloat(cost)
      ).toFixed(2);

      users[ownerCheck].expenseItems.push(newExpenseItem);
      localStorage.setItem("users", JSON.stringify(users));
      id("add-expense-form").reset();
    }
  }

  static list(owner) {
    const users = User.userStorage();

    let ownerCheck = users.findIndex((index) => index.accountNumber == owner);

    if (users[ownerCheck] != null) {
      id("expense-table").innerHTML = "";

      for (i = 0; i < users[ownerCheck].expenseItems.length; i++) {
        let tableRow = create_el("tr"),
          nameTd = create_el("td"),
          costTd = create_el("td"),
          editTd = create_el("td"),
          deleteTd = create_el("td");

        nameTd.innerHTML = users[ownerCheck].expenseItems[i].name;
        tableRow.appendChild(nameTd);

        costTd.innerHTML = `₱${num_commas(
          users[ownerCheck].expenseItems[i].cost
        )}`;

        tableRow.appendChild(costTd);
        editTd.innerHTML = `<i id="${i}" class="fas fa-edit"></i>`;

        add_event(editTd.querySelector("i"), "click", function () {
          const users = User.userStorage();

          let ownerCheck = users.findIndex(
            (index) => index.accountNumber == owner
          );

          id("add-expense-name").value =
            users[ownerCheck].expenseItems[this.id].name;

          id("add-expense-amount").value = num_commas(
            users[ownerCheck].expenseItems[this.id].cost.split(".")[0]
          );

          id("add-expense-amount-dec").value =
            users[ownerCheck].expenseItems[this.id].cost.split(".")[1];

          users[ownerCheck].budget = parseFloat(
            parseFloat(users[ownerCheck].budget) +
              parseFloat(users[ownerCheck].expenseItems[this.id].cost)
          ).toFixed(2);

          users[ownerCheck].expenseItems.splice(this.id, 1);
          localStorage.setItem("users", JSON.stringify(users));
          User.list(id("owner-acc-num").innerHTML.split(" ").join(""));

          User.individual_history(
            id("owner-acc-num").innerHTML.split(" ").join("")
          );

          User.list_users();
          User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));

          User.total_expenses(
            id("owner-acc-num").innerHTML.split(" ").join("")
          );
        });

        tableRow.appendChild(editTd);
        deleteTd.innerHTML = `<i id="${i}" class="fas fa-minus-circle"></i>`;

        add_event(deleteTd.querySelector("i"), "click", function () {
          const users = User.userStorage();

          let ownerCheck = users.findIndex(
              (index) => index.accountNumber == owner
            ),
            deletePrompt = prompt(
              'Are you sure to delete this item?\n Type "Y" for yes and "N" for no.',
              "N"
            ),
            deleteAnswer =
              deletePrompt != null
                ? trimStr(deletePrompt.toLowerCase())
                : console_log();

          if (deleteAnswer == "y") {
            users[ownerCheck].budget = parseFloat(
              parseFloat(users[ownerCheck].budget) +
                parseFloat(users[ownerCheck].expenseItems[this.id].cost)
            ).toFixed(2);

            users[ownerCheck].expenseItems.splice(this.id, 1);
            localStorage.setItem("users", JSON.stringify(users));
            ExpenseItem.list(id("owner-acc-num").innerHTML.split(" ").join(""));

            User.individual_history(
              id("owner-acc-num").innerHTML.split(" ").join("")
            );

            User.list_users();

            User.get_budget(id("owner-acc-num").innerHTML.split(" ").join(""));
            User.total_expenses(
              id("owner-acc-num").innerHTML.split(" ").join("")
            );
          } else {
            return;
          }
        });

        tableRow.appendChild(deleteTd);
        id("expense-table").appendChild(tableRow);
      }
    }
  }
}

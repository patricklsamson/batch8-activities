class Connection {
  constructor(name, accountNumber) {
    this.name = name;
    this.accountNumber = accountNumber;
  }

  static add_connections(user, name, connectionAccountNumber) {
    const users = User.userStorage();

    let ownerCheck = users.findIndex((index) => index.accountNumber == user),
      accountNumberCheck = users.findIndex(
        (index) => index.accountNumber == connectionAccountNumber
      );

    for (i = 0; i < users[ownerCheck].connections.length; i++) {
      if (users[ownerCheck].connections[i].accountNumber == connectionAccountNumber) {
        alert("Connection already exists!");
        return;
      }
    }

    if (users[accountNumberCheck] == null || users[accountNumberCheck] == "") {
      alert("User not found");
    } else if (user == connectionAccountNumber) {
      alert("Cannot add own account number!");
    } else {
      const newConnection = new Connection(name, connectionAccountNumber);

      users[ownerCheck].connections.push(newConnection);
      remove_class(id("connections-form"), "show");
      id("connections-form").reset();
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  static list_connections(user) {
    const users = User.userStorage();

    let ownerCheck = users.findIndex((index) => index.accountNumber == user);

    if (users[ownerCheck] != null) {
      id("connections-table").innerHTML = "";

      for (i = 0; i < users[ownerCheck].connections.length; i++) {
        let tableRow = create_el("tr"),
          nameTd = create_el("td"),
          accNumTd = create_el("td"),
          editTd = create_el("td"),
          deleteTd = create_el("td");

        nameTd.innerHTML = users[ownerCheck].connections[i].name;
        tableRow.appendChild(nameTd);

        accNumTd.innerHTML = num_space(
          users[ownerCheck].connections[i].accountNumber
        );

        Helper.click_copy(accNumTd);
        tableRow.appendChild(accNumTd);

        editTd.innerHTML = `<i id="${i}" class="fas fa-edit"></i>`;

        add_event(editTd.querySelector("i"), "click", function () {
          if (!has_class(id("connections-form"), "show")) {
            add_class(id("connections-form"), "show");
          }

          id("connections-name").value =
            users[ownerCheck].connections[this.id].name;

          id("connections-account-num").value =
            users[ownerCheck].connections[this.id].accountNumber;

          users[ownerCheck].connections.splice(this.id, 1);
          localStorage.setItem("users", JSON.stringify(users));

          return Connection.list_connections(
            id("owner-acc-num").innerHTML.split(" ").join("")
          );
        });

        tableRow.appendChild(editTd);

        deleteTd.innerHTML = `<i id="${i}" class="fas fa-minus-circle"></i>`;

        add_event(deleteTd.querySelector("i"), "click", function () {
          let deletePrompt = prompt(
              'Are you sure to delete this connection?\nType "Y" for yes and "N" for no.',
              "N"
            ),
            deleteAnswer =
              deletePrompt != null
                ? trimStr(deletePrompt.toLowerCase())
                : console_log();

          if (deleteAnswer == "y") {
            users[ownerCheck].connections.splice(this.id, 1);
            localStorage.setItem("users", JSON.stringify(users));

            return Connection.list_connections(
              id("owner-acc-num").innerHTML.split(" ").join("")
            );
          } else {
            return;
          }
        });

        tableRow.appendChild(deleteTd);
        id("connections-table").appendChild(tableRow);
      }
    }
  }
}

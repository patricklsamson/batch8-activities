class Bank {
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
}

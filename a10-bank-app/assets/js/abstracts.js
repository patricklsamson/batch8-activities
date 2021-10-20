const console_log = () => {
  console.clear();
  localStorage_space();
};

let i, j;

const create_admin = (username, password, adminId) => {
  const admin = Admin.adminStorage();

  let adminCheck = admin.findIndex((index) => index.adminId == adminId);

  // THIS MAKES THE CREATION OF ADMIN ACCOUNT ONLY ONCE
  if (admin[adminCheck]) {
    return;
  } else {
    const admin = new Admin(username, password, adminId);

    Admin.addAdmin(admin);
  }
};

/**
 * FUNCTION FOR CREATING A NEW USER, CONNECTING THE CLASS "User"
 * INTO THE CLASS "FnHandler" TO PUSH EVERY NEW USER CREATED INTO THE LOCAL STORAGE
 */
const create_user = (
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
) => {
  const users = User.userStorage();

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
      signedUp,
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
      `<em>${Helper.time_stamp()}</em> : Opened a ${newUserAccount.accountType.toLowerCase()} account for <strong>${
        newUserAccount.firstName
      }</strong> ${newUserAccount.middleName} ${
        newUserAccount.lastName
      } with an initial account balance of <strong>₱${num_commas(
        newUserAccount.balance
      )}</strong>.`
    );

    newUserAccount.userTransactionHistory.push(
      `<em>${Helper.time_stamp()}</em> : You have opened a ${newUserAccount.accountType.toLowerCase()} account with an initial account balance of <strong>₱${num_commas(
        newUserAccount.balance
      )}</strong>.`
    );

    User.addUser(newUserAccount);
  }
};

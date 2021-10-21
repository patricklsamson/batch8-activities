// SEPARATED ADMIN FOR BETTER DISTINCTION FROM REGULAR USERS ESPECIALLY FOR LOCAL STORAGE
class Admin {
  constructor(username, password, adminId) {
    this.username = username;
    this.password = password;
    this.adminId = adminId;
  }

  // STATIC - TO BE ABLE USE THE FUNCTION WITHOUT AN OBJECT OF THE CLASS
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
}

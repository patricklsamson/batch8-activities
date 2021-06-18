"use strict";

doc_ready(function () {
  create_admin("admin", "admin", "1");
  Admin.password_match(id("admin-new-password"), id("admin-confirm-new-password"), id("admin-change-match-msg"));
  add_event(id("login-form"), "submit", function (e) {
    e.preventDefault();
    Admin.login_admin(inner(trim(id("login-username").value)), inner(trim(id("login-password").value)));
    return false;
  });
  add_event(id("navtgl-btn"), "click", function () {
    toggle_class(this, "active");
  });
  add_event(id("log-out-btn"), "click", function (e) {
    e.preventDefault();
    remove_class(id("login-form"), "hide");
    remove_class(id("header-admin"), "show");
    remove_class(id("table-wrap"), "show");
    remove_class(id("navtgl-btn"), "active");
    return false;
  });
  add_event(id("settings-btn"), "click", function () {
    add_class(id("settings-modal"), "show");
  });
  add_event(id("close-settings-btn"), "click", function () {
    remove_class(id("settings-modal"), "show");
    remove_class(id("admin-change-match-msg"), "fa-check");
    remove_class(id("admin-change-match-msg"), "fa-times");
    id("admin-settings-form").reset();
  });
  add_event(id("admin-settings-form"), "submit", function (e) {
    e.preventDefault();
    var admin = Admin.adminStorage();

    if (admin[0].password != inner(id("admin-old-password").value)) {
      alert("Old password wrong!");
    } else if (inner(id("admin-old-password").value) == inner(id("admin-confirm-new-password").value)) {
      alert("There have been no changes made for the password!");
    } else if (inner(id("admin-new-password").value) != inner(id("admin-confirm-new-password").value)) {
      alert("New password entries do not match!");
    } else if (inner(id("admin-confirm-new-password").value).length < 5) {
      var passwordPrompt = prompt('Are you sure to have a weak password?\nType "Y" for yes and "N" for no.', "N"),
          passwordAnswer = passwordPrompt != null ? passwordPrompt.toLowerCase() : console.clear();

      if (passwordAnswer == "y") {
        admin[0].password = inner(id("admin-confirm-new-password").value);
        id("admin-settings-form").reset();
        remove_class(id("admin-change-match-msg"), "fa-check");
        remove_class(id("admin-change-match-msg"), "fa-times");
        alert("Change password successful!");
        localStorage.setItem("p-admin", JSON.stringify(admin));
      } else {
        return;
      }
    } else {
      admin[0].password = inner(id("admin-confirm-new-password").value);
      id("admin-settings-form").reset();
      remove_class(id("admin-change-match-msg"), "fa-check");
      remove_class(id("admin-change-match-msg"), "fa-times");
      alert("Change password successful!");
      localStorage.setItem("p-admin", JSON.stringify(admin));
    }

    return false;
  });
});
"use strict";

doc_ready(function () {
  create_admin("admin", "admin", "1");
  add_event(id("login-form"), "submit", function (e) {
    e.preventDefault();
    Admin.login_admin(inner(trim(id("login-username").value)), inner(trim(id("login-password").value)));
    return false;
  });
  add_event(id("navtgl-btn"), "click", function () {
    toggle_class(this, "active");
  });
});
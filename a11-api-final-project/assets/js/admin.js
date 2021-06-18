doc_ready(() => {
  create_admin("admin", "admin", "1");

  add_event(id("login-form"), "submit", (e) => {
    e.preventDefault();

    Admin.login_admin(
      inner(trim(id("login-username").value)),
      inner(trim(id("login-password").value))
    );

    return false;
  });

  add_event(id("navtgl-btn"), "click", function () {
    toggle_class(this, "active");
  });
});

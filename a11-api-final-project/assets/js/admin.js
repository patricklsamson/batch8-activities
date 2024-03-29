doc_ready(() => {
  create_admin("admin", "admin", "1");

  create_sample_location(
    "Jane Doe",
    "0912-123-1234",
    "Sample Message",
    Location.time_stamp()
  );

  Location.list_location();

  Admin.password_match(
    id("admin-new-password"),
    id("admin-confirm-new-password"),
    id("admin-change-match-msg")
  );

  add_event(id("login-form"), "submit", (e) => {
    e.preventDefault();

    Admin.login_admin(
      inner(trimStr(id("login-username").value)),
      inner(trimStr(id("login-password").value))
    );

    return false;
  });

  add_event(id("nav-btn"), "click", function () {
    toggle_class(this, "active");
  });

  add_event(window, "click", (e) => {
    if (e.target.id != "nav-btn" || e.srcElement.id != "nav-btn") {
      remove_class(id("nav-btn"), "active");
    }
  });

  id("side-coll")
    .querySelectorAll("[id*='-btn']")
    .forEach((btn) => {
      add_event(btn, "click", () => {
        remove_class(id("nav-btn"), "active");
      });
    });

  add_event(id("home-btn"), "click", (e) => {
    e.preventDefault();
    remove_class(id("add-whitelist"), "hide");
    remove_class(id("sos-table"), "hide");
    add_class(id("remove-whitelist"), "hide");
    add_class(id("whitelist-table"), "hide");
    return false;
  });

  add_event(id("whitelist-btn"), "click", (e) => {
    e.preventDefault();
    add_class(id("add-whitelist"), "hide");
    add_class(id("sos-table"), "hide");
    remove_class(id("remove-whitelist"), "hide");
    remove_class(id("whitelist-table"), "hide");
    return false;
  });

  add_event(id("log-out-btn"), "click", (e) => {
    e.preventDefault();
    remove_class(id("login-form"), "hide");
    remove_class(id("header-admin"), "show");
    remove_class(id("table-wrap"), "show");
    remove_class(id("navtgl-btn"), "active");
    remove_class(id("add-whitelist"), "hide");
    remove_class(id("sos-table"), "hide");
    add_class(id("remove-whitelist"), "hide");
    add_class(id("whitelist-table"), "hide");
    return false;
  });

  add_event(id("settings-btn"), "click", () => {
    add_class(id("settings-modal"), "show");
  });

  add_event(id("close-settings-btn"), "click", () => {
    remove_class(id("settings-modal"), "show");
    remove_class(id("admin-change-match-msg"), "fa-check");
    remove_class(id("admin-change-match-msg"), "fa-times");
    id("admin-settings-form").reset();
  });

  add_event(id("admin-settings-form"), "submit", (e) => {
    e.preventDefault();

    const admin = Admin.adminStorage();

    if (admin[0].password != inner(id("admin-old-password").value)) {
      alert("Old password wrong!");
    } else if (
      inner(id("admin-old-password").value) ==
      inner(id("admin-confirm-new-password").value)
    ) {
      alert("There have been no changes made for the password!");
    } else if (
      inner(id("admin-new-password").value) !=
      inner(id("admin-confirm-new-password").value)
    ) {
      alert("New password entries do not match!");
    } else if (inner(id("admin-confirm-new-password").value).length < 5) {
      let passwordPrompt = prompt(
          'Are you sure to have a weak password?\nType "Y" for yes and "N" for no.',
          "N"
        ),
        passwordAnswer =
          passwordPrompt != null
            ? passwordPrompt.toLowerCase()
            : console.clear();

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

  add_event(id("sync-btn"), "click", () => {
    create_sample_location(
      "Jane Doe",
      "0912-123-1234",
      "Sample Message",
      Location.time_stamp()
    );

    Location.list_location();
  });

  add_event(id("close-location-btn"), "click", () => {
    remove_class(id("location-modal"), "show");
  });
});

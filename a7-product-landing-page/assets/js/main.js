docReady(function () {
  matchHeights(".mh");
  matchHeights(".mh2");
  matchHeights(".mh3");

  if (body("body-login")) {
    addEvent(document.body, "click", function (e) {
      if (!$$("header").contains(e.target)) {
        $$("user").checked = false;
      }
    });
  }

  addEvent(document.body, "click", function (e) {
    if (!$$("nav-bar").contains(e.target)) {
      $$("nav-toggle").checked = false;
    }
  });

  addEvent(document.body, "click", function (e) {
    if (!$$("footer").contains(e.target)) {
      $$("about").checked = false;
      $$("triton").checked = false;
    }
  });

  window.onscroll = function () {
    if (body("body-login")) {
      if (document.body.scrollTop >= 0 || document.documentElement.scrollTop >= 0) {
        $$("user").checked = false;
      }
    }

    if (document.body.scrollTop >= 0 || document.documentElement.scrollTop >= 0) {
      $$("nav-toggle").checked = false;
    }
  };

  if (body("index")) {
    addEvent($$("signup-btn"), "click", function () {
      tClass(document.body, "modal-open");
      rClass(document.body, "animate");
      $$("name").value = "";
      $$("email").value = "";
      $$("password").value = "";
      $$("confirm-pw").value = "";
      $$("confirm-msg").innerHTML = "";
    });

    addEvent($$("login-btn"), "click", function () {
      tClass(document.body, "modal-open");
      rClass(document.body, "animate");
      $$("log-email").value = "";
      $$("log-password").value = "";
    });

    addEvent($$("password"), "keyup", function () {
      if ($$("confirm-pw").value == $$("password").value) {
        $$("submit").disabled = false;
      } else {
        $$("submit").disable = true;
      }
    });

    addEvent($$("confirm-pw"), "keyup", function () {
      if ($$("confirm-pw").value == $$("password").value) {
        $$("submit").disabled = false;
        $$("confirm-msg").style.color = "green";
        $$("confirm-msg").innerHTML = " MATCH";
      } else {
        $$("submit").disable = true;
        $$("confirm-msg").style.color = "red";
        $$("confirm-msg").innerHTML = " NOT MATCH";
      }
    });
  }

  for (var i = 0; i < $a(".nav-link").length; i++) {
    addEvent($a(".nav-link")[i], "click", function () {
      $$("nav-toggle").checked = false;
    });
  }

  var carousel = new caro({
    autoplay: {
      on: true,
      interval: 5000,
    },
  });

  addEvent($$("about-btn"), "click", function () {
    $$("triton").checked = false;
  });

  addEvent($$("triton-btn"), "click", function () {
    $$("about").checked = false;
  });
});

"use strict";

docReady(function () {
  matchHeights(".mh");
  matchHeights(".mh2");
  matchHeights(".mh3");

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

  if (body("body-login")) {
    addEvent(document.body, "click", function (e) {
      if (!$$("header").contains(e.target || e.srcElement)) {
        $$("user").checked = false;
      }
    });
  }

  addEvent(window, "scroll", function () {
    if (body("body-login")) {
      if (document.body.scrollTop >= 0 || document.documentElement.scrollTop >= 0) {
        $$("user").checked = false;
      }
    }

    if (document.body.scrollTop >= 0 || document.documentElement.scrollTop >= 0) {
      $$("nav-toggle").checked = false;
    }
  });
  addEvent(document.body, "click", function (e) {
    if (!$$("nav-bar").contains(e.target || e.srcElement)) {
      $$("nav-toggle").checked = false;
    }

    if (!$$("footer").contains(e.target || e.srcElement)) {
      $$("about").checked = false;
      $$("service").checked = false;
      $$("triton").checked = false;
      $$("helios").checked = false;
    }
  });

  for (var i = 0; i < $a(".nav-link").length; i++) {
    addEvent($a(".nav-link")[i], "click", function () {
      $$("nav-toggle").checked = false;
    });
  }

  var carousel = new caro({
    autoplay: {
      on: true,
      interval: 5000
    }
  });
  addEvent($$("about-btn"), "click", function () {
    $$("service").checked = false;
    $$("triton").checked = false;
    $$("helios").checked = false;
  });
  addEvent($$("service-btn"), "click", function () {
    $$("about").checked = false;
    $$("triton").checked = false;
    $$("helios").checked = false;
  });
  addEvent($$("triton-btn"), "click", function () {
    $$("about").checked = false;
    $$("service").checked = false;
    $$("helios").checked = false;
  });
  addEvent($$("helios-btn"), "click", function () {
    $$("about").checked = false;
    $$("service").checked = false;
    $$("triton").checked = false;
  });
});
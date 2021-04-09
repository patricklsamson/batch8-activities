"use strict";

docReady(function () {
  matchHeights(".mh");
  matchHeights(".mh2");
  matchHeights(".mh3");

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
});
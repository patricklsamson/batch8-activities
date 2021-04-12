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
      $$("submit").disabled = true;
    });

    addEvent($$("login-btn"), "click", function () {
      tClass(document.body, "modal-open");
      rClass(document.body, "animate");
      $$("log-email").value = "";
      $$("log-password").value = "";
    });

    addEvent($$("password"), "keyup", function () {
      if ($$("password").value == $$("confirm-pw").value && this.value.length != 0) {
        $$("submit").disabled = false;
        $$("confirm-msg").style.color = "green";
        $$("confirm-msg").innerHTML = " MATCH";
      } else if ($$("password").value != $$("confirm-pw").value) {
        $$("submit").disabled = true;
      } else if (this.value.length == 0) {
        $$("confirm-msg").innerHTML = " ";
      }
    });

    addEvent($$("confirm-pw"), "keyup", function () {
      if ($$("confirm-pw").value == $$("password").value && this.value.length != 0) {
        $$("submit").disabled = false;
        $$("confirm-msg").style.color = "green";
        $$("confirm-msg").innerHTML = " MATCH";
      } else if ($$("confirm-pw").value != $$("password").value) {
        $$("submit").disabled = true;
        $$("confirm-msg").style.color = "red";
        $$("confirm-msg").innerHTML = " NOT MATCH";
      } else if (this.value.length == 0) {
        $$("confirm-msg").innerHTML = " ";
      }
    });
  }

  if (body("body-login")) {
    addEvent(document.body, "click", function (e) {
      if (!e.target.closest("#header") || !$$("header").contains(e.target || e.srcElement)) {
        $$("user").checked = false;
      }
    });
  }

  addEvent(window, "scroll", function () {
    if (body("body-login")) {
      if (window.pageYOffset >= 0 || document.documentElement.scrollTop >= 0) {
        $$("user").checked = false;
      }
    }

    if (window.pageYOffset >= 0 || document.documentElement.scrollTop >= 0) {
      $$("nav-toggle").checked = false;
    }

    if (document.body.scrollTop >= $$("header").offsetTop || document.documentElement.scrollTop >= $$("header").offsetTop) {
      $s(".menu-container").style.marginTop = "0";
    }
  });

  addEvent($$("nav-toggle"), "click", function () {
    if (window.pageYOffset <= $$("header").offsetTop || document.documentElement.scrollTop <= $$("header").offsetTop) {
      $s(".menu-container").style.marginTop = "-" + $$("header").offsetHeight + "px";
    }
  });

  addEvent(document.body, "click", function (e) {
    if (!e.target.closest("#nav-bar") || !$$("nav-bar").contains(e.target || e.srcElement)) {
      $$("nav-toggle").checked = false;
    }

    if (!e.target.closest("#footer") || !$$("footer").contains(e.target || e.srcElement)) {
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
      interval: 5000,
    },
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

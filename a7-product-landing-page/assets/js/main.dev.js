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
      $$("confirm-msg").style.display = "none";
      $$("submit").disabled = true;
    });
    addEvent($$("login-btn"), "click", function () {
      tClass(document.body, "modal-open");
      rClass(document.body, "animate");
      $$("log-email").value = "";
      $$("log-password").value = "";

      if ($$("reveal").checked) {
        $$("reveal").checked = false;
      }

      if ($$("remember").checked) {
        $$("remember").checked = false;
      }
    });
    addEvent($$("password"), "keyup", function () {
      if (this.value == $$("confirm-pw").value && this.value.length != 0) {
        $$("submit").disabled = false;
        $$("confirm-msg").style.display = "initial";
        addAtt($$("confirm-msg"), "src", "../assets/img/check.png");
      } else if (this.value != $$("confirm-pw").value && $$("confirm-pw").value.length >= 1) {
        $$("submit").disabled = true;
        $$("confirm-msg").style.display = "initial";
        addAtt($$("confirm-msg"), "src", "../assets/img/cross.png");
      } else if (this.value.length == 0) {
        $$("confirm-msg").style.display = "none";
      }
    });
    addEvent($$("confirm-pw"), "keyup", function () {
      if (this.value == $$("password").value && this.value.length != 0) {
        $$("submit").disabled = false;
        $$("confirm-msg").style.display = "initial";
        addAtt($$("confirm-msg"), "src", "../assets/img/check.png");
      } else if (this.value != $$("password").value && $$("password").value.length >= 1) {
        $$("submit").disabled = true;
        $$("confirm-msg").style.display = "initial";
        addAtt($$("confirm-msg"), "src", "../assets/img/cross.png");
      } else if (this.value.length == 0) {
        $$("confirm-msg").style.display = "none";
      }
    });
    addEvent($$("reveal"), "click", function () {
      if ($$("reveal").checked) {
        addAtt($$("log-password"), "type", "text");
      } else {
        addAtt($$("log-password"), "type", "password");
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
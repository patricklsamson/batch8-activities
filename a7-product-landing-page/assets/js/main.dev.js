"use strict";

doc_ready(function () {
  match_height(".mh");
  match_height(".mh2");
  match_height(".mh3");

  if (body("index")) {
    add_event(id("signup-btn"), "click", function () {
      toggle_class(document.body, "modal-open");
      remove_class(document.body, "animate");
      id("name").value = "";
      id("email").value = "";
      id("password").value = "";
      id("confirm-pw").value = "";
      id("confirm-msg").style.display = "none";
      id("submit").disabled = true;
    });
    add_event(id("login-btn"), "click", function () {
      toggle_class(document.body, "modal-open");
      remove_class(document.body, "animate");
      id("log-email").value = "";
      id("log-password").value = "";

      if (id("reveal").checked) {
        id("reveal").checked = false;
      }

      if (id("remember").checked) {
        id("remember").checked = false;
      }

      if (has_class(this, "once")) {
        alert("Check out our latest offers and products after logging in!");
        remove_class(this, "once");
      }
    });
    add_event(id("password"), "keyup", function () {
      if (this.value == id("confirm-pw").value && this.value.length != 0) {
        id("submit").disabled = false;
        id("confirm-msg").style.display = "initial";
        add_att(id("confirm-msg"), "src", "../assets/img/check.png");
      } else if (this.value != id("confirm-pw").value && id("confirm-pw").value.length >= 1) {
        id("submit").disabled = true;
        id("confirm-msg").style.display = "initial";
        add_att(id("confirm-msg"), "src", "../assets/img/cross.png");
      } else if (this.value.length == 0) {
        id("confirm-msg").style.display = "none";
      }
    });
    add_event(id("confirm-pw"), "keyup", function () {
      if (this.value == id("password").value && this.value.length != 0) {
        id("submit").disabled = false;
        id("confirm-msg").style.display = "initial";
        add_att(id("confirm-msg"), "src", "../assets/img/check.png");
      } else if (this.value != id("password").value && id("password").value.length >= 1) {
        id("submit").disabled = true;
        id("confirm-msg").style.display = "initial";
        add_att(id("confirm-msg"), "src", "../assets/img/cross.png");
      } else if (this.value.length == 0) {
        id("confirm-msg").style.display = "none";
      }
    });
    add_event(id("reveal"), "click", function () {
      if (id("reveal").checked) {
        add_att(id("log-password"), "type", "text");
      } else {
        add_att(id("log-password"), "type", "password");
      }
    });
  }

  if (body("body-login")) {
    add_event(document.body, "click", function (e) {
      if (!e.target.closest("#header") || !id("header").contains(e.target || e.srcElement)) {
        id("user").checked = false;
      }
    });
  }

  add_event(window, "scroll", function () {
    if (body("body-login")) {
      if (window.pageYOffset >= 0 || document.documentElement.scrollTop >= 0) {
        id("user").checked = false;
      }
    }

    if (window.pageYOffset >= 0 || document.documentElement.scrollTop >= 0) {
      id("nav-toggle").checked = false;
    }

    if (document.body.scrollTop >= id("header").offsetTop || document.documentElement.scrollTop >= id("header").offsetTop) {
      qs(".menu-container").style.marginTop = "0";
    }
  });
  add_event(id("nav-toggle"), "click", function () {
    if (window.pageYOffset <= id("header").offsetTop || document.documentElement.scrollTop <= id("header").offsetTop) {
      qs(".menu-container").style.marginTop = "-" + id("header").offsetHeight + "px";
    }
  });
  add_event(document.body, "click", function (e) {
    if (!e.target.closest("#nav-bar") || !id("nav-bar").contains(e.target || e.srcElement)) {
      id("nav-toggle").checked = false;
    }

    if (!e.target.closest("#footer") || !id("footer").contains(e.target || e.srcElement)) {
      id("about").checked = false;
      id("service").checked = false;
      id("triton").checked = false;
      id("helios").checked = false;
    }
  });

  for (var i = 0; i < qsa(".nav-link").length; i++) {
    add_event(qsa(".nav-link")[i], "click", function () {
      id("nav-toggle").checked = false;
    });
  }

  var carousel = new caro({
    autoplay: {
      on: true,
      interval: 5000
    }
  });
  add_event(id("about-btn"), "click", function () {
    id("service").checked = false;
    id("triton").checked = false;
    id("helios").checked = false;
  });
  add_event(id("service-btn"), "click", function () {
    id("about").checked = false;
    id("triton").checked = false;
    id("helios").checked = false;
  });
  add_event(id("triton-btn"), "click", function () {
    id("about").checked = false;
    id("service").checked = false;
    id("helios").checked = false;
  });
  add_event(id("helios-btn"), "click", function () {
    id("about").checked = false;
    id("service").checked = false;
    id("triton").checked = false;
  });
});
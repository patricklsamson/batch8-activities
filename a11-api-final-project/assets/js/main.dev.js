"use strict";

doc_ready(function () {
  loadQuote();
  qsel("script").parentNode.insertBefore(ytScript, qsel("script[src*='youtube']"));
  add_event(id("hide-header-btn"), "click", function () {
    add_class(id("header"), "hide");
    setTimeout(function () {
      remove_class(document.body, "modal-open");
    }, 500);
  });
  add_event(id("show-header-btn"), "click", function () {
    loadQuote();
    remove_class(id("header"), "hide");
    add_class(document.body, "modal-open");
    setTimeout(function () {
      id("advice-ul").innerHTML = "Search for an advice or roll the dice!";
      id("bored-activity").innerHTML = "Roll the dice!";
      id("sos-form").reset();
      qsel(".selected").innerHTML = "Code";
    }, 500);
  });

  for (i = 0; i < qsel_all(".tab-btn").length; i++) {
    add_event(qsel_all(".tab-btn")[i], "click", function () {
      for (j = 0; j < qsel_all(".tab-btn").length; j++) {
        add_class(qsel_all(".tab-btn")[j], "inactive");
        remove_class(id("modal-wrap"), qsel_all(".tab-btn")[j].id.split("-")[0]);

        if (has_class(this, "inactive")) {
          remove_class(this, "inactive");
          add_class(id("modal-wrap"), this.id.split("-")[0]);
        }
      }
    });
  } // OLD CODE
  // add_event(id("advice-btn"), "click", () => {
  //   remove_class(id("advice-btn"), "inactive");
  //   add_class(id("bored-btn"), "inactive");
  //   add_class(id("sos-btn"), "inactive");
  //   add_class(id("modal-wrap"), "advice");
  //   remove_class(id("modal-wrap"), "bored");
  //   remove_class(id("modal-wrap"), "sos");
  // });
  // add_event(id("bored-btn"), "click", () => {
  //   remove_class(id("bored-btn"), "inactive");
  //   add_class(id("advice-btn"), "inactive");
  //   add_class(id("sos-btn"), "inactive");
  //   add_class(id("modal-wrap"), "bored");
  //   remove_class(id("modal-wrap"), "advice");
  //   remove_class(id("modal-wrap"), "sos");
  // });
  // add_event(id("sos-btn"), "click", () => {
  //   remove_class(id("sos-btn"), "inactive");
  //   add_class(id("advice-btn"), "inactive");
  //   add_class(id("bored-btn"), "inactive");
  //   add_class(id("modal-wrap"), "sos");
  //   remove_class(id("modal-wrap"), "advice");
  //   remove_class(id("modal-wrap"), "bored");
  // });


  add_event(id("advice-form"), "submit", function (e) {
    e.preventDefault();
    searchAdvice();
    return false;
  });
  add_event(id("advice-dice-btn"), "click", function () {
    id("advice-form").reset();
    id("advice-ul").innerHTML = "";
    add_class(id("advice-dice-btn"), "rolling");
    fetch("https://api.adviceslip.com/advice").then(function (response) {
      return response.json();
    }).then(function (data) {
      id("advice-ul").innerHTML += "<p class=\"talign\">".concat(data.slip.advice, "</p>");
    });
    setTimeout(function () {
      remove_class(id("advice-dice-btn"), "rolling");
    }, 500);
  });
  add_event(id("bored-dice-btn"), "click", function () {
    id("bored-activity").innerHTML = "";
    add_class(id("bored-dice-btn"), "rolling");
    fetch("http://www.boredapi.com/api/activity?minaccessibility=0.05&maxaccessibility=0.1").then(function (response) {
      return response.json();
    }).then(function (data) {
      return id("bored-activity").innerHTML = data.activity;
    });
    setTimeout(function () {
      remove_class(id("bored-dice-btn"), "rolling");
    }, 500);
  });
  fetch("https://restcountries.eu/rest/v2/all?fields=name;callingCodes").then(function (response) {
    return response.json();
  }).then(function (data) {
    var _loop = function _loop() {
      var div = create_el("div"),
          nameLower = data[i].name.split(" ").join("").toLowerCase();
      add_class(div, "option");
      div.innerHTML = "<input type=\"radio\" name=\"country-code\" id=\"".concat(nameLower, "\" /><label for=\"").concat(nameLower, "\">(+").concat(data[i].callingCodes[0], ") ").concat(data[i].name, "</label>");
      setTimeout(function () {
        qsel(".options-container").appendChild(div);
      }, 1000);
    };

    for (i = 0; i < data.length; i++) {
      _loop();
    }
  });
  setTimeout(function () {
    search_sel();
  }, 2500);
  add_event(id("sos-form"), "submit", function (e) {
    e.preventDefault();

    if (qsel(".selected").innerHTML != "Code") {
      sendLocation(inner(trim(id("sos-name").value.toUpperCase())), qsel(".selected").innerHTML.split(" ")[0] + id("sos-number").value, id("sos-message").value);
    }

    return false;
  });
  add_att(id("sos-number"), "onkeypress", "return num_only(event)");
  add_event(window, "click", function (e) {
    if (e.target.id != "selected" || e.srcElement.id != "selected") {
      remove_class(qsel(".selected"), "active");
    }
  });
});
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
  });
  add_event(id("advice-btn"), "click", function () {
    remove_class(id("advice-btn"), "inactive");
    add_class(id("bored-btn"), "inactive");
    add_class(id("modal-wrap"), "advice");
    remove_class(id("modal-wrap"), "bored");
  });
  add_event(id("bored-btn"), "click", function () {
    remove_class(id("bored-btn"), "inactive");
    add_class(id("advice-btn"), "inactive");
    add_class(id("modal-wrap"), "bored");
    remove_class(id("modal-wrap"), "advice");
  });
  add_event(id("advice-form"), "submit", function (e) {
    e.preventDefault();
    searchAdvice();
    return false;
  });
  add_event(id("advice"), "keypress", function (e) {
    if (e.which == 13 || e.keyCode == 13) {
      searchAdvice();
    }
  });
  add_event(id("advice-dice-btn"), "click", randomAdvice);
  add_event(id("bored-dice-btn"), "click", function () {
    id("bored-activity").innerHTML = "";
    add_class(id("bored-dice-btn"), "rolling");
    setTimeout(function () {
      remove_class(id("bored-dice-btn"), "rolling");
      fetch("http://www.boredapi.com/api/activity?minaccessibility=0.05&maxaccessibility=0.1").then(function (response) {
        return response.json();
      }).then(function (data) {
        return id("bored-activity").innerHTML = data.activity;
      });
    }, 500);
  });
});
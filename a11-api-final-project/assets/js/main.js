doc_ready(() => {
  loadQuote();

  qsel("script").parentNode.insertBefore(
    ytScript,
    qsel("script[src*='youtube']")
  );

  add_event(id("hide-header-btn"), "click", () => {
    add_class(id("header"), "hide");

    setTimeout(() => {
      remove_class(document.body, "modal-open");
    }, 500);
  });

  add_event(id("show-header-btn"), "click", () => {
    loadQuote();
    remove_class(id("header"), "hide");
    add_class(document.body, "modal-open");
  });

  add_event(id("advice-btn"), "click", () => {
    remove_class(id("advice-btn"), "inactive");
    add_class(id("bored-btn"), "inactive");
    add_class(id("modal-wrap"), "advice");
    remove_class(id("modal-wrap"), "bored");
  });

  add_event(id("bored-btn"), "click", () => {
    remove_class(id("bored-btn"), "inactive");
    add_class(id("advice-btn"), "inactive");
    add_class(id("modal-wrap"), "bored");
    remove_class(id("modal-wrap"), "advice");
  });

  add_event(id("advice-form"), "submit", (e) => {
    e.preventDefault();
    searchAdvice();
    return false;
  });

  add_event(id("advice"), "keypress", (e) => {
    if (e.which == 13 || e.keyCode == 13) {
      searchAdvice();
    }
  });

  add_event(id("advice-dice-btn"), "click", randomAdvice);

  add_event(id("bored-dice-btn"), "click", () => {
    id("bored-activity").innerHTML = "";
    add_class(id("bored-dice-btn"), "rolling");

    setTimeout(() => {
      remove_class(id("bored-dice-btn"), "rolling");

      fetch(
        "http://www.boredapi.com/api/activity?minaccessibility=0.05&maxaccessibility=0.1"
      )
        .then((response) => response.json())
        .then((data) => (id("bored-activity").innerHTML = data.activity));
    }, 500);
  });
});

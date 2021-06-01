"use strict";

doc_ready(function () {
  match_height(".mh");
  add_event(window, "load", function () {
    if (today.getHours() >= 6 && today.getHours() < 18) {
      add_class(document.documentElement, "light");
    } else {
      remove_class(document.documentElement, "light");
    }

    clock();
    setInterval(clock, 1000);
    id("name").focus();
  });
  add_event(id("light"), "click", function () {
    toggle_class(document.documentElement, "light");
  }); // add_event(window, "scroll", () => {
  //   if (
  //     window.pageYOffset > id("header").offsetTop ||
  //     document.documentElement.scrollTop > id("header").offsetTop
  //   ) {
  //     add_class(id("header"), "sticky");
  //   } else {
  //     remove_class(id("header"), "sticky");
  //   }
  // });

  add_event(window, "click", function (e) {
    if ((e.target.id || e.srcElement.id) != id("name") && has_class(id("modal"), "show")) {
      id("name").focus();
    }
  });
  add_event(id("name"), "keyup", function () {
    id("user").innerHTML = inner(id("name").value.substring(0, 1).toUpperCase() + id("name").value.substring(1).toLowerCase());

    if (id("name").value.length != 0) {
      id("submit").disabled = false;
    } else {
      id("submit").disabled = true;
    }
  });
  add_event(id("name"), "keypress", function (e) {
    if ((e.which || e.keyCode) == 13 && id("name").value.length != 0) {
      modalOpen();
    }
  });
  add_event(id("submit"), "click", function () {
    modalOpen();
  });
  add_event(id("change"), "click", function () {
    modalOpen();
    setTimeout(function () {
      id("name").focus();
    }, 500);
  });
  add_events(id("add-to-do"), "keypress", function (e) {
    if ((e.which || e.keyCode) == 13 && id("add-to-do").value.length != 0) {
      addedToDo();
    }
  });
  add_event(id("add-to-do-btn"), "click", function () {
    if (id("add-to-do").value.length != 0) {
      addedToDo();
    }
  }); // OLD CODE
  // listQuotes();

  defaultQuotes();
  showQuotes();
  setInterval(showQuotes, 3000);
  add_event(id("add-quote"), "keypress", function (e) {
    if ((e.which || e.keyCode) == 13 && id("add-quote").value.length != 0) {
      addedQuote();
    }
  });
  add_event(id("add-quote-btn"), "click", function () {
    if (id("add-quote").value.length != 0) {
      addedQuote();
    }
  });
});
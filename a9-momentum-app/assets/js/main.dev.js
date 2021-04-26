"use strict";

doc_ready(function () {
  match_height(".mh");
  var today = new Date(),
      twelveHours = today.getHours() % 12 ? today.getHours() % 12 : 12,
      hours = twelveHours < 10 ? "0".concat(twelveHours) : twelveHours,
      minutes = today.getMinutes() < 10 ? "0".concat(today.getMinutes()) : today.getMinutes(),
      ampm = today.getHours() >= 12 ? " PM" : " AM",
      months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
      monthsNum = today.getMonth() < 10 ? "0".concat(today.getMonth() + 1) : today.getMonth() + 1,
      date = today.getDate() < 10 ? "0".concat(today.getDate()) : today.getDate();
  var i,
      todo = [],
      quotes = ["Every morning is a beautiful morning.", "Shine like the afternoon sun and let people be inspired for all the great things you do.", "Evenings are life's way of saying that you are closer to your dreams."],
      quotesCounter = -1;

  var clock = function clock() {
    if (today.getHours() < 12) {
      id("greetings").innerHTML = "Morning";
    } else if (today.getHours() >= 12 && today.getHours() < 18) {
      id("greetings").innerHTML = "Afternoon";
    } else {
      id("greetings").innerHTML = "Evening";
    }

    id("time").innerHTML = "".concat(hours, ":").concat(minutes).concat(ampm);
    add_att(id("time"), "datetime", "".concat(today.getHours(), ":").concat(today.getMinutes()));

    for (i = 0; i < months.length; i++) {
      id("date").innerHTML = "".concat(months[today.getMonth()], " ").concat(date, ", ").concat(today.getFullYear());
    }

    add_att(id("date"), "datetime", "".concat(today.getFullYear(), "-").concat(monthsNum, "-").concat(date));
  };

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
  });
  add_event(window, "scroll", function () {
    if (window.pageYOffset > id("header").offsetTop || document.documentElement.scrollTop > id("header").offsetTop) {
      add_class(id("header"), "sticky");
    } else {
      remove_class(id("header"), "sticky");
    }
  });
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
      toggle_class(id("modal"), "show");
      toggle_class(document.body, "modal-open");
    }
  });
  add_event(id("submit"), "click", function () {
    toggle_class(id("modal"), "show");
    toggle_class(document.body, "modal-open");
  });
  add_event(id("change"), "click", function () {
    toggle_class(id("modal"), "show");
    toggle_class(document.body, "modal-open");
    setTimeout(function () {
      id("name").focus();
    }, 500);
  });

  var addedToDo = function addedToDo() {
    var element = create_el("li");
    id("to-do-list").appendChild(element);
    element.innerHTML += inner(todo[todo.length - 1]);
    add_event(element, "click", function () {
      toggle_class(element, "done");
    });
  };

  add_event(id("add-to-do"), "keypress", function (e) {
    if ((e.which || e.keyCode) == 13 && id("add-to-do").value.length != 0) {
      todo.push(id("add-to-do").value.substring(0, 1).toUpperCase() + id("add-to-do").value.substring(1).toLowerCase());
      id("add-to-do").value = "";
      addedToDo();
    }
  });
  add_event(id("add-to-do-btn"), "click", function () {
    if (id("add-to-do").value.length != 0) {
      todo.push(id("add-to-do").value.substring(0, 1).toUpperCase() + id("add-to-do").value.substring(1).toLowerCase());
      id("add-to-do").value = "";
      addedToDo();
    }
  });

  var showQuotes = function showQuotes() {
    quotesCounter++;

    if (quotesCounter == quotes.length) {
      quotesCounter = 0;
    }

    id("quotes").innerHTML = inner(quotes[quotesCounter]);
  };

  showQuotes();
  setInterval(showQuotes, 5000);

  var listQuotes = function listQuotes() {
    for (i = 0; i < quotes.length; i++) {
      var element = create_el("p");
      add_class(element, "mb-05");
      id("added-quotes-wrap").appendChild(element);
      element.innerHTML += inner(quotes[i]);
    }
  };

  listQuotes();

  var addedQuote = function addedQuote() {
    var element = create_el("p");
    add_class(element, "mb-05");
    id("added-quotes-wrap").appendChild(element);
    element.innerHTML += inner(quotes[quotes.length - 1]);
  };

  add_event(id("add-quote"), "keypress", function (e) {
    if ((e.which || e.keyCode) == 13 && id("add-quote").value.length != 0) {
      quotes.push(id("add-quote").value.substring(0, 1).toUpperCase() + id("add-quote").value.substring(1).toLowerCase());
      id("add-quote").value = "";
      addedQuote();
    }
  });
  add_event(id("add-quote-btn"), "click", function () {
    if (id("add-quote").value.length != 0) {
      quotes.push(id("add-quote").value.substring(0, 1).toUpperCase() + id("add-quote").value.substring(1).toLowerCase());
      id("add-quote").value = "";
      addedQuote();
    }
  }); // const test = document.createElement("p");
  // document.getElementById("to-do-list").appendChild(test);
  // test.innerText = "Don't be lazy!";
  // test.style.color = "red";
  // test.style.fontWeight = "900";
});
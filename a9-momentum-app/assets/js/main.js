doc_ready(() => {
  match_height(".mh");

  let today = new Date(),
    twelveHours = today.getHours() % 12 ? today.getHours() % 12 : 12,
    hours = twelveHours < 10 ? `0${twelveHours}` : twelveHours,
    minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes(),
    ampm = today.getHours() >= 12 ? " PM" : " AM",
    i,
    months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    monthsNum = today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1,
    date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate(),
    todo = [],
    quotes = ["Every morning is a beautiful morning.", "Shine like the afternoon sun and let people be inspired for all the great things you do.", "Evenings are life's way of saying that you are closer to your dreams."],
    quotesCounter = -1;

  let clock = () => {
    if (today.getHours() < 12) {
      id("greetings").innerHTML = "Morning";
    } else if (today.getHours() >= 12 && today.getHours() < 18) {
      id("greetings").innerHTML = "Afternoon";
    } else {
      id("greetings").innerHTML = "Evening";
    }

    id("time").innerHTML = `${hours}:${minutes}${ampm}`;
    add_att(id("time"), "datetime", `${today.getHours()}:${today.getMinutes()}`);

    for (i = 0; i < months.length; i++) {
      id("date").innerHTML = `${months[today.getMonth()]} ${date}, ${today.getFullYear()}`;
    }

    add_att(id("date"), "datetime", `${today.getFullYear()}-${monthsNum}-${date}`);
  };

  add_event(window, "load", () => {
    if (today.getHours() >= 6 && today.getHours() < 18) {
      add_class(document.documentElement, "light");
    } else {
      remove_class(document.documentElement, "light");
    }

    clock();
    setInterval(clock, 1000);
    id("name").focus();
  });

  add_event(id("light"), "click", () => {
    toggle_class(document.documentElement, "light");
  });

  add_event(window, "click", (e) => {
    if ((e.target.id || e.srcElement.id) != id("name") && has_class(id("modal"), "show")) {
      id("name").focus();
    }
  });

  add_event(id("name"), "keyup", () => {
    id("user").innerHTML = `${id("name").value.substring(0, 1).toUpperCase()}${id("name").value.substring(1).toLowerCase()}`;

    if (id("name").value.length != 0) {
      id("submit").disabled = false;
    } else {
      id("submit").disabled = true;
    }
  });

  add_event(id("name"), "keypress", (e) => {
    if ((e.which || e.keyCode) == 13 && id("name").value.length != 0) {
      toggle_class(id("modal"), "show");
      toggle_class(document.body, "modal-open");
    }
  });

  add_event(id("submit"), "click", () => {
    toggle_class(id("modal"), "show");
    toggle_class(document.body, "modal-open");
  });

  add_event(id("change"), "click", () => {
    toggle_class(id("modal"), "show");
    toggle_class(document.body, "modal-open");

    setTimeout(() => {
      id("name").focus();
    }, 500);
  });

  let toDoList = () => {
    let element = create_el("li");

    id("to-do-list").appendChild(element);
    element.innerHTML += todo[todo.length - 1];

    add_event(element, "click", () => {
      toggle_class(element, "done");
    });
  };

  add_event(id("add-to-do"), "keypress", (e) => {
    if ((e.which || e.keyCode) == 13 && id("add-to-do").value.length != 0) {
      todo.push(id("add-to-do").value.substring(0, 1).toUpperCase() + id("add-to-do").value.substring(1).toLowerCase());
      id("add-to-do").value = "";
      toDoList();
    }
  });

  add_event(id("add-to-do-btn"), "click", () => {
    if (id("add-to-do").value.length != 0) {
      todo.push(id("add-to-do").value.substring(0, 1).toUpperCase() + id("add-to-do").value.substring(1).toLowerCase());
      id("add-to-do").value = "";
      toDoList();
    }
  });

  let showQuotes = () => {
    quotesCounter++;

    if (quotesCounter == quotes.length) {
      quotesCounter = 0;
    }

    id("quotes").innerHTML = quotes[quotesCounter];
  };

  showQuotes();
  setInterval(showQuotes, 5000);

  let listQuotes = () => {
    for (i = 0; i < quotes.length; i++) {
      let element = create_el("p");

      add_class(element, "mb-05");
      id("added-quotes-wrap").appendChild(element);
      element.innerHTML += quotes[i];
    }
  };

  listQuotes();

  let addedQuote = () => {
    let element = create_el("p");

    add_class(element, "mb-05");
    id("added-quotes-wrap").appendChild(element);
    element.innerHTML += quotes[quotes.length - 1];
  };

  add_event(id("add-quote"), "keypress", (e) => {
    if ((e.which || e.keyCode) == 13 && id("add-quote").value.length != 0) {
      quotes.push(id("add-quote").value.substring(0, 1).toUpperCase() + id("add-quote").value.substring(1).toLowerCase());
      id("add-quote").value = "";
      addedQuote();
    }
  });

  add_event(id("add-quote-btn"), "click", () => {
    if (id("add-quote").value.length != 0) {
      quotes.push(id("add-quote").value.substring(0, 1).toUpperCase() + id("add-quote").value.substring(1).toLowerCase());
      id("add-quote").value = "";
      addedQuote();
    }
  });
});
const today = new Date(),
  twelveHours = today.getHours() % 12 ? today.getHours() % 12 : 12,
  hours = twelveHours < 10 ? `0${twelveHours}` : twelveHours,
  minutes =
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes(),
  ampm = today.getHours() >= 12 ? "PM" : "AM",
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  monthsNum =
    today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1,
  date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();

let i,
  todo = [],
  quotes = [
    "Every morning is a beautiful morning.",
    "Shine like the afternoon sun and let people be inspired for all the great things you do.",
    "Evenings are life's way of saying that you are closer to your dreams.",
  ];
// quotesCounter = -1;

const clock = () => {
  if (today.getHours() < 12) {
    id("greetings").innerHTML = "Morning";
  } else if (today.getHours() >= 12 && today.getHours() < 18) {
    id("greetings").innerHTML = "Afternoon";
  } else {
    id("greetings").innerHTML = "Evening";
  }

  id("time").innerHTML = `${hours}:${minutes} ${ampm}`;

  add_att(id("time"), "datetime", `${today.getHours()}:${today.getMinutes()}`);

  for (i = 0; i < months.length; i++) {
    id("date").innerHTML = `${
      months[today.getMonth()]
    } ${date}, ${today.getFullYear()}`;
  }

  add_att(
    id("date"),
    "datetime",
    `${today.getFullYear()}-${monthsNum}-${date}`
  );
};

const modalOpen = () => {
  toggle_class(id("modal"), "show");
  toggle_class(document.body, "y-hidden");
};

const addedToDo = () => {
  todo.push(
    id("add-to-do").value.substring(0, 1).toUpperCase() +
      id("add-to-do").value.substring(1).toLowerCase()
  );

  id("add-to-do").value = "";

  const element = create_el("li"),
    remove = create_el("i");

  element.innerHTML = inner(todo[todo.length - 1]);
  add_class(remove, "fas");
  add_class(remove, "fa-minus-circle");
  remove.style.float = "right";
  id("to-do-list").appendChild(element);
  element.appendChild(remove);

  add_event(element, "click", () => {
    toggle_class(element, "done");
  });

  add_event(remove, "click", () => {
    element.style.display = "none";
  });
};

// OLD CODE
// const listQuotes = () => {
//   for (i = 0; i < quotes.length; i++) {
//     const element = create_el("p");

//     add_class(element, "mb-05");
//     id("added-quotes-wrap").appendChild(element);
//     element.innerHTML += inner(quotes[i]);
//   }
// };

const defaultQuotes = () => {
  for (i = 0; i < quotes.length; i++) {
    const element = create_el("p"),
      remove = create_el("i");

    add_class(element, "mb-05");
    element.innerHTML = inner(quotes[i]);
    remove.id = quotes.indexOf(quotes[i]);
    add_class(remove, "fas");
    add_class(remove, "fa-minus-circle");
    remove.style.cursor = "pointer";
    remove.style.float = "right";
    id("added-quotes-wrap").appendChild(element);
    element.appendChild(remove);

    add_event(remove, "click", function () {
      quotes.splice(this.id, 1, "");
      element.style.display = "none";
    });
  }
};

const addedQuote = () => {
  quotes.push(
    id("add-quote").value.substring(0, 1).toUpperCase() +
      id("add-quote").value.substring(1).toLowerCase()
  );

  id("add-quote").value = "";

  const element = create_el("p"),
    remove = create_el("i");

  add_class(element, "mb-05");
  element.innerHTML = inner(quotes[quotes.length - 1]);

  for (i = 0; i < quotes.length; i++) {
    remove.id = quotes.indexOf(quotes[i]);
  }

  add_class(remove, "fas");
  add_class(remove, "fa-minus-circle");
  remove.style.cursor = "pointer";
  remove.style.float = "right";
  id("added-quotes-wrap").appendChild(element);
  element.appendChild(remove);

  add_event(remove, "click", function () {
    quotes.splice(this.id, 1, "");
    element.style.display = "none";
  });
};

// OLD CODE
// const showQuotes = () => {
//   quotesCounter++;

//   if (quotesCounter == quotes.length) {
//     quotesCounter = 0;
//   }

//   if (quotes[quotesCounter] != "") {
//     id("quotes").innerHTML = inner(quotes[quotesCounter]);
//   }
// };

const showQuotes = () => {
  const filteredQuotes = quotes.filter((quote) => quote != "");

  id("quotes").innerHTML = inner(filteredQuotes[rand(filteredQuotes.length)]);
};

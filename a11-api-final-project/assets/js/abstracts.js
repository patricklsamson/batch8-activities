const ytScript = create_el("script");

let i,
  j,
  player,
  done = false;

ytScript.src = "https://www.youtube.com/iframe_api";

const onPlayerReady = (e) => {
  e.target.playVideo();
};

const stopVideo = () => {
  player.stopVideo();
};

const onPlayerStateChange = (e) => {
  if (e.data == YT.PlayerState.PLAYING && !done) {
    stopVideo();
    done = true;
  }
};

const onYouTubeIframeAPIReady = () => {
  player = new YT.Player("player", {
    videoId: "DxIDKZHW3-E",
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

const loadQuote = () => {
  match_media(
    "only screen and (min-width: 992px)",
    992,
    function match() {
      fetch(
        "https://api.quotable.io/random?maxLength=100&?tags=faith,famous-quotes,friendship,future,happiness,inspirational,life,love,proverb,religion,success,wisdom"
      )
        .then((response) => response.json())
        .then((data) => (id("quote").innerHTML = data.content))
        .then((data) =>
          console.log(
            `Screen Min Width = 992px\nQuotes Character Length = ${data.length} characters`
          )
        );
    },
    function unmatch() {
      fetch(
        "https://api.quotable.io/random?maxLength=30&?tags=faith,famous-quotes,friendship,future,happiness,inspirational,life,love,proverb,religion,success,wisdom"
      )
        .then((response) => response.json())
        .then((data) => (id("quote").innerHTML = data.content))
        .then((data) =>
          console.log(
            `Screen Max Width = 991px\nQuotes Character Length = ${data.length} characters`
          )
        );
    }
  );
};

const searchAdvice = () => {
  id("advice-ul").innerHTML = "";

  if (id("advice").value.length >= 2) {
    fetch(`https://api.adviceslip.com/advice/search/${id("advice").value}`)
      .then((response) => response.json())
      .then((data) => {
        for (i = 0; i < data.slips.length; i++) {
          id(
            "advice-ul"
          ).innerHTML += `<li class="mb-05">${data.slips[i].advice}</li>`;
        }
      })
      .catch(() => {
        id("advice-ul").innerHTML +=
          "No advice slips found matching that search term.";
      });
  }

  id("advice-form").reset();
};

function addWhiteList(element) {
  const location = Location.locationStorage();

  let whiteListPrompt = prompt(
      'Are you sure in putting this in the whitelist?\nType "Y" for yes and "N" for no.',
      "Y"
    ),
    whiteListAnswer =
      whiteListPrompt != null
        ? trim(whiteListPrompt.toLowerCase())
        : console.clear();

  if (whiteListAnswer == "n") {
    return;
  } else {
    location[element.id].whiteList = true;
    localStorage.setItem("location", JSON.stringify(location));
    Location.list_location();
  }
}

function removeWhiteList(element) {
  const location = Location.locationStorage();

  let whiteListPrompt = prompt(
      'Are you sure in removing this from the whitelist?\nType "Y" for yes and "N" for no.',
      "Y"
    ),
    whiteListAnswer =
      whiteListPrompt != null
        ? trim(whiteListPrompt.toLowerCase())
        : console.clear();

  if (whiteListAnswer == "n") {
    return;
  } else {
    location[element.id].whiteList = false;
    localStorage.setItem("location", JSON.stringify(location));
    Location.list_location();
  }
}

function delLocation(element) {
  const location = Location.locationStorage();

  let deletePrompt = prompt(
      'Are you sure in deleting this?\nType "Y" for yes and "N" for no.',
      "N"
    ),
    deleteAnswer =
      deletePrompt != null ? trim(deletePrompt.toLowerCase()) : console.clear();

  if (deleteAnswer == "y") {
    location.splice(element.id, 1);
    localStorage.setItem("location", JSON.stringify(location));
    Location.list_location();
  } else {
    return;
  }
}

class Location {
  constructor(name, number, message, timeStamp) {
    this.name = name;
    this.number = number;
    this.message = message;
    this.timeStamp = timeStamp;
    this.whiteList = false;
    this.ipInfo = [];
  }

  static locationStorage() {
    let location;

    if (localStorage.getItem("location") === null) {
      location = [];
    } else {
      location = JSON.parse(localStorage.getItem("location"));
    }

    return location;
  }

  static time_stamp() {
    const today = new Date(),
      month =
        today.getMonth() < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1,
      date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate(),
      dateFull = `${month}/${date}/${today.getFullYear()}`,
      hour = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours(),
      minute =
        today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes(),
      seconds =
        today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds(),
      timeFull = `${hour}:${minute}:${seconds}`;

    return `${dateFull} - ${timeFull}`;
  }

  static send_location(newLocation) {
    const location = Location.locationStorage();

    location.push(newLocation);
    localStorage.setItem("location", JSON.stringify(location));
  }

  static list_location() {
    const location = Location.locationStorage();

    id("sos-table").innerHTML = "";
    id("whitelist-table").innerHTML = "";

    for (i = 0; i < location.length; i++) {
      if (location[i].whiteList == false) {
        let tableRow = create_el("tr");

        tableRow.innerHTML = `<td>${location[i].timeStamp}</td>\n<td>${location[i].name}</td>\n<td>${location[i].number}</td>\n<td>${location[i].ipInfo[0].country}</td>\n<td>${location[i].message}</td>\n<td><i id="${i}" onclick="addWhiteList(this)" class="far fa-plus-square"></i></td>\n<td><i id="${i}" onclick="delLocation(this)" class="far fa-minus-square"></i></td>`;
        id("sos-table").appendChild(tableRow);
      } else {
        let tableRow = create_el("tr");

        tableRow.innerHTML = `<td>${location[i].timeStamp}</td>\n<td>${location[i].name}</td>\n<td>${location[i].number}</td>\n<td>${location[i].ipInfo[0].country}</td>\n<td>${location[i].message}</td>\n<td><i id="${i}" onclick="removeWhiteList(this)" class="far fa-minus-square"></i></td>\n<td><i id="${i}" onclick="delLocation(this)" class="far fa-minus-square"></i></td>`;
        id("whitelist-table").appendChild(tableRow);
      }
    }
  }
}

const sendLocation = (name, number, message, timeStamp) => {
  if (id("sos-name").value.length >= 3) {
    const newLocation = new Location(name, number, message, timeStamp);

    fetch("https://ipinfo.io/json?token=d17cf2c04985a8")
      .then((response) => response.json())
      .then((data) => newLocation.ipInfo.push(data));

    setTimeout(() => {
      Location.send_location(newLocation);
    }, 2000);

    id("sos-form").reset();
    qsel(".selected").innerHTML = "Code";
  }
};

class Admin {
  constructor(username, password, adminId) {
    this.username = username;
    this.password = password;
    this.adminId = adminId;
  }

  static adminStorage() {
    let admin;

    if (localStorage.getItem("p-admin") === null) {
      admin = [];
    } else {
      admin = JSON.parse(localStorage.getItem("p-admin"));
    }

    return admin;
  }

  static addAdmin(adminAccount) {
    const admin = Admin.adminStorage();

    admin.push(adminAccount);
    localStorage.setItem("p-admin", JSON.stringify(admin));
  }

  static login_admin(username, password) {
    const admin = Admin.adminStorage();

    let adminCheck = admin.findIndex((index) => index.username == username);

    if (admin[0].username == username && admin[0].password == password) {
      add_class(id("login-form"), "hide");
      add_class(id("header-admin"), "show");
      add_class(id("table-wrap"), "show");
    } else if (!admin[adminCheck]) {
      alert("User does not exist!");
    } else {
      alert("Username and password do not match!");
    }
  }

  static password_match(password, confirmPassword, message) {
    add_event(password, "keyup", function () {
      if (this.value == confirmPassword.value && this.value.length != 0) {
        remove_class(message, "fa-times");
        add_class(message, "fa-check");
      } else if (
        this.value != confirmPassword.value &&
        confirmPassword.value.length >= 1
      ) {
        remove_class(message, "fa-check");
        add_class(message, "fa-times");
      } else if (this.value.length == 0) {
        remove_class(message, "fa-check");
        remove_class(message, "fa-times");
      }
    });

    add_event(confirmPassword, "keyup", function () {
      if (this.value == password.value && this.value.length != 0) {
        remove_class(message, "fa-times");
        add_class(message, "fa-check");
      } else if (this.value != password.value && password.value.length >= 1) {
        remove_class(message, "fa-check");
        add_class(message, "fa-times");
      } else if (this.value.length == 0) {
        remove_class(message, "fa-check");
        remove_class(message, "fa-times");
      }
    });
  }
}

const create_admin = (username, password, adminId) => {
  const admin = Admin.adminStorage();

  let adminCheck = admin.findIndex((index) => index.adminId == adminId);

  if (admin[adminCheck]) {
    return;
  } else {
    const admin = new Admin(username, password, adminId);

    Admin.addAdmin(admin);
  }
};

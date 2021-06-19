"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ytScript = create_el("script");
var i,
    j,
    player,
    done = false;
ytScript.src = "https://www.youtube.com/iframe_api";

var onPlayerReady = function onPlayerReady(e) {
  e.target.playVideo();
};

var stopVideo = function stopVideo() {
  player.stopVideo();
};

var onPlayerStateChange = function onPlayerStateChange(e) {
  if (e.data == YT.PlayerState.PLAYING && !done) {
    stopVideo();
    done = true;
  }
};

var onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "DxIDKZHW3-E",
    playerVars: {
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
};

var loadQuote = function loadQuote() {
  match_media("only screen and (min-width: 992px)", 992, function match() {
    fetch("https://api.quotable.io/random?maxLength=100&?tags=faith,famous-quotes,friendship,future,happiness,inspirational,life,love,proverb,religion,success,wisdom").then(function (response) {
      return response.json();
    }).then(function (data) {
      return id("quote").innerHTML = data.content;
    }).then(function (data) {
      return console.log("Screen Min Width = 992px\nQuotes Character Length = ".concat(data.length, " characters"));
    });
  }, function unmatch() {
    fetch("https://api.quotable.io/random?maxLength=30&?tags=faith,famous-quotes,friendship,future,happiness,inspirational,life,love,proverb,religion,success,wisdom").then(function (response) {
      return response.json();
    }).then(function (data) {
      return id("quote").innerHTML = data.content;
    }).then(function (data) {
      return console.log("Screen Max Width = 991px\nQuotes Character Length = ".concat(data.length, " characters"));
    });
  });
};

var searchAdvice = function searchAdvice() {
  id("advice-ul").innerHTML = "";

  if (id("advice").value.length >= 2) {
    fetch("https://api.adviceslip.com/advice/search/".concat(id("advice").value)).then(function (response) {
      return response.json();
    }).then(function (data) {
      for (i = 0; i < data.slips.length; i++) {
        id("advice-ul").innerHTML += "<li class=\"mb-05\">".concat(data.slips[i].advice, "</li>");
      }
    })["catch"](function () {
      id("advice-ul").innerHTML += "No advice slips found matching that search term.";
    });
  }

  id("advice-form").reset();
};

function locationDetails(element) {
  var location = Location.locationStorage();
  id("user-location").innerHTML = "";
  id("user-location").innerHTML = "<li>Message : ".concat(location[element.id].message, "</li>\n<li>Phone Number : ").concat(location[element.id].number, "</li>\n<li>IP : ").concat(location[element.id].ipInfo[0].ip, "</li>\n<li>City : ").concat(location[element.id].ipInfo[0].city, "</li>\n<li>Country : ").concat(location[element.id].ipInfo[0].country, "</li>\n<li>Postal Code : ").concat(location[element.id].ipInfo[0].postal, "</li>\n<li>Region : ").concat(location[element.id].ipInfo[0].region, "</li>\n<li>Timezone : ").concat(location[element.id].ipInfo[0].timezone, "</li>");
}

function addWhiteList(element) {
  var location = Location.locationStorage();
  var whiteListPrompt = prompt('Are you sure in putting this in the whitelist?\nType "Y" for yes and "N" for no.', "Y"),
      whiteListAnswer = whiteListPrompt != null ? trim(whiteListPrompt.toLowerCase()) : console.clear();

  if (whiteListAnswer == "n") {
    return;
  } else {
    location[element.id].whiteList = true;
    localStorage.setItem("location", JSON.stringify(location));
    Location.list_location();
  }
}

function removeWhiteList(element) {
  var location = Location.locationStorage();
  var whiteListPrompt = prompt('Are you sure in removing this from the whitelist?\nType "Y" for yes and "N" for no.', "Y"),
      whiteListAnswer = whiteListPrompt != null ? trim(whiteListPrompt.toLowerCase()) : console.clear();

  if (whiteListAnswer == "n") {
    return;
  } else {
    location[element.id].whiteList = false;
    localStorage.setItem("location", JSON.stringify(location));
    Location.list_location();
  }
}

function delLocation(element) {
  var location = Location.locationStorage();
  var deletePrompt = prompt('Are you sure in deleting this?\nType "Y" for yes and "N" for no.', "N"),
      deleteAnswer = deletePrompt != null ? trim(deletePrompt.toLowerCase()) : console.clear();

  if (deleteAnswer == "y") {
    location.splice(element.id, 1);
    localStorage.setItem("location", JSON.stringify(location));
    Location.list_location();
  } else {
    return;
  }
}

var Location =
/*#__PURE__*/
function () {
  function Location(name, number, message, timeStamp) {
    _classCallCheck(this, Location);

    this.name = name;
    this.number = number;
    this.message = message;
    this.timeStamp = timeStamp;
    this.whiteList = false;
    this.ipInfo = [];
  }

  _createClass(Location, null, [{
    key: "locationStorage",
    value: function locationStorage() {
      var location;

      if (localStorage.getItem("location") === null) {
        location = [];
      } else {
        location = JSON.parse(localStorage.getItem("location"));
      }

      return location;
    }
  }, {
    key: "time_stamp",
    value: function time_stamp() {
      var today = new Date(),
          month = today.getMonth() < 10 ? "0".concat(today.getMonth() + 1) : today.getMonth() + 1,
          date = today.getDate() < 10 ? "0".concat(today.getDate()) : today.getDate(),
          dateFull = "".concat(month, "/").concat(date, "/").concat(today.getFullYear()),
          hour = today.getHours() < 10 ? "0".concat(today.getHours()) : today.getHours(),
          minute = today.getMinutes() < 10 ? "0".concat(today.getMinutes()) : today.getMinutes(),
          seconds = today.getSeconds() < 10 ? "0".concat(today.getSeconds()) : today.getSeconds(),
          timeFull = "".concat(hour, ":").concat(minute, ":").concat(seconds);
      return "".concat(dateFull, " - ").concat(timeFull);
    }
  }, {
    key: "send_location",
    value: function send_location(newLocation) {
      var location = Location.locationStorage();
      location.push(newLocation);
      localStorage.setItem("location", JSON.stringify(location));
    }
  }, {
    key: "list_location",
    value: function list_location() {
      var location = Location.locationStorage();
      id("sos-table").innerHTML = "";
      id("whitelist-table").innerHTML = "";

      for (i = 0; i < location.length; i++) {
        if (location[i].whiteList == false) {
          var tableRow = create_el("tr");
          tableRow.innerHTML = "<td>".concat(location[i].timeStamp, "</td>\n<td id=\"").concat(i, "\" onclick=\"locationDetails(this)\">").concat(location[i].name, "</td>\n<td><i id=\"").concat(i, "\" onclick=\"addWhiteList(this)\" class=\"far fa-plus-square\"></i></td>\n<td><i id=\"").concat(i, "\" onclick=\"delLocation(this)\" class=\"far fa-minus-square\"></i></td>");
          id("sos-table").appendChild(tableRow);
        } else {
          var _tableRow = create_el("tr");

          _tableRow.innerHTML = "<td>".concat(location[i].timeStamp, "</td>\n<td id=\"").concat(i, "\" onclick=\"locationDetails(this)\">").concat(location[i].name, "</td>\n<td><i id=\"").concat(i, "\" onclick=\"removeWhiteList(this)\" class=\"far fa-minus-square\"></i></td>\n<td><i id=\"").concat(i, "\" onclick=\"delLocation(this)\" class=\"far fa-minus-square\"></i></td>");
          id("whitelist-table").appendChild(_tableRow);
        }
      }
    }
  }]);

  return Location;
}();

var sendLocation = function sendLocation(name, number, message, timeStamp) {
  if (id("sos-name").value.length >= 3) {
    var newLocation = new Location(name, number, message, timeStamp);
    fetch("https://ipinfo.io/json?token=d17cf2c04985a8").then(function (response) {
      return response.json();
    }).then(function (data) {
      return newLocation.ipInfo.push(data);
    });
    setTimeout(function () {
      Location.send_location(newLocation);
    }, 2000);
    id("sos-form").reset();
    qsel(".selected").innerHTML = "Code";
  }
};

var Admin =
/*#__PURE__*/
function () {
  function Admin(username, password, adminId) {
    _classCallCheck(this, Admin);

    this.username = username;
    this.password = password;
    this.adminId = adminId;
  }

  _createClass(Admin, null, [{
    key: "adminStorage",
    value: function adminStorage() {
      var admin;

      if (localStorage.getItem("p-admin") === null) {
        admin = [];
      } else {
        admin = JSON.parse(localStorage.getItem("p-admin"));
      }

      return admin;
    }
  }, {
    key: "addAdmin",
    value: function addAdmin(adminAccount) {
      var admin = Admin.adminStorage();
      admin.push(adminAccount);
      localStorage.setItem("p-admin", JSON.stringify(admin));
    }
  }, {
    key: "login_admin",
    value: function login_admin(username, password) {
      var admin = Admin.adminStorage();
      var adminCheck = admin.findIndex(function (index) {
        return index.username == username;
      });

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
  }, {
    key: "password_match",
    value: function password_match(password, confirmPassword, message) {
      add_event(password, "keyup", function () {
        if (this.value == confirmPassword.value && this.value.length != 0) {
          remove_class(message, "fa-times");
          add_class(message, "fa-check");
        } else if (this.value != confirmPassword.value && confirmPassword.value.length >= 1) {
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
  }]);

  return Admin;
}();

var create_admin = function create_admin(username, password, adminId) {
  var admin = Admin.adminStorage();
  var adminCheck = admin.findIndex(function (index) {
    return index.adminId == adminId;
  });

  if (admin[adminCheck]) {
    return;
  } else {
    var _admin = new Admin(username, password, adminId);

    Admin.addAdmin(_admin);
  }
};
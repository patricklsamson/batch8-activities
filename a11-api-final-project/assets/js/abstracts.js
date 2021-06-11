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

class Location {
  constructor(name, number, message) {
    this.name = name;
    this.number = number;
    this.message = message;
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

  static send_location(newLocation) {
    const location = Location.locationStorage();

    location.push(newLocation);
    localStorage.setItem("location", JSON.stringify(location));
  }
}

const sendLocation = (name, number, message) => {
  if (id("sos-name").value.length >= 3) {
    const newLocation = new Location(name, number, message);

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

const ytScript = create_el("script");

let i,
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
            `Screen Min Width = 992px\nQuotes Character Length = ${data.length}`
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
            `Screen Max Width = 991px\nQuotes Character Length = ${data.length}`
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
          id("advice-ul").innerHTML += `<li class="mb-05">${data.slips[i].advice}</li>`;
        }
      })
      .catch((error) => {
        id("advice-ul").innerHTML +=
          "No advice slips found matching that search term.";
      });
  }

  id("advice-form").reset();
};

const randomAdvice = (e) => {
  id("advice-form").reset();
  id("advice-ul").innerHTML = "";
  add_class(id("advice-dice-btn"), "rolling");

  setTimeout(() => {
    remove_class(id("advice-dice-btn"), "rolling");

    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        id("advice-ul").innerHTML += `<p class="talign">${data.slip.advice}</p>`;
      });
  }, 500);

  remove_event(e.target || e.srcElement, "click", randomAdvice);

  setTimeout(() => {
    add_event(e.target || e.srcElement, "click", randomAdvice);
  }, 1000);
};

const $wordform = $("#submit-word");
let foundWords = new Set();
let score = 0;

$wordform.on("submit", async function (evt) {
  evt.preventDefault();

  word = $("#guess-word").val().toLowerCase();

  if (foundWords.has(word)) {
    displayMessage(`${word} already found`, "bad");
  } else {
    const response = await checkWord(word);
    handleWordResult(response, word);
  }

  clearFormInput();
});

async function checkWord(word) {
  const res = await axios.get("/check-word", { params: { word: word } });

  result = res.data;

  return res;
}

function handleWordResult(result, word) {
  switch (result.data) {
    case "ok":
      displayMessage(`Great find! ${word} added`, "good");
      foundWords.add(word);
      score += word.length;
      $("#score").text(score);
      $("#list").append(`<li>${word}</li>`);
      console.log("did word append?");
      break;

    case "not-on-board":
      displayMessage(`${word} isn't on this board`, "bad");
      break;

    case "not-word":
      displayMessage(`${word} isn't in the dictionary`, "bad");
      break;
  }
}

function clearFormInput() {
  $("#guess-word").val("");
}

function displayMessage(message, cls) {
  $("#messages").text(message).attr("class", cls);
}

//start timer on page load
$(window).load(countdown(20, endGame));

var timeoutHandle;

function countdown(seconds, stopFunction) {
  function tick() {
    var $counter = $("#timer");
    seconds--;
    $counter.html((seconds < 10 ? "0" : "") + String(seconds));
    if (seconds > 0) {
      timeoutHandle = setTimeout(tick, 1000);
    }

    if (seconds <= 0) {
      stopFunction();
    }
  }

  tick();
}

async function endGame() {
  // when time ends, replace input field with final score
  $wordform.html(`<p>Final Score: <em>${score}</em></p>`);

  const res = await axios.get("/end-game", { params: { score: score } });

  results = `<p>High Score: ${res.data.high_score}</p>
  <p>Games Played: ${res.data.game_plays}</p>`;
  $("#endGameResults").html(results);
}

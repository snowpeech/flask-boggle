const $wordform = $("#submit-word");
let word = "";

// listener for logging in. Will setup the user instance
$wordform.on("submit", async function (evt) {
  evt.preventDefault();

  // Run route to check if valid word
  word = $("#guess-word").val();
  console.log(word);
  const response = await checkWord(word);
  console.log(response);
  $("#guess-word").val("");
});

async function checkWord(word) {
  const res = await axios.get("/check-word", { params: { word: word } });

  result = res.data.result;
  console.log("JS:: result is", result);
  switch (result) {
    case "ok":
      console.log("ok");
      //word is real and in board
      alert(`Great find! ${word} added`);
      //need to check if it has already been guessed here too
      break;

    case "not-on-board":
      console.log("not on board");
      alert(`${word} isn't on this board`);
      break;

    case "not-word":
      console.log("not word");
      alert(`${word} isn't in the dictionary`);
      break;
  }

  return res;
}

// Shared across pages: who's currently answering.
const NAME_KEY = "breakfastToll_name";

function getPlayerName() {
  return localStorage.getItem(NAME_KEY) || "";
}

function setPlayerName(name) {
  localStorage.setItem(NAME_KEY, name);
}

import { display, welcomePage } from "./levelDisplay.js";
import { playButton, LEVEL_ARRAYS } from "./eventListeners.js";

init();
playButton();

console.log(LEVEL_ARRAYS[1][0]);

function init() {
  let starterPage = welcomePage();
  display("main", starterPage);
}

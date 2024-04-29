const COLORS = [
  "empty",
  "red",
  "yellow",
  "green",
  "dark_blue",
  "purple",
  "pink",
  "light_blue",
];

export function welcomePage() {
  let txt = `
    <header class="welcome_header">
        <h1 id="welcome">Welcome!</h1>
    </header>

    <div class="lets_play_div">
        <p id="lets_play">Let's play!</p>
    </div>
    `;
  return txt;
}

export function selectPage() {
  let txt = `
  <header class="select_level_header">
      <h1 id="select_level">Select level</h1>
      <a href="index.html" class="back">Back</a>
  </header>
  <div id="level_selector_menu">
    <div class="levels" id="select_1">
      <img src="kepek/lvl1.png" alt="level1" class="kep" />
    </div>
    <div class="levels" id="select_2">
      <img src="kepek/lvl2.png" alt="level1" class="kep" />
    </div>
    <div class="levels" id="select_3">
      <img src="kepek/lvl3.png" alt="level1" class="kep" />
    </div>
    <div class="levels" id="select_4">
      <img src="kepek/lvl4.png" alt="level1" class="kep" />
    </div>
  </div>
  `;
  return txt;
}

export function levelCompleted() {
  let txt = `
  <div class="level_completed" id="popup">
    <div class="overlay"></div>
    <div class="content">
      <h1>Congratulations!</h1>
      <div class="completed_buttons">
        <button class="restart_button">Restart!</button>
      </div>
    </div>
  </div>
  `;
  return txt;
}

export function continueButton() {
  return `<button class="continue_button">Continue!</button>`;
}

export function levels(lvl, numOfLvl) {
  let txt = `
  <header class="select_level_header">
    <h1 id="select_level">Level ${numOfLvl}</h1>
    <a class="back">Back</a>
  </header>
  <div id="level_div">
      <div class="level_grid">
  `;
  let id = 0;
  for (let i = 0; i < lvl.length; i++) {
    for (let j = 0; j < lvl[i].length; j++) {
      txt += `
        <div class="${COLORS[lvl[i][j]]} ${
        lvl[i][j] > 0 ? "starting_block" : ""
      }" id="${id}"></div>
      `;
      id++;
    }
  }

  txt += `
    </div>
    <div class="game_buttons">
        <button class="delete_button">X</button>
        <button class="restart_button"><img src="./kepek/refresh.png" style="width:33px"></button>
      </div>    
  </div>
  `;

  return txt;
}

export function display(parentElem, txt) {
  const PARENT_ELEM = $(parentElem);
  PARENT_ELEM.html(txt);
}

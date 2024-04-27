import {
  display,
  selectPage,
  levelCompleted,
  levels,
  continueButton,
} from "./levelDisplay.js";
import { LVL1, LVL2, LVL3, LVL4 } from "./levels.js";

export const LEVEL_ARRAYS = [
  [LVL1, 1],
  [LVL2, 2],
  [LVL3, 3],
  [LVL4, 4],
];

function selectMenuDisplay() {
  let txt = selectPage();
  display(".page", txt);
}

function displayLevels(lvl, numOfLvl) {
  let txt = levels(lvl, numOfLvl);
  display(".page", txt);
}

export function playButton() {
  const BUTTON = $("#lets_play");
  BUTTON.on("click", function () {
    selectMenuDisplay();
    everyLevelSelector();
  });
}

function everyLevelSelector() {
  selectLevels(LEVEL_ARRAYS[0][0], LEVEL_ARRAYS[0][1]);
  selectLevels(LEVEL_ARRAYS[1][0], LEVEL_ARRAYS[1][1]);
  selectLevels(LEVEL_ARRAYS[2][0], LEVEL_ARRAYS[2][1]);
  selectLevels(LEVEL_ARRAYS[3][0], LEVEL_ARRAYS[3][1]);
}

function selectLevels(arrayOfLvl, numOfLvl) {
  const BUTTON = $(`#select_` + numOfLvl);
  BUTTON.on("click", function () {
    individualLevel(arrayOfLvl, numOfLvl);
  });
}

function individualLevel(arrayOfLvl, numOfLvl) {
  displayLevels(arrayOfLvl, numOfLvl);
  const NUMBER_OF_COLORS = countColorsInLvl(arrayOfLvl, numOfLvl);
  backButton();
  blockChange(NUMBER_OF_COLORS, arrayOfLvl, numOfLvl);
}

function countColorsInLvl(lvl) {
  let counter = 0;
  const COUNT_ARR = [];
  for (let i = 0; i < lvl.length; i++) {
    for (let j = 0; j < lvl[i].length; j++) {
      if (COUNT_ARR.indexOf(lvl[i][j]) === -1) {
        counter++;
        COUNT_ARR.push(lvl[i][j]);
      }
    }
  }
  return counter - 1;
}

function backButton() {
  const BUTTON = $(".back");
  BUTTON.on("click", function () {
    selectMenuDisplay();
    everyLevelSelector();
  });
}

function completedButtons(button, arrayOfLvl, numOfLvl) {
  const BUTTON = $(button);
  BUTTON.on("click", function () {
    individualLevel(arrayOfLvl, numOfLvl);
  });
}

function blockChange(diffColorAmount, lvlArr, numOfLvl) {
  let selectedColor;
  const BLOCKS_COLORED = [];
  const EVERY_COLORS_COMPLETED = [];
  const LVL = $(".level_grid");
  const BLOCK = $(".level_grid > div");
  let flag = false;
  LVL.on("mouseup", function () {
    flag = false;
    selectedColor = undefined;
  });
  let starterClicked;
  BLOCK.on("mousedown", function (evt) {
    BLOCKS_COLORED.splice(0, BLOCKS_COLORED.length);
    flag = true;
    const CURRENT_BLOCK_CLASSES = BLOCK.eq(evt.target.id).attr("class");
    const CURRENT_BLOCK_CLASSES_ARR = CURRENT_BLOCK_CLASSES.split(" ");
    if (
      CURRENT_BLOCK_CLASSES_ARR[1] === "starting_block" &&
      !CURRENT_BLOCK_CLASSES_ARR.includes("completed")
    ) {
      selectedColor =
        BLOCK.eq(evt.target.id).attr("class").split(/\s+/)[0] + "_changed";
      starterClicked = evt.target.id;
    }
    console.log(selectedColor);
  });
  BLOCK.on("mouseover", function (evt) {
    const CURRENT_BLOCK = BLOCK.eq(evt.target.id);
    const CURRENT_BLOCK_CLASSES = BLOCK.eq(evt.target.id).attr("class");
    const CURRENT_BLOCK_CLASSES_ARR = CURRENT_BLOCK_CLASSES.split(" ");
    if (flag) {
      if (BLOCKS_COLORED.length === 0) {
        if (isAdjacent(evt.target.id, starterClicked)) {
          if (CURRENT_BLOCK_CLASSES_ARR.length > 1) {
            if (
              CURRENT_BLOCK_CLASSES_ARR[1] != "starting_block" &&
              !CURRENT_BLOCK_CLASSES_ARR[1].includes("_changed")
            ) {
              CURRENT_BLOCK.addClass(selectedColor);
              BLOCKS_COLORED.push(evt.target.id);
            }
          } else {
            CURRENT_BLOCK.addClass(selectedColor);
            BLOCKS_COLORED.push(evt.target.id);
          }
        }
      } else {
        let previousBlock = BLOCKS_COLORED[BLOCKS_COLORED.length - 1];
        if (isAdjacent(previousBlock, evt.target.id)) {
          console.log(CURRENT_BLOCK_CLASSES_ARR);
          if (CURRENT_BLOCK_CLASSES_ARR.length > 1) {
            if (CURRENT_BLOCK_CLASSES_ARR[1] != "") {
              if (
                CURRENT_BLOCK_CLASSES_ARR[1] != "starting_block" &&
                !CURRENT_BLOCK_CLASSES_ARR[1].includes("_changed")
              ) {
                CURRENT_BLOCK.addClass(selectedColor);
                BLOCKS_COLORED.push(evt.target.id);
              }
            } else {
              CURRENT_BLOCK.addClass(selectedColor);
              BLOCKS_COLORED.push(evt.target.id);
            }
          } else {
            CURRENT_BLOCK.addClass(selectedColor);
            BLOCKS_COLORED.push(evt.target.id);
          }
        }
      }
    }
  });
  BLOCK.on("mouseup", function (evt) {
    const PAGE = $(".page");
    let previousBlock = BLOCKS_COLORED[BLOCKS_COLORED.length - 1];
    const ONE_COLOR_COMPLETED = [];
    if (typeof selectedColor != "undefined") {
      if (
        (BLOCK.eq(evt.target.id).attr("class").split(" ")[0] + "_changed" !=
          selectedColor &&
          BLOCK.eq(evt.target.id).attr("class").split(" ")[1] !=
            "starting-block") ||
        Number(evt.target.id) === Number(starterClicked)
      ) {
        for (let index = 0; index < BLOCKS_COLORED.length; index++) {
          console.log("leszedett szín", selectedColor);
          BLOCK.eq(BLOCKS_COLORED[index]).removeClass(selectedColor);
        }
      } else if (isAdjacent(previousBlock, evt.target.id)) {
        for (let index = 0; index < BLOCKS_COLORED.length; index++) {
          ONE_COLOR_COMPLETED.push(BLOCKS_COLORED[index]);
        }
        EVERY_COLORS_COMPLETED.push(ONE_COLOR_COMPLETED);
        console.log("sikeres");
        console.log(ONE_COLOR_COMPLETED);
        BLOCK.eq(starterClicked).addClass("completed");
        BLOCK.eq(evt.target.id).addClass("completed");
        if (EVERY_COLORS_COMPLETED.length === diffColorAmount) {
          PAGE.append(levelCompleted);
          completedButtons(".restart_button", lvlArr, numOfLvl);
          if (!(LEVEL_ARRAYS.length == numOfLvl)) {
            const BUTTONS = $(".completed_buttons");
            BUTTONS.append(continueButton);
            completedButtons(
              ".continue_button",
              LEVEL_ARRAYS[Number(numOfLvl)][0],
              Number(numOfLvl + 1)
            );
          }
        }
      } else {
        for (let index = 0; index < BLOCKS_COLORED.length; index++) {
          console.log("leszedett szín", selectedColor);
          BLOCK.eq(BLOCKS_COLORED[index]).removeClass(selectedColor);
        }
      }
    }
    selectedColor = undefined;
  });
}

function isAdjacent(lastAdded, next) {
  let adjacent =
    Number(lastAdded) === Number(next) + 1 ||
    Number(lastAdded) === Number(next) - 1 ||
    Number(lastAdded) === Number(next) + 6 ||
    Number(lastAdded) === Number(next) - 6;
  return adjacent;
}

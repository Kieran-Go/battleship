// Imported styles
import "./css/normalize.css";
import "./css/styles.css";

// Imported media

// Imported scripts
const setupGame = require("./scripts/setupGame");
const Player = require("./classes/player");

// Create player one
const playerOne = new Player();

// Event listener for the play button
const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", () => {
    // Determine if the player is playing agains another player
    const vsPlayer = (document.querySelector("select").value === "player") ? true : false;

    // Set up the game
    setupGame(vsPlayer).init(playerOne);
});
// Imported styles
import "./css/normalize.css";
import "./css/styles.css";

// Imported media

// Imported scripts
const setupPlayer = require("./scripts/setupPlayer");

const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", () => {
    // Determine if the player is playing agains another player
    const playerVsPlayer = (document.querySelector("select").value === "player") ? true : false;

    // Set up the first player
    setupPlayer(1, playerVsPlayer).init();
});
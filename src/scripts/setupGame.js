const Player = require("../classes/player");
const playGame = require("./playGame");
const { newElement, newImg, newInput, newLabel } = require("./domUtility");


const setupGame = (vsPlayer = false) => {
    // Shorthand for the content div
    const content = document.querySelector(".content");

    // Array for players
    const players = [];

    const init = (player) => {
        // First, clear the page of all content
        clearPage();

        // Randomize the player
        player.gameboard.randomize();

        // Show the settings for the player
        displaySettingsButtons(player);

        // Show the player's gameboard during setup
        showGameboard(player);
    };

    // Clears all html inside the content div container
    const clearPage = () => {
        content.innerHTML = "";
    };

    // Creates a new gameboard div element from the player's gameboard data and adds it to the DOM
    const showGameboard = (player) => {

        // If a gameboard element exists, delete it
        if(document.querySelector(".gameboard") != null) document.querySelector(".gameboard").remove();

        // Create the gameboard element
        const gb = newElement("div", null, null, ["gameboard"]);

        // Iterate through each cell in the player's gameboard
        for(let y = 0; y < player.gameboard.board.length; y++) {
            for(let x = 0; x < player.gameboard.board[y].length; x++){
                // Create the cell element
                const cell = newElement("div", null, `${y}:${x}`, ["cell"]);

                // Check if cell is occupied by a ship
                if(player.gameboard.cellIsOccupied(x,y)) cell.classList.add("occupied");

                // Append the cell to the gameboard
                gb.appendChild(cell);
            }
        }

        // Append to content div
        content.appendChild(gb);
    };

    // Initializes settings for the player
    const displaySettingsButtons = (player) => {
        // Heading
        content.appendChild(newElement("h2", `${player.name}'s Ships`));

        // Container
        const container = newElement("div", null, null, ["setupContainer"]);

        // Continue and randomize buttons
        const continueBtn = newElement("button", "CONTINUE", null, ["continueBtn"]);
        const randomizeBtn = newElement("button", "RANDOMIZE SHIPS", null, ["randomizeBtn"]);

        // Event listener for the randomize button
        randomizeBtn.addEventListener("click", () => {
            player.gameboard.randomize();
            showGameboard(player);
        });

        // Event listener for the continue button
        continueBtn.addEventListener("click", () => {

            // Push player to the players array
            players.push(player);

            // If the array has less than two players
            if(players.length < 2) {
                // Setup player depending on if the opponent is human or not
                if(vsPlayer) init(new Player("Player 2"));
                else init(new Player("Computer", "computer"));
            }
            // If the array has two players, start the game
            else{
                clearPage();
                startGame();
            }
        });

        // Append elements to content
        container.appendChild(continueBtn);
        container.appendChild(randomizeBtn);
        content.appendChild(container);
    };

    function startGame() {
        playGame(players).init();
    }

    return {init};
};
module.exports = setupGame;
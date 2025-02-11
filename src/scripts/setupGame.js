const Ship = require("../classes/ship");
const Gameboard = require("../classes/gameboard");
const Player = require("../classes/player");
const { newElement, newImg, newInput, newLabel } = require("./domUtility");


const setupGame = (playerVsPlayer = false) => {
    const content = document.querySelector(".content");

    // Keep track of the players globally
    let pOne = null;
    let pTwo = null;

    const init = (player) => {
        // First, clear the page of all content
        clearPage();

        // Randomize the player
        player.gameboard.randomize();

        // If the player is a human
        if(player.type !== "computer"){
            // Show the settings buttons for the player
            displaySettingsButtons(player);

            // Display the player's gameboard
            showGameboard(player);
        }
        // If the player is a computer, it means we've finished setting up for two players. Start the game
        else{
            pTwo = player;
            startGame();
        }
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

                // Check if cell is occupied by a ship and has been hit or missed
                if(player.gameboard.cellIsOccupied(x,y)) cell.classList.add("occupied");
                else{
                    const cellStatus = player.gameboard.getCell(x, y);
                    if(cellStatus !== null){
                        cell.classList.add(cellStatus);
                    }
                }

                // Append the cell to the gameboard
                gb.appendChild(cell);
            }
        }

        // Append to content div
        content.appendChild(gb);
    };

    // Initializes the display settings for the player
    const displaySettingsButtons = (player) => {
        // Heading
        content.appendChild(newElement("h2", `${player.name}'s Ships`));
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
            // If player is player 1
            if(player.name === "Player 1"){
                pOne = player;
                // Check if we're going up against another player or a computer, and initialize them accordingly
                if(playerVsPlayer) init(new Player("Player 2"));
                else init(new Player("Computer", "computer"));
            }
            // If not player 1, it means we have finished setting up two players. Time to start the game
            else{
                clearPage();
                pTwo = player;
                startGame();
            }

        });

        // Append elements to content
        container.appendChild(continueBtn);
        container.appendChild(randomizeBtn);
        content.appendChild(container);
    };

    function startGame() {
        const players = [pOne, pTwo];
        console.log(players);
    }

    return {init};
};
module.exports = setupGame;
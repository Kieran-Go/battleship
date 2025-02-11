const Ship = require("../classes/ship");
const Gameboard = require("../classes/gameboard");
const Player = require("../classes/player");
const { newElement, newImg, newInput, newLabel } = require("./domUtility");


const setupPlayer = (player, playerVsPlayer = false) => {

    const init = () => {
        // First, clear the page of all content
        clearPage();

        // Create the first player
        const playerOne = new Player();
        playerOne.gameboard.addShip(0,0,3,"x");
        playerOne.gameboard.receiveAttack(0,0);
        playerOne.gameboard.receiveAttack(1,0);
        // playerOne.gameboard.receiveAttack(2,0);
        playerOne.gameboard.receiveAttack(3,0);

        // Display the new player's gameboard
        showGameboard(playerOne);


    };

    // Clears all html inside the content div container
    const clearPage = () => {
        document.querySelector(".content").innerHTML = "";
    };

    // Creates a new gameboard div element from the player's gameboard data and adds it to the DOM
    const showGameboard = (player) => {
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
        document.querySelector(".content").appendChild(gb);
    };

    

    return {init};
};

module.exports = setupPlayer;
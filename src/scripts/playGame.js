const { newElement, newImg, newInput, newLabel } = require("./domUtility");

const playGame = (players) => {
    // Shorthand for content div
    const content = document.querySelector(".content");

    // Track which player's turn it is
    let activePlayer = players[0]; // Player 1 goes first

    // Wait variable to avoid the player making multiple moves in one turn
    let waitingForNextRound = false;
    const waitTime = 1500;
    const firingTime = 1500;

    // When true, game has ended
    let gameEnded = false;

    // Fixed position text displaying the last attack's result (hidden by default)
    attackStatus = newElement("h2", "Hit!", null, ["attackStatus"]);
    content.appendChild(attackStatus);

    const init = () => {
        createGameboards();
    };

    // Create each player's board and add to the DOM
    const createGameboards = () => {
        // Header saying which player's turn it is or who the winner was
        content.appendChild(newElement("h2", `${activePlayer.name}'s Turn`, null, ["gameStatus"]));

        const container = newElement("div", null, null, ["gameContainer"]);

        // Iterate through all cells in both gameboards
        for(let i = 0; i < players.length; i++){
            const gb = newElement("div", null, `gameboard${i}`, ["gameboard"]);

            // Iterate through the columns
            for(let y = 0; y < players[i].gameboard.board.length; y++){

                // Iterate through each row of the column
                for(let x = 0; x < players[i].gameboard.board[y].length; x++) {
                    // Create the new cell element
                    const cell = newElement("div", null, `${y}:${x}`, ["cell"]);
                    initCellClickEvent(cell); // Initialize the click event for the cell
                    gb.appendChild(cell);
                }
            }
            container.appendChild(gb);
            
        }
        content.appendChild(container);

        // Initialize player 1's board as disabled
        document.querySelector("#gameboard0").classList.add("disabled");

    };

    // Click event for a cell on a gameboard
    const initCellClickEvent = (cell) => {
        cell.addEventListener("click", () => {
            // Prevent multiple clicks per round, or firing when the game has ended
            if(waitingForNextRound || gameEnded) return;

            // If it is the computer's turn, no clicking allowed
            if(activePlayer.type === "computer") return;

            // Get coordinates of the cell using the cell element's id
            const coordinates =  convertCellIdToCoordinates(cell);

            // Attempt to fire
            fire(coordinates[0], coordinates[1]);
        });
    };

    // Returns an array of coordinates based on a cell element's id
    const convertCellIdToCoordinates = (cell) => {
        // Get the id of the cell, which is in the form "y:x"
        const id = cell.id;
        
        // Split the id to get y and x
        const [y, x] = id.split(":").map(Number);
        
        // Return the coordinates as [x, y]
        return [x, y];
    };

    // Attempt to fire a shot at the given coordinates
    const fire = (x, y) => {
        // Track if a move has already been made
        let moveMade = false;

        // Get the player who's turn it isn't
        const inactivePlayer = getInactivePlayer();

        // Attempt an attack
        const attackResult = inactivePlayer.gameboard.receiveAttack(x,y);
        console.log(attackResult);

        // If attackResult is one of these three, it means a valid move has been made
        if(attackResult === "Miss" || attackResult === "Hit" || attackResult === "All ships sunk"){
            // Update and show attack status
            updateAttackStatus("Firing...");
            showAttackStatus();

            // Play the firing sfx
            playSFX("Fire");

            setTimeout(() =>{
                // Determine the correct gameboard
                const boardId = inactivePlayer === players[0] ? "gameboard0" : "gameboard1";

                // Get the cell element of the hit cell
                const cell = document.querySelector(`#${boardId} [id='${y}:${x}']`);

                // If hit or miss, set the cell element's class accordingly
                if(attackResult === "Miss") {cell.classList.add("miss"); playSFX(attackResult); moveMade = true;}
                else if(attackResult === "Hit") {cell.classList.add("hit"); playSFX(attackResult); moveMade = true;}

                // If all ships have sunk, the game is over
                else {
                    cell.classList.add("hit");
                    endGame(activePlayer);
                }

                // If a valid move was made, wait a short moment, then change who's turn it is
                if(moveMade) {
                    // Update attack status
                    updateAttackStatus(attackResult + "!");
                    waitingForNextRound = true;
                    setTimeout(() => {
                        hideAttackStatus();
                        nextRound();
                        waitingForNextRound = false;
                    }, waitTime);
                }
            }, firingTime);
            
        }
        else return;
    };

    const updateAttackStatus = (result) => {
        // Update attackStatuselement and show it
        attackStatus.textContent = result; // Update text
    };
    const showAttackStatus = () => {
        attackStatus.style.display = "block"; // Show element
    };
    const hideAttackStatus = () => {
        attackStatus.style.display = "none"; // hide element
    };

    // Plays a sound effect
    const playSFX = (sfx) => {
        // const path = `../media/sound/${sfx}.mp3;`;
        const path = "http://localhost/path/to/media/sound/" + sfx + ".mp3";
        console.log(path);
        const audio = new Audio(path);
        
        audio.play().catch(error => {
            console.error("Error playing sound:", error);
        });
    };
    

    // Ends the game and displays the winner
    const endGame = (winner) => {
        document.querySelector("#gameboard0").classList.remove("disabled");
        document.querySelector("#gameboard1").classList.remove("disabled");
        document.querySelector(".gameStatus").textContent = `Game over! ${winner.name} wins!`;

        revealShips();
        gameEnded = true;
    };

    // Show all ships on each gameboard
    const revealShips = () => {
        // Iterate through all cells in both gameboards
        for(let i = 0; i < players.length; i++){

            // Iterate through the columns
            for(let y = 0; y < players[i].gameboard.board.length; y++){

                // Iterate through each row of the column
                for(let x = 0; x < players[i].gameboard.board[y].length; x++) {

                    // Get the cell
                    let cell = players[i].gameboard.board[y][x];
                    // If cell is not null or "miss", it means a ship is there
                    if(cell !== null && cell !== "miss") {

                        // Determine the correct gameboard, get the cell element, and add the 'occupied' class to the element
                        const boardId = players[i] === players[0] ? "gameboard0" : "gameboard1";
                        const cell = document.querySelector(`#${boardId} [id='${y}:${x}']`);
                        cell.classList.add("occupied");
                    }
                }
            }
        }
    };

    // Switch which player's turn it is and adjust gameboard classes accordingly
    const nextRound = () => {
        // Switch player turns
        const inactivePlayer = getInactivePlayer();
        activePlayer = inactivePlayer;

        // Adjust gameboard classes accordingly
        if(activePlayer === players[0]){
            document.querySelector("#gameboard1").classList.remove("disabled");
            document.querySelector("#gameboard0").classList.add("disabled");
        }
        else{
            document.querySelector("#gameboard0").classList.remove("disabled");
            document.querySelector("#gameboard1").classList.add("disabled");
        }

        // Display a header saying who's turn it is
        document.querySelector("h2").textContent = `${activePlayer.name}'s Turn`;

        // If the currently active player is a computer, their move is taken automatically
        if(activePlayer.type === "computer") computerMakeMove();
    };

    // Automatically play a move for computer players
    const computerMakeMove = () => {
        // Not done yet
    };

    // Returns the player who's turn it isn't
    const getInactivePlayer = () => {
        if(activePlayer === players[0]) return players[1];
        else return players[0];
    };


    return {init};
};
module.exports = playGame;
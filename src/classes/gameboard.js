const Ship = require("./ship");

class Gameboard {
    constructor() {
        // Initialize 10x10 gameboard using a 2D array
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
    }

    // Add a new ship to the given coordinates
    addShip(x, y, length, dir) {
        // Error handling for invalid coordinates
        if (dir === "x" && x + length > 10) {console.log("Error: Ship exceeds grid boundaries horizontally"); return -1;}
        if (dir === "y" && y + length > 10) {console.log("Error: Ship exceeds grid boundaries vertically"); return -1;}

        // Error handling for invalid direction
        if (dir !== "x" && dir !== "y") {console.log("Error: dir must be 'x' or 'y'"); return -1;}

        // Error handling for overlapping ships
        for (let i = 0; i < length; i++) {
            const checkX = dir === "x" ? x + i : x;
            const checkY = dir === "y" ? y + i : y;
            if (this.board[checkY][checkX] !== null) {console.log("Error: Ship overlaps with another ship"); return -1;}
        }

        // Add the new ship to the ships array
        this.ships.push(new Ship(length, dir));

        // Set coordinates on the board
        this.placeShipOnBoard(x, y, length, dir, this.ships.length - 1);

        // Return the ship coordinates
        return {
            ship: this.ships.length - 1,
            x: dir === "x" ? `${x}-${x + length - 1}` : `${x}`,
            y: dir === "y" ? `${y}-${y + length - 1}` : `${y}`,
        };
    }

    // Helper function: Places the ship on the board
    placeShipOnBoard(x, y, length, dir, shipIndex) {
        for (let i = 0; i < length; i++) {
            const currentX = dir === "x" ? x + i : x;
            const currentY = dir === "y" ? y + i : y;
            this.board[currentY][currentX] = this.ships[shipIndex];
        }
    }

    // Add all ships to the board in random locations
    randomize() {
        // Clear the board
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];

        const newShips = [
            {x: 0, y: 0, length:5, dir: "x"}, // Carrier
            {x: 0, y: 0, length:4, dir: "x"}, // Battleship
            {x: 0, y: 0, length:3, dir: "x"}, // Cruiser
            {x: 0, y: 0, length:3, dir: "x"}, // Submarine
            {x: 0, y: 0, length:2, dir: "x"}, // Destroyer
        ];

        // Randomize directions
        for(let i = 0; i < newShips.length; i++){
            newShips[i].dir = (Math.random() < 0.5) ? "x" : "y";
        };

        // Keep randomizing the coordinates of each ship until a valid position is found
        for(let i = 0; i < newShips.length; i++) {
            const ship = newShips[i];
            let positionFound = false;
            while(!positionFound) {
                ship.x = Math.floor(Math.random() * 10);
                ship.y = Math.floor(Math.random() * 10);
                const newPosition = this.addShip(ship.x, ship.y, ship.length, ship.dir);
                if(newPosition !== -1) positionFound = true;
            }
        }
    }

    // Returns the value of the given cell ("hit", "miss", occupied by a ship or null)
    getCell(x, y) {
        return this.board[y][x];
    }

    // Return true if cell is occupied by a ship. If the cell is not null, hit or miss, that means it is occupied.
    cellIsOccupied(x,y) {
        if(this.board[y][x] !== null && this.board[y][x] !== "hit" && this.board[y][x] !== "miss") return true;
        return false;
    }

    receiveAttack(x, y) {
        // Check if these coordinates have already been hit
        if (this.board[y][x] === "hit" || this.board[y][x] === "miss") {
            return "Coordinates already hit";
        }
    
        // Check if these coordinates contain a ship
        if (this.board[y][x] !== null) {
            const ship = this.board[y][x];
            ship.hit();
    
            // Set this coordinate to "hit" after the ship was hit
            this.board[y][x] = "hit";
    
            // If this ship has sunk, remove it from the ships array
            if (ship.isSunk()) {
                for (let i = 0; i < this.ships.length; i++) {
                    if (ship.id === this.ships[i].id) {
                        this.ships.splice(i, 1);
                        console.log(this.ships);
                        break;
                    }
                }
            }
    
            // Check if any ships are left
            if (this.allShipsSunk()) {
                return "All ships sunk";
            } else {
                return "Hit";
            }
        } else {
            // If it's a miss, set the board position to "miss"
            this.board[y][x] = "miss";
            return "Miss";
        }
    }
    
    allShipsSunk() {
        return this.ships.length < 1;
    }
}
module.exports = Gameboard;
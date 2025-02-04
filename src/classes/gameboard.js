const Ship = require("./ship");

class Gameboard {
    constructor() {
        // Initialize 10x10 gameboard as an array with 10 'rows'
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
    }

    addShip(x, y, length, dir) {
        // Error handling for invalid coordinates
        if (dir === "x" && x + length > 10) {
            return "Error: Ship exceeds grid boundaries horizontally";
        }
        if (dir === "y" && y + length > 10) {
            return "Error: Ship exceeds grid boundaries vertically";
        }

        // Error handling for invalid direction
        if (dir !== "x" && dir !== "y") {
            return "Error: dir must be 'x' or 'y'";
        }

        // Error handling for overlapping ships
        for (let i = 0; i < length; i++) {
            const checkX = dir === "x" ? x + i : x;
            const checkY = dir === "y" ? y + i : y;
            if (this.board[checkY][checkX] !== null) {
                return "Error: Ship overlaps with another ship";
            }
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
const Ship = require("./ship");
const Gameboard = require("./gameboard");

class Player {
    constructor(_name = "Player 1", _type = "player"){
        this.name = _name;
        this.type = _type;
        this.gameboard = new Gameboard();
    }
}

module.exports = Player;
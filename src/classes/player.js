const Ship = require("./ship");
const Gameboard = require("./gameboard");

class Player {
    constructor(_type = "player"){
        this.type = _type;
        this.gameboard = new Gameboard();
    }
}

module.exports = Player;
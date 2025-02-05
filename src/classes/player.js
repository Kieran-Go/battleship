const Ship = require("./ship");
const Gameboard = require("./gameboard");

class Player {
    constructor(_name = "Player", _type = "player"){
        this.name = _name;
        this.type = _type;
        this.gb = new Gameboard();
    }
}
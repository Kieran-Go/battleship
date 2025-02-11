class Ship {
    // Auto-incrementing ID
    static id = 0;

    // Constructor
    constructor(_length = 1, _dir = "x") {
        this.id = ++this.constructor.id;
        this.length = _length,
        this.dir = _dir,
        this.timesHit = 0;
    }

    // Increment times hit if the ship has not sunk
    hit() {
        if(!this.isSunk()) this.timesHit++;
        return this.timesHit;
    }

    // If times hit is equal to or greater than length, it means the ship has sunk
    isSunk() {
        return this.timesHit >= this.length;
    }
}

module.exports = Ship;
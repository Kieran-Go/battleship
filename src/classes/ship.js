class Ship {
    constructor(_length = 1, _dir = "x") {
        this.length = _length,
        this.dir = _dir,
        this.timesHit = 0;
    }

    hit() {
        if(this.timesHit < this.length) this.timesHit++;
        return this.timesHit;
    }

    isSunk() {
        return this.timesHit >= this.length;
    }
}

module.exports = Ship;
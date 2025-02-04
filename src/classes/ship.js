class Ship {
    static id = 0;
    constructor(_length = 1, _dir = "x") {
        this.id = ++this.constructor.id;
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
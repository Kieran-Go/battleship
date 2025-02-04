const Ship = require("./ship");
const Gameboard = require("./gameboard");

// Add Ship function
test("create a new ship horizontally", () => {
    const gb = new Gameboard();
    expect(gb.addShip(0, 0, 3, "x")).toEqual({
        ship: 0,
        x: "0-2",
        y: "0"
    });
});

test("create a new ship vertically", () => {
    const gb = new Gameboard();
    expect(gb.addShip(5, 5, 4, "y")).toEqual({
        ship: 0,
        x: "5",
        y: "5-8"
    });
});

test("overlap a ship", () => {
    const gb = new Gameboard();
    gb.addShip(5, 5, 4, "y");
    expect(gb.addShip(4, 6, 3, "x")).toBe("Error: Ship overlaps with another ship");
});

test("Exceed gameboard boundaries horizontally", () => {
    const gb = new Gameboard();
    expect(gb.addShip(9, 0, 3, "x")).toBe("Error: Ship exceeds grid boundaries horizontally");
});

test("Exceed gameboard boundaries vertically", () => {
    const gb = new Gameboard();
    expect(gb.addShip(9, 9, 3, "y")).toBe("Error: Ship exceeds grid boundaries vertically");
});

// Recieve Attack function
describe("Gameboard", () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test("should register a hit on a ship", () => {
        gameboard.addShip(1, 1, 3, "x");
        const attackResult = gameboard.receiveAttack(1, 1);

        expect(gameboard.board[1][1]).toBe("hit");
        expect(gameboard.ships[0].timesHit).toBe(1);
        expect(attackResult).toBe("Hit");
    });

    test("should register a miss", () => {
        gameboard.addShip(1, 1, 3, "x");
        const attackResult = gameboard.receiveAttack(5, 5);

        expect(gameboard.board[5][5]).toBe("miss");
        expect(attackResult).toBe("Miss");
    });

    test("should return error message for already hit coordinates", () => {
        gameboard.addShip(1, 1, 3, "x");
        gameboard.receiveAttack(1, 1);

        const attackResult = gameboard.receiveAttack(1, 1);

        expect(attackResult).toBe("Coordinates already hit");
    });

    test("should sink the ship after enough hits and remove it", () => {
        gameboard.addShip(1, 1, 3, "x");
        gameboard.receiveAttack(1, 1);
        gameboard.receiveAttack(2, 1);
        
        const attackResult = gameboard.receiveAttack(3, 1);

        expect(gameboard.ships.length).toBe(0);
        expect(attackResult).toBe("All ships sunk");
    });
});

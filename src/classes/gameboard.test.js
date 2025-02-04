const Ship = require("./ship");
const Gameboard = require("./gameboard");

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
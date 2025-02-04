const Ship = require('./ship');

test("increases the number of 'hits' in a ship", () => {
    const ship = new Ship(3);
    expect(ship.hit()).toBe(1);
});

test("does not allow over-hitting", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.hit()).toBe(1); // Shouldn't increase past length
});

test("returns false when ship is not sunk", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBeFalsy(); // Should be false after 1 hit
});

test("returns true when ship is sunk", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy(); // Should be true after 3 hits
});

const { Room, Booking } = require("./index.js");



describe("Comprobar que una habitación está ocupada", () => {
  test("Devolverá true si la habitación está ocupada en la fecha indicada", () => {
    const room = new Room("single bed", [], 100, 50);
    const booking1 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      new Date("2023-04-10"),
      new Date("2023-04-18"),
      50,
      room
    );
    const booking2 = new Booking(
      "maria",
      "maria@yahoo.com",
      new Date("2023-06-12"),
      new Date("2023-06-18"),
      20,
      room
    );
    room.bookings = [booking1, booking2];
    expect(room.isOccupied(new Date("2023-04-12"))).toBe(true);
    expect(room.isOccupied(new Date("2023-06-12"))).toBe(true);
  });
  test("Devolverá false si la habitación está ocupada en la fecha indicada", () => {
    const room = new Room("single bed", [], 100, 50);
    const booking1 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      new Date("2023-04-10"),
      new Date("2023-04-18"),
      50,
      room
    );
    const booking2 = new Booking(
      "maria",
      "maria@yahoo.com",
      new Date("2023-06-12"),
      new Date("2023-06-18"),
      20,
      room
    );
    room.bookings = [booking1, booking2];
    expect(room.isOccupied(new Date("1999-04-12"))).toBe(false);
    expect(room.isOccupied(new Date("1999-06-12"))).toBe(false);


  });
});

// occupancyPercentage
describe("Comprobar el porcentaje de ocupación dado una habitación y un rango de fechas", () => {
  test("Devolverá el 50% de noches ocupadas cuando la mitad de noches estan ocupadas", () => {
    const room = new Room("single bed", [], 100, 50);
    const booking = new Booking(
      "maria",
      "maria@yahoo.com",
      new Date("2023-04-04"),
      new Date("2023-04-08"),
      20,
      room
    );
    room.bookings = [booking];
    // Caso de prueba 1: Sin reservas en el rango de fechas
    const startDate = new Date("2023-04-07");
    const endDate = new Date("2023-04-10");

    expect(room.occupancyPercentage(startDate, endDate)).toBe(50);

  });
  test("Devolverá el 100% cuando todas las noches estan ocupadas", () => {
    const room = new Room("single bed", [], 100, 50);
    // Caso de prueba 2: Reservas que cubren todo el rango de fechas
    const startDate = new Date("2023-04-10");
    const endDate = new Date("2023-04-18");
    const booking = new Booking(
      "luisa",
      "luisa@yahoo.com",
      startDate,
      endDate,
      50,
      room
    );
    room.bookings = [booking];

    expect(room.occupancyPercentage(startDate, endDate)).toBe(100);
  });
  test("Devolverá el 0% cuando ninguna noche este ocupada", () => {
    const room = new Room("single bed", [], 100, 50);
    // Caso de prueba 2: Reservas que cubren todo el rango de fechas
    const startDate = new Date("1999-04-10");
    const endDate = new Date("1999-04-18");
    const booking = new Booking(
      "luisa",
      "luisa@yahoo.com",
      new Date("2023-03-08"),
      new Date("2023-04-08"),
      50,
      room
    );
    room.bookings = [booking];

    expect(room.occupancyPercentage(startDate, endDate)).toBe(0);
  });
});

//totalOccupancyPercentage
describe("Comprobar el porcentaje total de ocupación", () => {
  test("Devolverá el 100% si todas las noches estan ocupadas", () => {
    const room1 = new Room("single bed", [], 100, 50);
    const room2 = new Room("double bed", [], 150, 30);
    const rooms = [room1, room2];
    const startDate = new Date("2023-04-12");
    const endDate = new Date("2023-04-15");
  

    expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(100);
  });
});
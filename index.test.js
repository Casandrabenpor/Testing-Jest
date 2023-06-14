const { Room, Booking } = require("./index.js");
//isOccupied
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
    const booking1 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      startDate,
      endDate,
      50,
      room1
    );
    const booking2 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      new Date("2023-04-10"),
      new Date("2023-04-20"),
      50,
      room2
    );
    room1.bookings = [booking1];
    room2.bookings = [booking2];

    expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(100);
  });
  test("Devolverá el 0% cuando ninguna noche este ocupada", () => {
    const room1 = new Room("single bed", [], 100, 50);
    const room2 = new Room("double bed", [], 150, 30);
    const rooms = [room1, room2];
    const startDate = new Date("2023-01-12");
    const endDate = new Date("2023-01-15");
    const booking1 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      new Date("2023-04-10"),
      new Date("2023-04-20"),
      50,
      room1
    );
    const booking2 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      new Date("2023-04-10"),
      new Date("2023-04-20"),
      50,
      room2
    );
    room1.bookings = [booking1];
    room2.bookings = [booking2];

    expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(0);
  });
  test("Devolverá el 50% cuando ninguna noche este ocupada", () => {
    const room1 = new Room("single bed", [], 100, 50);
    const room2 = new Room("double bed", [], 150, 30);
    const rooms = [room1, room2];
    const startDate = new Date("2023-01-07");
    const endDate = new Date("2023-01-10");
    const booking1 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      new Date("2023-01-07"),
      new Date("2023-01-10"),
      50,
      room1
    );
    const booking2 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      new Date("2023-02-04"),
      new Date("2023-02-08"),
      50,
      room2
    );
    room1.bookings = [booking1];
    room2.bookings = [booking2];

    expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(50);
  });
});
//availableRooms
describe("Comprobar la disponibiladad de habitaciones", () => {
  test("Devuelve un array de habitaciones no ocupadas durante toda la duración", () => {
    const room1 = new Room("single bed", [], 100, 50);
    const room2 = new Room("double bed", [], 150, 30);
    const rooms = [room1, room2];
    const startDate = new Date("2023-04-12");
    const endDate = new Date("2023-04-15");
    const booking1 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      startDate,
      endDate,
      50,
      room1
    );
    const booking2 = new Booking(
      "luisa",
      "luisa@yahoo.com",
      new Date("2023-04-10"),
      new Date("2023-04-20"),
      50,
      room2
    );
    room1.bookings = [booking1];
    room2.bookings = [booking2];

    expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(0);
  });
});





//getFee

describe("Comprobar la tarifa total de un booking", () => {
  test("Devolverá la tarifa valor por noche con un -20% y -20% de booking", () => {
    const room = new Room("single bed", [], 100, 20);
    const booking = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date('2023-06-01'),
      new Date('2023-06-06'),
      20,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(320);
  });
  test("Devolverá la tarifa valor por noche cuando ambos descuentos sean 0", () => {
    const room = new Room("single bed", [], 100, 0);
    const booking = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date('2023-06-01'),
      new Date('2023-06-06'),
      0,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(500);
  });
  test("Devolverá la tarifa valor por noche con un -25% y -10% de booking", () => {
    const room = new Room("single bed", [], 100, 25);
    const booking = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date('2023-06-01'),
      new Date('2023-06-05'),
      10,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(270);
  });
  test("Devolverá la tarifa valor por noche con un -50% y -10% de booking", () => {
    const room = new Room("single bed", [], 300, 50);
    const booking = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date('2023-06-01'),
      new Date('2023-06-05'),
      10,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(540);
  });
  test("Devolverá la tarifa valor por noche con un 30% y -0% de booking", () => {
    const room = new Room("single bed", [], 300, 30);
    const booking = new Booking(
      "marta",
      "marta@yahoo.com",
      new Date('2023-06-01'),
      new Date('2023-06-05'),
      0,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(840);
  });
});
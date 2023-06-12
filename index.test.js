const { Room , Booking }  = require ("./index.js");



describe("Comprobar que una habitación está ocupada", () => {
    test("Devolverá true si la habitación está ocupada en la fecha indicada", () => {
      const room = new Room("single bed", [], 100, 50);
      const booking1 = new Booking(
        "luisa",
        "luisa@yahoo.com",
        new Date("12/1/2023"),
        new Date("12/5/2023"),
        50,
        room
      );
      const booking2 = new Booking(
        "maria",
        "maria@yahoo.com",
        new Date("12/6/2023"),
        new Date("12/7/2023"),
        20,
        room
      );
      room.bookings = [booking1, booking2];
      expect(room.isOccupied(new Date("2/8/2023"))).toBe(true);
    });
  });
  
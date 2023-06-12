const { Room , Booking }  = require ("./index.js");



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
  });
  

  describe("Comprobar el porcentaje de ocupación dado una habitación y un rango de fechas", () => {
    test("Devolverá el % de noches ocupadas", () => {
      const room = new Room("single bed", [], 100, 50);
      Room.totalOccupancyPercentage(room,new Date("2023-04-12"), new Date("2023-04-15") );
    });
  });
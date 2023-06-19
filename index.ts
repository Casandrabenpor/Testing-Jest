// Clase Room
export class Room {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;

  constructor(
    name: string,
    bookings: Booking[],
    rate: number,
    discount: number,
  ) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date: Date): boolean {
    for (let i = 0; i < this.bookings.length; i++) {
      if (
        date >= this.bookings[i].checkIn &&
        date <= this.bookings[i].checkOut
      ) {
        return true;
      }
    }
    return false;
  }

  occupancyPercentage(startDate: Date, endDate: Date): number {
    let daysOccupied = 0;
    let totalDays = 0;
    for (
      let i = new Date(startDate.getTime());
      i <= endDate;
      i.setDate(i.getDate() + 1)
    ) {
      totalDays++;
      if (this.isOccupied(i)) {
        daysOccupied++;
      }
    }
    return (daysOccupied / totalDays) * 100;
  }

  static totalOccupancyPercentage(
    rooms: Room[],
    startDate: Date,
    endDate: Date,
  ): number {
    let sumOfPercentage = 0;
    for (let i = 0; i < rooms.length; i++) {
      sumOfPercentage += rooms[i].occupancyPercentage(startDate, endDate);
    }
    return sumOfPercentage / rooms.length;
  }

  static availableRooms(rooms: Room[], startDate: Date, endDate: Date): Room[] {
    let result = [];
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].occupancyPercentage(startDate, endDate) === 0) {
        result.push(rooms[i]);
      }
    }
    return result;
  }
}

//Clase Booking
export class Booking {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;
  room: Room;
  constructor(
    name: string,
    email: string,
    checkIn: Date,
    checkOut: Date,
    discount: number,
    room: Room,
  ) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }
  getFee(): number {
    let priceRoom = this.room.rate;
    let durationInDays =
      (this.checkOut.getTime() - this.checkIn.getTime()) /
      (1000 * 60 * 60 * 24);
    let discountRoom = priceRoom - (priceRoom * this.room.discount) / 100;
    let fee = discountRoom * durationInDays;
    let discountBooking = fee - (fee * this.discount) / 100; // Aplicar el descuento en la reserva

    return discountBooking;
  }
}

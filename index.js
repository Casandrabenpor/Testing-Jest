// Clase Room
class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date) {
        for (let i = 0; i < this.bookings.length; i++) {
            if (date >= this.bookings[i].checkIn && date <= this.bookings[i].checkOut) {
                return true;
            }
        }
        return false;
    }

    occupancyPercentage(startDate, endDate) {
        let daysOccupied = 0;
        let totalDays = 0;
        for (let i = new Date(startDate.getTime()); i <= endDate; i.setDate(i.getDate() + 1)) {
            totalDays++;
            if (this.isOccupied(i)) {
                daysOccupied++;
            }
        }
        return daysOccupied / totalDays * 100;
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        let sumOfPercentage = 0;
        for (let i = 0; i < rooms.length; i++) {
            sumOfPercentage += rooms[i].occupancyPercentage(startDate, endDate);
        }
        return sumOfPercentage / rooms.length;
    }

    static availableRooms(rooms, startDate, endDate) {
        let result = [];
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].occupancyPercentage(startDate, endDate) === 0) {
                result.push(rooms[i]);
            }
        }
        return result;
    }

};


//Clase Booking
class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }
    getFee() {
        let priceRoom = this.room.rate;
        let durationInDays = (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24);
        let discountRoom = priceRoom - (priceRoom * this.room.discount / 100);
        let fee = discountRoom * durationInDays;
        let discountBooking = fee - (fee * this.discount / 100); // Aplicar el descuento en la reserva

        return discountBooking;
    }
};

module.exports = {
    Room,
    Booking
}
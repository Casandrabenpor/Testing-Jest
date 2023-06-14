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
        for(let i = 0; i < rooms.length ; i++){
            sumOfPercentage += rooms[i].occupancyPercentage(startDate,endDate);
        }
        return sumOfPercentage / rooms.length;
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

    }
};

module.exports = {
    Room,
    Booking
}
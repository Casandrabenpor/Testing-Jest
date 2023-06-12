// Clase Room
class Room {
    constructor(name,bookings,rate, discount) {
      this.name = name;
      this.bookings = bookings;
      this.rate = rate;
      this.discount = discount;
    }

    isOccupied(date){
        for(let i = 0; i < this.bookings.length; i++ ){
            if(date >= this.bookings[i].checkIn && date <= this.bookings[i].checkOut){
                return true;
            }
        }
        return false;
    }
};


//Clase Booking
class Booking {
    constructor(name, email, checkIn, checkOut, discount, room){
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }

    getFee(){

    }
};

module.exports = {
    Room,
    Booking
}
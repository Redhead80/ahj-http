const fs = require(`fs`);

class Handler {
    constructor() {
        this.tickets = [];
    }

    registerTicket(value) {
        
        let ticket = {
            id: this.tickets.length,
            name: value.name,
            status: value.status,
            created: value.created,
            description: value.description
        }

        this.tickets.push(ticket);
    }

    changeTicketStatus(value) {
        let id = value.id;
        let status = value.status;

        for(let i = 0; i < this.tickets.length; i++) {
            if(this.tickets[i].id == id) {
                this.tickets[i].status = status;
            }
        };   
    }

    findTicket(value) {

        let id = value.id;
        for(let i = 0; i < this.tickets.length; i++) {
            if(this.tickets[i].id == id) {
                return i;
            }
        }
        
    }

    removeTicket(value) {
        let id = value.id;
        for(let i = 0; i < this.tickets.length; i++) {
            if(this.tickets[i].id == id) {
                this.tickets.splice(i, 1);
            }
        }
    }

    editTicket(value) {
        let id = value.id;
        let name = value.name;
        let description = value.description;
        for(let i = 0; i < this.tickets.length; i++) {
            if(this.tickets[i].id == id) {
                this.tickets[i].name = name;
                this.tickets[i].description = description;
            }
        }

    }
}

module.exports = {
    Handler
}
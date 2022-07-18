import TicketCreater from './TicketCreater';


export default class Requester {
    static makeRequest(method, value, queryString) {

    let url;
    if (method == 'POST') {
        url = `http://localhost:7044/?${queryString}`;
    } else if (method == 'GET') {
        let keys = Object.keys(value);
        url = `http://localhost:7044/?action=${queryString}`;
        for (let i = 0; i < keys.length; i++) {
            url += `&${keys[i]}=${value[keys[i]]}`;
        }

    }
         

        const xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.addEventListener('readystatechange',(evt)=>{
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    if (JSON.parse(xhr.response).action === 'createTicket'){
                        TicketCreater.createTicket(JSON.parse(xhr.response).ticket)
                    } else if (JSON.parse(xhr.response).action === 'changeStatus'){
                        TicketCreater.changeStatus(JSON.parse(xhr.response).ticket)
                    } else if (JSON.parse(xhr.response).action === 'removeTicket'){
                        TicketCreater.removeTicket(JSON.parse(xhr.response).ticket)
                    } else if (JSON.parse(xhr.response).action === 'getDescription'){
                        TicketCreater.showDescription(JSON.parse(xhr.response).ticket)
                    } else if (JSON.parse(xhr.response).action === 'editTicket'){
                        TicketCreater.editTicket(JSON.parse(xhr.response).ticket)
                    } else if (JSON.parse(xhr.response).action === 'getAllTickets'){
                        for(let i = 0; i < JSON.parse(xhr.response).ticket.length; i ++) {
                            TicketCreater.createTicket(JSON.parse(xhr.response).ticket[i]);
                        }
                    }
                }
            }
        });
        if (method == "POST") {
            xhr.send(JSON.stringify(value));
        } else if (method == "GET") {
            xhr.send();
        }
        
    }
}
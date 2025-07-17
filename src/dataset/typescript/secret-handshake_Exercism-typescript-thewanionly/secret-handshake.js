"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = commands;
const Event = {
    1: 'wink',
    2: 'double blink',
    4: 'close your eyes',
    8: 'jump'
};
const REVERSE_NUMBER = 16;
function commands(decimal) {
    let currNumber = decimal;
    let event = [];
    let eventKeys = Object.keys(Event).map((key) => Number(key));
    // Reverse eventKeys order if currNumber is greater than or equal to REVERSE_NUMBER
    if (currNumber >= REVERSE_NUMBER) {
        eventKeys.reverse();
        currNumber -= REVERSE_NUMBER;
    }
    // Push the corresponding event immediately if the currNumber is in the eventKeys
    if (eventKeys.includes(currNumber)) {
        event.push(Event[currNumber]);
        currNumber = 0;
    }
    if (currNumber > 0) {
        // Logic for determining all possible events with the given number
        for (let i = 0; i < eventKeys.length; i++) {
            const eventKey = eventKeys[i];
            if (currNumber >= eventKey) {
                event.push(Event[eventKey]);
                currNumber -= eventKey;
            }
            if (currNumber <= 0)
                break;
        }
    }
    return event;
}

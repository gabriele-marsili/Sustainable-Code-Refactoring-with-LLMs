"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
class Robot {
    constructor() {
        this.robotName = '';
        this.generatedNames = [];
        this.generateName();
    }
    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    generateName() {
        let tempName = [];
        let generatedName = '';
        do {
            // Generate two letters
            for (let i = 0; i < 2; i++) {
                tempName.push(String.fromCharCode(this.generateRandomNumber('A'.charCodeAt(0), 'Z'.charCodeAt(0))));
            }
            // Generate three numbers
            for (let i = 0; i < 3; i++) {
                tempName.push(this.generateRandomNumber(0, 9));
            }
            generatedName = tempName.join('');
        } while (this.generatedNames.includes(generatedName));
        this.robotName = generatedName;
        this.generatedNames.push(generatedName);
    }
    get name() {
        return this.robotName;
    }
    resetName() {
        this.generateName();
    }
    static releaseNames() {
        new Robot().generatedNames = [];
    }
}
exports.Robot = Robot;

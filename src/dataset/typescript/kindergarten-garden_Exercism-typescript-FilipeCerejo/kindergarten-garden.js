"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Garden = void 0;
const DEFAULT_STUDENTS = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Fred',
    'Ginny',
    'Harriet',
    'Ileana',
    'Joseph',
    'Kincaid',
    'Larry',
];
const PLANT_CODES = {
    G: 'grass',
    V: 'violets',
    R: 'radishes',
    C: 'clover',
};
class Garden {
    constructor(diagram, students = DEFAULT_STUDENTS) {
        this._pots = diagram.split('\n').map((line) => line.split(''));
        this._students = students.sort((a, b) => (a < b ? -1 : 1));
    }
    plants(student) {
        let firstPlantIdx = this._students.indexOf(student) * 2;
        let plants = [];
        plants.push(PLANT_CODES[this._pots[0][firstPlantIdx]]);
        plants.push(PLANT_CODES[this._pots[0][firstPlantIdx + 1]]);
        plants.push(PLANT_CODES[this._pots[1][firstPlantIdx]]);
        plants.push(PLANT_CODES[this._pots[1][firstPlantIdx + 1]]);
        return plants;
    }
}
exports.Garden = Garden;

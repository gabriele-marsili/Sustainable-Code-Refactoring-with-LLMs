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
        this._pots = diagram;
        this._students = [...students].sort(); // Create a copy to avoid modifying the original array
        this._studentIndex = new Map();
        for (let i = 0; i < this._students.length; i++) {
            this._studentIndex.set(this._students[i], i);
        }
    }
    plants(student) {
        const studentIndex = this._studentIndex.get(student);
        if (studentIndex === undefined) {
            return []; // Or throw an error, depending on desired behavior
        }
        const firstPlantIdx = studentIndex * 2;
        const plants = [];
        plants.push(PLANT_CODES[this._pots[firstPlantIdx + 0]]);
        plants.push(PLANT_CODES[this._pots[firstPlantIdx + 1]]);
        plants.push(PLANT_CODES[this._pots[this._pots.indexOf('\n') + firstPlantIdx + 0 + 1]]);
        plants.push(PLANT_CODES[this._pots[this._pots.indexOf('\n') + firstPlantIdx + 1 + 1]]);
        return plants;
    }
}
exports.Garden = Garden;

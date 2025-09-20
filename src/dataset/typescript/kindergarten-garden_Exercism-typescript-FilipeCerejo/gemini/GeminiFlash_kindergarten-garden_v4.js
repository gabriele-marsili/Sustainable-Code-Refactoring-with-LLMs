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
        this._students = [...students].sort();
        this._studentIndexMap = new Map();
        for (let i = 0; i < this._students.length; i++) {
            this._studentIndexMap.set(this._students[i], i);
        }
    }
    plants(student) {
        const studentIndex = this._studentIndexMap.get(student);
        if (studentIndex === undefined) {
            return [];
        }
        const firstPlantIdx = studentIndex * 2;
        const plants = [
            PLANT_CODES[this._pots[0][firstPlantIdx]],
            PLANT_CODES[this._pots[0][firstPlantIdx + 1]],
            PLANT_CODES[this._pots[1][firstPlantIdx]],
            PLANT_CODES[this._pots[1][firstPlantIdx + 1]],
        ];
        return plants;
    }
}
exports.Garden = Garden;

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
        this._studentMap = new Map(students
            .slice()
            .sort()
            .map((student, index) => [student, index * 2]));
    }
    plants(student) {
        const firstPlantIdx = this._studentMap.get(student);
        if (firstPlantIdx === undefined)
            return [];
        return [
            PLANT_CODES[this._pots[0][firstPlantIdx]],
            PLANT_CODES[this._pots[0][firstPlantIdx + 1]],
            PLANT_CODES[this._pots[1][firstPlantIdx]],
            PLANT_CODES[this._pots[1][firstPlantIdx + 1]],
        ];
    }
}
exports.Garden = Garden;

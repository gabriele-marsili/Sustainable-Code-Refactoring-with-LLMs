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
        this._students = [...students].sort((a, b) => (a < b ? -1 : 1));
        this._studentIndex = new Map();
        for (let i = 0; i < this._students.length; i++) {
            this._studentIndex.set(this._students[i], i);
        }
    }
    plants(student) {
        var _a;
        const firstPlantIdx = (_a = this._studentIndex.get(student)) !== null && _a !== void 0 ? _a : -1;
        if (firstPlantIdx === -1) {
            return [];
        }
        const plantIndex = firstPlantIdx * 2;
        const plants = [
            PLANT_CODES[this._pots[0][plantIndex]],
            PLANT_CODES[this._pots[0][plantIndex + 1]],
            PLANT_CODES[this._pots[1][plantIndex]],
            PLANT_CODES[this._pots[1][plantIndex + 1]],
        ];
        return plants;
    }
}
exports.Garden = Garden;

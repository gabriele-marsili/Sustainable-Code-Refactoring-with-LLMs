"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const robot_name_1 = __importDefault(require("./robot-name"));
const areSequential = (name1, name2) => {
    const alpha1 = name1.substr(0, 2);
    const alpha2 = name2.substr(0, 2);
    const num1 = +name1.substr(2, 3);
    const num2 = +name2.substr(2, 3);
    const numDiff = num2 - num1;
    const alphaDiff = (alpha2.charCodeAt(0) - alpha1.charCodeAt(0)) * 26 +
        (alpha2.charCodeAt(1) - alpha1.charCodeAt(1));
    const totalDiff = alphaDiff * 1000 + numDiff;
    return Math.abs(totalDiff) <= 1;
};
const NAME_RE = /^[A-Z]{2}\d{3}$/;
const TOTAL_NUMBER_OF_NAMES = 26 * // A-Z
    26 * // A-Z
    10 * // 0-9
    10 * // 0-9
    10; // 0-9
describe('Robot', () => {
    let robot;
    beforeEach(() => {
        robot = new robot_name_1.default();
    });
    afterEach(() => {
        robot_name_1.default.releaseNames();
    });
    it('has a name', () => {
        expect(robot.name).toMatch(NAME_RE);
    });
    it('name is the same each time', () => {
        expect(robot.name).toEqual(robot.name);
    });
    it('different robots have different names', () => {
        const differentRobot = new robot_name_1.default();
        expect(differentRobot.name).not.toEqual(robot.name);
    });
    it('is able to reset the name', () => {
        const originalName = robot.name;
        robot.resetName();
        const newName = robot.name;
        expect(newName).toMatch(NAME_RE);
        expect(originalName).not.toEqual(newName);
    });
    it('should set a unique name after reset', () => {
        const NUMBER_OF_ROBOTS = 10000;
        const usedNames = new Set();
        usedNames.add(robot.name);
        for (let i = 0; i < NUMBER_OF_ROBOTS; i++) {
            robot.resetName();
            usedNames.add(robot.name);
        }
        expect(usedNames.size).toEqual(NUMBER_OF_ROBOTS + 1);
    });
    it('new names should not be sequential', () => {
        const name1 = robot.name;
        const name2 = new robot_name_1.default().name;
        const name3 = new robot_name_1.default().name;
        expect(areSequential(name1, name1)).toBe(true);
        expect(areSequential(name1, name2)).toBe(false);
        expect(areSequential(name2, name3)).toBe(false);
    });
    it('names from reset should not be sequential', () => {
        const name1 = robot.name;
        robot.resetName();
        const name2 = robot.name;
        robot.resetName();
        const name3 = robot.name;
        expect(areSequential(name1, name2)).toBe(false);
        expect(areSequential(name2, name3)).toBe(false);
        expect(areSequential(name3, name3)).toBe(true);
    });
    // This test is optional.
    it('all the names can be generated', () => {
        const usedNames = new Set();
        usedNames.add(robot.name);
        for (let i = 0; i < TOTAL_NUMBER_OF_NAMES - 1; i += 1) {
            const newRobot = new robot_name_1.default();
            usedNames.add(newRobot.name);
        }
        expect(usedNames.size).toEqual(TOTAL_NUMBER_OF_NAMES);
    });
});

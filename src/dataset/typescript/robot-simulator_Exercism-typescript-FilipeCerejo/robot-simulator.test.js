"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const robot_simulator_1 = require("./robot-simulator");
function turnRight(robot) {
    robot.evaluate('R');
}
function turnLeft(robot) {
    robot.evaluate('L');
}
function advance(robot) {
    robot.evaluate('A');
}
describe('Robot', () => {
    describe('Create robot', () => {
        it('facing north by default', () => {
            const robot = new robot_simulator_1.Robot();
            expect(robot.bearing).toEqual('north');
        });
        it('facing east', () => {
            const robot = new robot_simulator_1.Robot();
            robot.place({ direction: 'east', x: 0, y: 0 });
            expect(robot.bearing).toEqual('east');
        });
        it('facing west, at origin', () => {
            const robot = new robot_simulator_1.Robot();
            robot.place({ direction: 'west', x: 0, y: 0 });
            expect(robot.bearing).toEqual('west');
            expect(robot.coordinates).toEqual([0, 0]);
        });
        it('at negative position facing south', () => {
            const robot = new robot_simulator_1.Robot();
            robot.place({ direction: 'south', x: -1, y: -1 });
            expect(robot.bearing).toEqual('south');
            expect(robot.coordinates).toEqual([-1, -1]);
        });
        xit('invalid robot bearing', () => {
            const robot = new robot_simulator_1.Robot();
            expect(robot_simulator_1.InvalidInputError.prototype).toBeInstanceOf(Error);
            expect(() => robot.place({ direction: 'crood', x: 0, y: 0 })).toThrow(robot_simulator_1.InvalidInputError);
        });
    });
    describe('Rotating clockwise', () => {
        const robot = new robot_simulator_1.Robot();
        xit('changes north to east', () => {
            robot.place({ direction: 'north', x: 0, y: 0 });
            turnRight(robot);
            expect(robot.bearing).toEqual('east');
            expect(robot.coordinates).toEqual([0, 0]);
        });
        xit('changes east to south', () => {
            robot.place({ direction: 'east', x: 0, y: 0 });
            turnRight(robot);
            expect(robot.bearing).toEqual('south');
            expect(robot.coordinates).toEqual([0, 0]);
        });
        xit('changes south to west', () => {
            robot.place({ direction: 'south', x: 0, y: 0 });
            turnRight(robot);
            expect(robot.bearing).toEqual('west');
            expect(robot.coordinates).toEqual([0, 0]);
        });
        xit('changes west to north', () => {
            robot.place({ direction: 'west', x: 0, y: 0 });
            turnRight(robot);
            expect(robot.bearing).toEqual('north');
            expect(robot.coordinates).toEqual([0, 0]);
        });
    });
    describe('Rotating counter-clockwise', () => {
        const robot = new robot_simulator_1.Robot();
        xit('changes north to west', () => {
            robot.place({ direction: 'north', x: 0, y: 0 });
            turnLeft(robot);
            expect(robot.bearing).toEqual('west');
            expect(robot.coordinates).toEqual([0, 0]);
        });
        xit('changes west to south', () => {
            robot.place({ direction: 'west', x: 0, y: 0 });
            turnLeft(robot);
            expect(robot.bearing).toEqual('south');
            expect(robot.coordinates).toEqual([0, 0]);
        });
        xit('changes south to east', () => {
            robot.place({ direction: 'south', x: 0, y: 0 });
            turnLeft(robot);
            expect(robot.bearing).toEqual('east');
            expect(robot.coordinates).toEqual([0, 0]);
        });
        xit('changes east to north', () => {
            robot.place({ direction: 'east', x: 0, y: 0 });
            turnLeft(robot);
            expect(robot.bearing).toEqual('north');
            expect(robot.coordinates).toEqual([0, 0]);
        });
    });
    describe('Moving forward one', () => {
        const robot = new robot_simulator_1.Robot();
        xit('advance when facing north', () => {
            robot.place({ direction: 'north', x: 0, y: 0 });
            advance(robot);
            expect(robot.coordinates).toEqual([0, 1]);
            expect(robot.bearing).toEqual('north');
        });
        xit('advance when facing south', () => {
            robot.place({ direction: 'south', x: 0, y: 0 });
            advance(robot);
            expect(robot.coordinates).toEqual([0, -1]);
            expect(robot.bearing).toEqual('south');
        });
        xit('advance when facing east', () => {
            robot.place({ direction: 'east', x: 0, y: 0 });
            advance(robot);
            expect(robot.coordinates).toEqual([1, 0]);
            expect(robot.bearing).toEqual('east');
        });
        xit('advance when facing west', () => {
            robot.place({ direction: 'west', x: 0, y: 0 });
            advance(robot);
            expect(robot.coordinates).toEqual([-1, 0]);
            expect(robot.bearing).toEqual('west');
        });
    });
    describe('Follow series of instructions', () => {
        const robot = new robot_simulator_1.Robot();
        xit('moving east and north from README', () => {
            robot.place({ x: 7, y: 3, direction: 'north' });
            robot.evaluate('RAALAL');
            expect(robot.coordinates).toEqual([9, 4]);
            expect(robot.bearing).toEqual('west');
        });
        xit('moving west and north', () => {
            robot.place({ x: 0, y: 0, direction: 'north' });
            robot.evaluate('LAAARALA');
            expect(robot.coordinates).toEqual([-4, 1]);
            expect(robot.bearing).toEqual('west');
        });
        xit('moving west and south', () => {
            robot.place({ x: 2, y: -7, direction: 'east' });
            robot.evaluate('RRAAAAALA');
            expect(robot.coordinates).toEqual([-3, -8]);
            expect(robot.bearing).toEqual('south');
        });
        xit('moving east and north', () => {
            robot.place({ x: 8, y: 4, direction: 'south' });
            robot.evaluate('LAAARRRALLLL');
            expect(robot.coordinates).toEqual([11, 5]);
            expect(robot.bearing).toEqual('north');
        });
        xit('instruct many robots', () => {
            const robot1 = new robot_simulator_1.Robot();
            const robot2 = new robot_simulator_1.Robot();
            const robot3 = new robot_simulator_1.Robot();
            robot1.place({ x: 0, y: 0, direction: 'north' });
            robot2.place({ x: 2, y: -7, direction: 'east' });
            robot3.place({ x: 8, y: 4, direction: 'south' });
            robot1.evaluate('LAAARALA');
            robot2.evaluate('RRAAAAALA');
            robot3.evaluate('LAAARRRALLLL');
            expect(robot1.coordinates).toEqual([-4, 1]);
            expect(robot1.bearing).toEqual('west');
            expect(robot2.coordinates).toEqual([-3, -8]);
            expect(robot2.bearing).toEqual('south');
            expect(robot3.coordinates).toEqual([11, 5]);
            expect(robot3.bearing).toEqual('north');
        });
    });
});

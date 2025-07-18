"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const robot_simulator_1 = __importDefault(require("./robot-simulator"));
describe('Robot', () => {
    const robot = new robot_simulator_1.default();
    it('robot bearing', () => {
        const directions = ['east', 'west', 'north', 'south'];
        directions.forEach((currentDirection) => {
            robot.orient(currentDirection);
            expect(robot.bearing).toEqual(currentDirection);
        });
    });
    it('invalid robot bearing', () => {
        try {
            robot.orient('crood');
        }
        catch (exception) {
            expect(exception).toEqual('Invalid Robot Bearing');
        }
    });
    it('turn right from north', () => {
        robot.orient('north');
        robot.turnRight();
        expect(robot.bearing).toEqual('east');
    });
    it('turn right from east', () => {
        robot.orient('east');
        robot.turnRight();
        expect(robot.bearing).toEqual('south');
    });
    it('turn right from south', () => {
        robot.orient('south');
        robot.turnRight();
        expect(robot.bearing).toEqual('west');
    });
    it('turn right from west', () => {
        robot.orient('west');
        robot.turnRight();
        expect(robot.bearing).toEqual('north');
    });
    it('turn left from north', () => {
        robot.orient('north');
        robot.turnLeft();
        expect(robot.bearing).toEqual('west');
    });
    it('turn left from east', () => {
        robot.orient('east');
        robot.turnLeft();
        expect(robot.bearing).toEqual('north');
    });
    it('turn left from south', () => {
        robot.orient('south');
        robot.turnLeft();
        expect(robot.bearing).toEqual('east');
    });
    it('turn left from west', () => {
        robot.orient('west');
        robot.turnLeft();
        expect(robot.bearing).toEqual('south');
    });
    it('robot coordinates', () => {
        robot.at(3, 0);
        expect(robot.coordinates).toEqual([3, 0]);
    });
    it('other robot coordinates', () => {
        robot.at(-2, 5);
        expect(robot.coordinates).toEqual([-2, 5]);
    });
    it('advance when facing north', () => {
        robot.at(0, 0);
        robot.orient('north');
        robot.advance();
        expect(robot.coordinates).toEqual([0, 1]);
    });
    it('advance when facing east', () => {
        robot.at(0, 0);
        robot.orient('east');
        robot.advance();
        expect(robot.coordinates).toEqual([1, 0]);
    });
    it('advance when facing south', () => {
        robot.at(0, 0);
        robot.orient('south');
        robot.advance();
        expect(robot.coordinates).toEqual([0, -1]);
    });
    it('advance when facing west', () => {
        robot.at(0, 0);
        robot.orient('west');
        robot.advance();
        expect(robot.coordinates).toEqual([-1, 0]);
    });
    it('instructions for turning left', () => {
        expect(robot.instructions('L')).toEqual(['turnLeft']);
    });
    it('instructions for turning right', () => {
        expect(robot.instructions('R')).toEqual(['turnRight']);
    });
    it('instructions for advancing', () => {
        expect(robot.instructions('A')).toEqual(['advance']);
    });
    it('series of instructions', () => {
        expect(robot.instructions('RAAL'))
            .toEqual(['turnRight', 'advance', 'advance', 'turnLeft']);
    });
    it('instruct robot', () => {
        const robotI = new robot_simulator_1.default(-2, 1, 'east');
        robotI.evaluate('RLAALAL');
        expect(robotI.coordinates).toEqual([0, 2]);
        expect(robotI.bearing).toEqual('west');
    });
    it('instruct many robots', () => {
        const robot1 = new robot_simulator_1.default(0, 0, 'north');
        const robot2 = new robot_simulator_1.default(2, -7, 'east');
        const robot3 = new robot_simulator_1.default(8, 4, 'south');
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

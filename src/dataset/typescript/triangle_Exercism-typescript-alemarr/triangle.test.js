"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const triangle_1 = require("./triangle");
describe('Triangle', () => {
    describe('equilateral triangle', () => {
        it('all sides are equal', () => {
            const triangle = new triangle_1.Triangle(2, 2, 2);
            expect(triangle.isEquilateral).toBe(true);
        });
        it('any side is unequal', () => {
            const triangle = new triangle_1.Triangle(2, 3, 2);
            expect(triangle.isEquilateral).toBe(false);
        });
        it('no sides are equal', () => {
            const triangle = new triangle_1.Triangle(5, 4, 6);
            expect(triangle.isEquilateral).toBe(false);
        });
        it('all zero sides is not a triangle', () => {
            const triangle = new triangle_1.Triangle(0, 0, 0);
            expect(triangle.isEquilateral).toBe(false);
        });
        it('sides may be floats', () => {
            const triangle = new triangle_1.Triangle(0.5, 0.5, 0.5);
            expect(triangle.isEquilateral).toBe(true);
        });
    });
    describe('isosceles triangle', () => {
        it('last two sides are equal', () => {
            const triangle = new triangle_1.Triangle(3, 4, 4);
            expect(triangle.isIsosceles).toBe(true);
        });
        it('first two sides are equal', () => {
            const triangle = new triangle_1.Triangle(4, 4, 3);
            expect(triangle.isIsosceles).toBe(true);
        });
        it('first and last sides are equal', () => {
            const triangle = new triangle_1.Triangle(4, 3, 4);
            expect(triangle.isIsosceles).toBe(true);
        });
        it('equilateral triangles are also isosceles', () => {
            const triangle = new triangle_1.Triangle(4, 4, 4);
            expect(triangle.isIsosceles).toBe(true);
        });
        it('no sides are equal', () => {
            const triangle = new triangle_1.Triangle(2, 3, 4);
            expect(triangle.isIsosceles).toBe(false);
        });
        it('first triangle inequality violation', () => {
            const triangle = new triangle_1.Triangle(1, 1, 3);
            expect(triangle.isIsosceles).toBe(false);
        });
        it('second triangle inequality violation', () => {
            const triangle = new triangle_1.Triangle(1, 3, 1);
            expect(triangle.isIsosceles).toBe(false);
        });
        it('third triangle inequality violation', () => {
            const triangle = new triangle_1.Triangle(3, 1, 1);
            expect(triangle.isIsosceles).toBe(false);
        });
        it('sides may be floats', () => {
            const triangle = new triangle_1.Triangle(0.5, 0.4, 0.5);
            expect(triangle.isIsosceles).toBe(true);
        });
    });
    describe('scalene triangle', () => {
        it('no sides are equal', () => {
            const triangle = new triangle_1.Triangle(5, 4, 6);
            expect(triangle.isScalene).toBe(true);
        });
        it('all sides are equal', () => {
            const triangle = new triangle_1.Triangle(4, 4, 4);
            expect(triangle.isScalene).toBe(false);
        });
        it('first and second sides are equal', () => {
            const triangle = new triangle_1.Triangle(4, 4, 3);
            expect(triangle.isScalene).toBe(false);
        });
        it('first and third sides are equal', () => {
            const triangle = new triangle_1.Triangle(3, 4, 3);
            expect(triangle.isScalene).toBe(false);
        });
        it('second and third sides are equal', () => {
            const triangle = new triangle_1.Triangle(4, 3, 3);
            expect(triangle.isScalene).toBe(false);
        });
        it('may not violate triangle inequality', () => {
            const triangle = new triangle_1.Triangle(7, 3, 2);
            expect(triangle.isScalene).toBe(false);
        });
        it('sides may be floats', () => {
            const triangle = new triangle_1.Triangle(0.5, 0.4, 0.6);
            expect(triangle.isScalene).toBe(true);
        });
    });
});

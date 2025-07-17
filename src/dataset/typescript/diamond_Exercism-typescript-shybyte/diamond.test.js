"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diamond_1 = __importDefault(require("./diamond"));
/* tslint:disable no-trailing-whitespace*/
describe('Make diamond function', () => {
    const diamond = new diamond_1.default();
    test('test letter A', () => {
        const result = 'A\n';
        expect(diamond.makeDiamond('A')).toEqual(result);
    });
    test('test letter C', () => {
        const result = `  A  
 B B 
C   C
 B B 
  A  
`;
        expect(diamond.makeDiamond('C')).toEqual(result);
    });
    test('test letter E', () => {
        const result = `    A    
   B B   
  C   C  
 D     D 
E       E
 D     D 
  C   C  
   B B   
    A    
`;
        expect(diamond.makeDiamond('E')).toEqual(result);
    });
});

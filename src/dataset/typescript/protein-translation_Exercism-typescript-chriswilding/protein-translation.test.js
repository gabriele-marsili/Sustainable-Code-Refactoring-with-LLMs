"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const protein_translation_1 = __importDefault(require("./protein-translation"));
describe('Translate input RNA sequences into proteins', () => {
    it('Methionine RNA sequence', () => {
        const expected = ['Methionine'];
        expect(protein_translation_1.default.proteins('AUG')).toEqual(expected);
    });
    it('Phenylalanine RNA sequence 1', () => {
        const expected = ['Phenylalanine'];
        expect(protein_translation_1.default.proteins('UUU')).toEqual(expected);
    });
    it('Phenylalanine RNA sequence 2', () => {
        const expected = ['Phenylalanine'];
        expect(protein_translation_1.default.proteins('UUC')).toEqual(expected);
    });
    it('Leucine RNA sequence 1', () => {
        const expected = ['Leucine'];
        expect(protein_translation_1.default.proteins('UUA')).toEqual(expected);
    });
    it('Leucine RNA sequence 2', () => {
        const expected = ['Leucine'];
        expect(protein_translation_1.default.proteins('UUG')).toEqual(expected);
    });
    it('Serine RNA sequence 1', () => {
        const expected = ['Serine'];
        expect(protein_translation_1.default.proteins('UCU')).toEqual(expected);
    });
    it('Serine RNA sequence 2', () => {
        const expected = ['Serine'];
        expect(protein_translation_1.default.proteins('UCC')).toEqual(expected);
    });
    it('Serine RNA sequence 3', () => {
        const expected = ['Serine'];
        expect(protein_translation_1.default.proteins('UCA')).toEqual(expected);
    });
    it('Serine RNA sequence 4', () => {
        const expected = ['Serine'];
        expect(protein_translation_1.default.proteins('UCG')).toEqual(expected);
    });
    it('Tyrosine RNA sequence 1', () => {
        const expected = ['Tyrosine'];
        expect(protein_translation_1.default.proteins('UAU')).toEqual(expected);
    });
    it('Tyrosine RNA sequence 2', () => {
        const expected = ['Tyrosine'];
        expect(protein_translation_1.default.proteins('UAC')).toEqual(expected);
    });
    it('Cysteine RNA sequence 1', () => {
        const expected = ['Cysteine'];
        expect(protein_translation_1.default.proteins('UGU')).toEqual(expected);
    });
    it('Cysteine RNA sequence 2', () => {
        const expected = ['Cysteine'];
        expect(protein_translation_1.default.proteins('UGC')).toEqual(expected);
    });
    it('Tryptophan RNA sequence', () => {
        const expected = ['Tryptophan'];
        expect(protein_translation_1.default.proteins('UGG')).toEqual(expected);
    });
    it('STOP codon RNA sequence 1', () => {
        const expected = [];
        expect(protein_translation_1.default.proteins('UAA')).toEqual(expected);
    });
    it('STOP codon RNA sequence 2', () => {
        const expected = [];
        expect(protein_translation_1.default.proteins('UAG')).toEqual(expected);
    });
    it('STOP codon RNA sequence 3', () => {
        const expected = [];
        expect(protein_translation_1.default.proteins('UGA')).toEqual(expected);
    });
    it('Translate RNA strand into correct protein list', () => {
        const expected = ['Methionine', 'Phenylalanine', 'Tryptophan'];
        expect(protein_translation_1.default.proteins('AUGUUUUGG')).toEqual(expected);
    });
    it('Translation stops if STOP codon at beginning of sequence', () => {
        const expected = [];
        expect(protein_translation_1.default.proteins('UAGUGG')).toEqual(expected);
    });
    it('Translation stops if STOP codon at end of two-codon sequence', () => {
        const expected = ['Tryptophan'];
        expect(protein_translation_1.default.proteins('UGGUAG')).toEqual(expected);
    });
    it('Translation stops if STOP codon at end of three-codon sequence', () => {
        const expected = ['Methionine', 'Phenylalanine'];
        expect(protein_translation_1.default.proteins('AUGUUUUAA')).toEqual(expected);
    });
    it('Translation stops if STOP codon in middle of three-codon sequence', () => {
        const expected = ['Tryptophan'];
        expect(protein_translation_1.default.proteins('UGGUAGUGG')).toEqual(expected);
    });
    it('Translation stops if STOP codon in middle of six-codon sequence', () => {
        const expected = ['Tryptophan', 'Cysteine', 'Tyrosine'];
        expect(protein_translation_1.default.proteins('UGGUGUUAUUAAUGGUUU')).toEqual(expected);
    });
});

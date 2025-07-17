"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protein_translation_1 = require("./protein-translation");
describe('Translate input RNA sequences into proteins', () => {
    it('Methionine RNA sequence', () => {
        const expected = ['Methionine'];
        expect((0, protein_translation_1.translate)('AUG')).toEqual(expected);
    });
    xit('Phenylalanine RNA sequence 1', () => {
        const expected = ['Phenylalanine'];
        expect((0, protein_translation_1.translate)('UUU')).toEqual(expected);
    });
    xit('Phenylalanine RNA sequence 2', () => {
        const expected = ['Phenylalanine'];
        expect((0, protein_translation_1.translate)('UUC')).toEqual(expected);
    });
    xit('Leucine RNA sequence 1', () => {
        const expected = ['Leucine'];
        expect((0, protein_translation_1.translate)('UUA')).toEqual(expected);
    });
    xit('Leucine RNA sequence 2', () => {
        const expected = ['Leucine'];
        expect((0, protein_translation_1.translate)('UUG')).toEqual(expected);
    });
    xit('Serine RNA sequence 1', () => {
        const expected = ['Serine'];
        expect((0, protein_translation_1.translate)('UCU')).toEqual(expected);
    });
    xit('Serine RNA sequence 2', () => {
        const expected = ['Serine'];
        expect((0, protein_translation_1.translate)('UCC')).toEqual(expected);
    });
    xit('Serine RNA sequence 3', () => {
        const expected = ['Serine'];
        expect((0, protein_translation_1.translate)('UCA')).toEqual(expected);
    });
    xit('Serine RNA sequence 4', () => {
        const expected = ['Serine'];
        expect((0, protein_translation_1.translate)('UCG')).toEqual(expected);
    });
    xit('Tyrosine RNA sequence 1', () => {
        const expected = ['Tyrosine'];
        expect((0, protein_translation_1.translate)('UAU')).toEqual(expected);
    });
    xit('Tyrosine RNA sequence 2', () => {
        const expected = ['Tyrosine'];
        expect((0, protein_translation_1.translate)('UAC')).toEqual(expected);
    });
    xit('Cysteine RNA sequence 1', () => {
        const expected = ['Cysteine'];
        expect((0, protein_translation_1.translate)('UGU')).toEqual(expected);
    });
    xit('Cysteine RNA sequence 2', () => {
        const expected = ['Cysteine'];
        expect((0, protein_translation_1.translate)('UGC')).toEqual(expected);
    });
    xit('Tryptophan RNA sequence', () => {
        const expected = ['Tryptophan'];
        expect((0, protein_translation_1.translate)('UGG')).toEqual(expected);
    });
    xit('STOP codon RNA sequence 1', () => {
        const expected = [];
        expect((0, protein_translation_1.translate)('UAA')).toEqual(expected);
    });
    xit('STOP codon RNA sequence 2', () => {
        const expected = [];
        expect((0, protein_translation_1.translate)('UAG')).toEqual(expected);
    });
    xit('STOP codon RNA sequence 3', () => {
        const expected = [];
        expect((0, protein_translation_1.translate)('UGA')).toEqual(expected);
    });
    xit('Translate RNA strand into correct protein list', () => {
        const expected = ['Methionine', 'Phenylalanine', 'Tryptophan'];
        expect((0, protein_translation_1.translate)('AUGUUUUGG')).toEqual(expected);
    });
    xit('Translation stops if STOP codon at beginning of sequence', () => {
        const expected = [];
        expect((0, protein_translation_1.translate)('UAGUGG')).toEqual(expected);
    });
    xit('Translation stops if STOP codon at end of two-codon sequence', () => {
        const expected = ['Tryptophan'];
        expect((0, protein_translation_1.translate)('UGGUAG')).toEqual(expected);
    });
    xit('Translation stops if STOP codon at end of three-codon sequence', () => {
        const expected = ['Methionine', 'Phenylalanine'];
        expect((0, protein_translation_1.translate)('AUGUUUUAA')).toEqual(expected);
    });
    xit('Translation stops if STOP codon in middle of three-codon sequence', () => {
        const expected = ['Tryptophan'];
        expect((0, protein_translation_1.translate)('UGGUAGUGG')).toEqual(expected);
    });
    xit('Translation stops if STOP codon in middle of six-codon sequence', () => {
        const expected = ['Tryptophan', 'Cysteine', 'Tyrosine'];
        expect((0, protein_translation_1.translate)('UGGUGUUAUUAAUGGUUU')).toEqual(expected);
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transpose_1 = __importDefault(require("./transpose"));
describe('Transpose', () => {
    it('empty string', () => {
        const expected = [];
        expect(transpose_1.default.transpose([])).toEqual(expected);
    });
    it('two characters in a row', () => {
        const expected = ['A', '1'];
        expect(transpose_1.default.transpose(['A1'])).toEqual(expected);
    });
    it('two characters in a column', () => {
        const expected = ['A1'];
        expect(transpose_1.default.transpose(['A', '1'])).toEqual(expected);
    });
    it('simple', () => {
        const expected = ['A1', 'B2', 'C3'];
        expect(transpose_1.default.transpose(['ABC', '123'])).toEqual(expected);
    });
    it('single line', () => {
        const expected = ['S', 'i', 'n', 'g', 'l', 'e', ' ', 'l', 'i', 'n', 'e', '.'];
        expect(transpose_1.default.transpose(['Single line.'])).toEqual(expected);
    });
    it('first line longer than second line', () => {
        const expected = ['TT', 'hh', 'ee', '  ', 'ff', 'oi', 'uf', 'rt', 'th', 'h ', ' l', 'li', 'in', 'ne', 'e.', '.'];
        expect(transpose_1.default.transpose(['The fourth line.', 'The fifth line.'])).toEqual(expected);
    });
    it('second line longer than first line', () => {
        const expected = ['TT', 'hh', 'ee', '  ', 'fs', 'ie', 'rc', 'so', 'tn', ' d', 'l ', 'il', 'ni', 'en', '.e', ' .'];
        expect(transpose_1.default.transpose(['The first line.', 'The second line.'])).toEqual(expected);
    });
    it('square', () => {
        const expected = ['HEART', 'EMBER', 'ABUSE', 'RESIN', 'TREND'];
        expect(transpose_1.default.transpose(['HEART', 'EMBER', 'ABUSE', 'RESIN', 'TREND'])).toEqual(expected);
    });
    it('rectangle', () => {
        const expected = ['FOBS', 'RULE', 'ATOP', 'CLOT', 'TIME', 'UNIT', 'RENT', 'EDGE'];
        expect(transpose_1.default.transpose(['FRACTURE', 'OUTLINED', 'BLOOMING', 'SEPTETTE'])).toEqual(expected);
    });
    it('triangle', () => {
        const expected = ['TEASER', ' EASER', '  ASER', '   SER', '    ER', '     R'];
        expect(transpose_1.default.transpose(['T', 'EE', 'AAA', 'SSSS', 'EEEEE', 'RRRRRR'])).toEqual(expected);
    });
    it("test mixed lines", () => {
        const input = [
            "The longest line.",
            "A long line.",
            "A longer line.",
            "A line."
        ];
        const expected = [
            "TAAA",
            "h   ",
            "elll",
            " ooi",
            "lnnn",
            "ogge",
            "n e.",
            "glr",
            "ei ",
            "snl",
            "tei",
            " .n",
            "l e",
            "i .",
            "n",
            "e",
            "."
        ];
        expect(transpose_1.default.transpose(input)).toEqual(expected);
    });
    it('test many lines', () => {
        const expected = ['CIFWFAWDTAWITW', 'hnrhr hohnhshh', 'o oeopotedi ea', 'rfmrmash  cn t', '.a e ie fthow ', ' ia fr weh,whh', 'Trnco miae  ie', 'w ciroitr btcr', 'oVivtfshfcuhhe', ' eeih a uote  ', 'hrnl sdtln  is', 'oot ttvh tttfh', 'un bhaeepihw a', 'saglernianeoyl', 'e,ro -trsui ol', 'h uofcu sarhu ', 'owddarrdan o m', 'lhg to\'egccuwi', 'deemasdaeehris', 'sr als t  ists', ',ebk \'phool\'h,', '  reldi ffd   ', 'bweso tb  rtpo', 'oea ileutterau', 't kcnoorhhnatr', 'hl isvuyee\'fi ', ' atv es iisfet', 'ayoior trr ino', 'l  lfsoh  ecti', 'ion   vedpn  l', 'kuehtteieadoe ', 'erwaharrar,fas', '   nekt te  rh', 'ismdsehphnnosa', 'ncuse ra-tau l', ' et  tormsural', 'dniuthwea\'g t ', 'iennwesnr hsts', 'g,ycoitkrttet', 'n,l rs\'a anr', 'ief \'dgcgdi', 'taol  eoe,v', 'yneisl,u;e', ',.sftol ', '     ervdt', '     ;ie o', '       f,r ', '       eem', '       .me', '          on', '          vd', '          e.', '          ,'];
        expect(transpose_1.default.transpose(['Chor. Two households, both alike in dignity,', 'In fair Verona, where we lay our scene,', 'From ancient grudge break to new mutiny,', 'Where civil blood makes civil hands unclean.', 'From forth the fatal loins of these two foes', 'A pair of star-cross\'d lovers take their life;', 'Whose misadventur\'d piteous overthrows', 'Doth with their death bury their parents\' strife.', 'The fearful passage of their death-mark\'d love,', 'And the continuance of their parents\' rage,', 'Which, but their children\'s end, naught could remove,', 'Is now the two hours\' traffic of our stage;', 'The which if you with patient ears attend,', 'What here shall miss, our toil shall strive to mend.'])).toEqual(expected);
    });
});

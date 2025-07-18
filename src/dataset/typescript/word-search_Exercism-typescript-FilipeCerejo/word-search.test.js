"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const word_search_1 = require("./word-search");
describe('single line grids', () => {
    it('Should accept an initial game grid', () => {
        const grid = ['jefblpepre'];
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch instanceof word_search_1.WordSearch).toEqual(true);
    });
    xit('can accept a target search word', () => {
        const grid = ['jefblpepre'];
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['glasnost'])).toEqual({ glasnost: undefined });
    });
    xit('should locate a word written left to right', () => {
        const grid = ['clojurermt'];
        const expectedResults = {
            clojure: {
                start: [1, 1],
                end: [1, 7],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['clojure'])).toEqual(expectedResults);
    });
    xit('can locate a left to right word in a different position', () => {
        const grid = ['mtclojurer'];
        const expectedResults = {
            clojure: {
                start: [1, 3],
                end: [1, 9],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['clojure'])).toEqual(expectedResults);
    });
    xit('can locate a different left to right word', () => {
        const grid = ['coffeelplx'];
        const expectedResults = {
            coffee: {
                start: [1, 1],
                end: [1, 6],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['coffee'])).toEqual(expectedResults);
    });
    xit('can locate that different left to right word in a different position', () => {
        const grid = ['xcoffeezlp'];
        const expectedResults = {
            coffee: {
                start: [1, 2],
                end: [1, 7],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['coffee'])).toEqual(expectedResults);
    });
});
describe('multi line grids', () => {
    xit('can locate a left to right word in a two line grid', () => {
        const grid = ['jefblpepre', 'clojurermt'];
        const expectedResults = {
            clojure: {
                start: [2, 1],
                end: [2, 7],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['clojure'])).toEqual(expectedResults);
    });
    xit('can locate a left to right word in a different position in a two line grid', () => {
        const grid = ['jefblpepre', 'tclojurerm'];
        const expectedResults = {
            clojure: {
                start: [2, 2],
                end: [2, 8],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['clojure'])).toEqual(expectedResults);
    });
    xit('can locate a left to right word in a three line grid', () => {
        const grid = ['camdcimgtc', 'jefblpepre', 'clojurermt'];
        const expectedResults = {
            clojure: {
                start: [3, 1],
                end: [3, 7],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['clojure'])).toEqual(expectedResults);
    });
    xit('can locate a left to right word in a ten line grid', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'jalaycalmp',
            'clojurermt',
        ];
        const expectedResults = {
            clojure: {
                start: [10, 1],
                end: [10, 7],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['clojure'])).toEqual(expectedResults);
    });
    xit('can locate a left to right word in a different position in a ten line grid', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'clojurermt',
            'jalaycalmp',
        ];
        const expectedResults = {
            clojure: {
                start: [9, 1],
                end: [9, 7],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['clojure'])).toEqual(expectedResults);
    });
    xit('can locate a different left to right word in a ten line grid', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'clojurermt',
            'jalaycalmp',
        ];
        const expectedResults = {
            scree: {
                start: [7, 1],
                end: [7, 5],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['scree'])).toEqual(expectedResults);
    });
});
describe('can find multiple words', () => {
    xit('can find two words written left to right', () => {
        const grid = [
            'aefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'jalaycalmp',
            'clojurermt',
            'xjavamtzlp',
        ];
        const expectedResults = {
            clojure: {
                start: [10, 1],
                end: [10, 7],
            },
            java: {
                start: [11, 2],
                end: [11, 5],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['java', 'clojure'])).toEqual(expectedResults);
    });
});
describe('different directions', () => {
    xit('should locate a single word written right to left', () => {
        const grid = ['rixilelhrs'];
        const expectedResults = {
            elixir: {
                start: [1, 6],
                end: [1, 1],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['elixir'])).toEqual(expectedResults);
    });
    xit('should locate multiple words written in different horizontal directions', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'jalaycalmp',
            'clojurermt',
        ];
        const expectedResults = {
            clojure: {
                start: [10, 1],
                end: [10, 7],
            },
            elixir: {
                start: [5, 6],
                end: [5, 1],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['elixir', 'clojure'])).toEqual(expectedResults);
    });
});
describe('vertical directions', () => {
    xit('should locate words written top to bottom', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'jalaycalmp',
            'clojurermt',
        ];
        const expectedResults = {
            clojure: {
                start: [10, 1],
                end: [10, 7],
            },
            elixir: {
                start: [5, 6],
                end: [5, 1],
            },
            ecmascript: {
                start: [1, 10],
                end: [10, 10],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['elixir', 'clojure', 'ecmascript'])).toEqual(expectedResults);
    });
    xit('should locate words written bottom to top', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'jalaycalmp',
            'clojurermt',
        ];
        const expectedResults = {
            clojure: {
                start: [10, 1],
                end: [10, 7],
            },
            elixir: {
                start: [5, 6],
                end: [5, 1],
            },
            ecmascript: {
                start: [1, 10],
                end: [10, 10],
            },
            rust: {
                start: [5, 9],
                end: [2, 9],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['elixir', 'clojure', 'ecmascript', 'rust'])).toEqual(expectedResults);
    });
    xit('should locate words written top left to bottom right', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'jalaycalmp',
            'clojurermt',
        ];
        const expectedResults = {
            clojure: {
                start: [10, 1],
                end: [10, 7],
            },
            elixir: {
                start: [5, 6],
                end: [5, 1],
            },
            ecmascript: {
                start: [1, 10],
                end: [10, 10],
            },
            rust: {
                start: [5, 9],
                end: [2, 9],
            },
            java: {
                start: [1, 1],
                end: [4, 4],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find(['clojure', 'elixir', 'ecmascript', 'rust', 'java'])).toEqual(expectedResults);
    });
    xit('should locate words written bottom right to top left', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'jalaycalmp',
            'clojurermt',
        ];
        const expectedResults = {
            clojure: {
                start: [10, 1],
                end: [10, 7],
            },
            elixir: {
                start: [5, 6],
                end: [5, 1],
            },
            ecmascript: {
                start: [1, 10],
                end: [10, 10],
            },
            rust: {
                start: [5, 9],
                end: [2, 9],
            },
            java: {
                start: [1, 1],
                end: [4, 4],
            },
            lua: {
                start: [9, 8],
                end: [7, 6],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find([
            'clojure',
            'elixir',
            'ecmascript',
            'rust',
            'java',
            'lua',
        ])).toEqual(expectedResults);
    });
    xit('should locate words written bottom left to top right', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'jalaycalmp',
            'clojurermt',
        ];
        const expectedResults = {
            clojure: {
                start: [10, 1],
                end: [10, 7],
            },
            elixir: {
                start: [5, 6],
                end: [5, 1],
            },
            ecmascript: {
                start: [1, 10],
                end: [10, 10],
            },
            rust: {
                start: [5, 9],
                end: [2, 9],
            },
            java: {
                start: [1, 1],
                end: [4, 4],
            },
            lua: {
                start: [9, 8],
                end: [7, 6],
            },
            lisp: {
                start: [6, 3],
                end: [3, 6],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find([
            'clojure',
            'elixir',
            'ecmascript',
            'rust',
            'java',
            'lua',
            'lisp',
        ])).toEqual(expectedResults);
    });
    xit('should locate words written top right to bottom left', () => {
        const grid = [
            'jefblpepre',
            'camdcimgtc',
            'oivokprjsm',
            'pbwasqroua',
            'rixilelhrs',
            'wolcqlirpc',
            'screeaumgr',
            'alxhpburyi',
            'jalaycalmp',
            'clojurermt',
        ];
        const expectedResults = {
            clojure: {
                start: [10, 1],
                end: [10, 7],
            },
            elixir: {
                start: [5, 6],
                end: [5, 1],
            },
            ecmascript: {
                start: [1, 10],
                end: [10, 10],
            },
            rust: {
                start: [5, 9],
                end: [2, 9],
            },
            java: {
                start: [1, 1],
                end: [4, 4],
            },
            lua: {
                start: [9, 8],
                end: [7, 6],
            },
            lisp: {
                start: [6, 3],
                end: [3, 6],
            },
            ruby: {
                start: [6, 8],
                end: [9, 5],
            },
        };
        const wordSearch = new word_search_1.WordSearch(grid);
        expect(wordSearch.find([
            'clojure',
            'elixir',
            'ecmascript',
            'rust',
            'java',
            'lua',
            'lisp',
            'ruby',
        ])).toEqual(expectedResults);
    });
});

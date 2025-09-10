function* combinations(len, items) {
    const indexes = Array.from({ length: len }, () => 0);
    while (true) {
        if (new Set(indexes).size === len) {
            yield indexes;
        }
        indexes[0]++;
        for (let i = 0; i < len; i++) {
            if (indexes[i] >= items.length) {
                if (i + 1 < len) {
                    indexes[i] = 0;
                    indexes[i + 1]++;
                } else {
                    return;
                }
            }
        }
    }
}

function make_map(digits, letters) {
    return letters.reduce((map, letter, i) => {
        map[letter] = digits[i];
        return map;
    }, {});
}

function translate(word, map) {
    return word.split('').reduce((total, letter) => total * 10 + map[letter], 0);
}

function get_letters(...words) {
    return [...new Set(words.join('').split(''))];
}

function solve(puzzle) {
    const [left, sum] = puzzle.split(' == ');
    const terms = left.split(' + ');
    const letters = get_letters(sum, ...terms);
    if (letters.length > 10) return null; // Early exit if more letters than digits
    const digits = Array.from({ length: 10 }, (_, i) => i);
    const firstLetters = new Set([sum[0], ...terms.map(word => word[0])]);
    let solution = null;

    for (const combination of combinations(letters.length, digits)) {
        if (new Set(combination).size !== combination.length) continue; // Skip invalid combinations
        const map = make_map(combination, letters);
        if ([...firstLetters].some(letter => map[letter] === 0)) continue; // Skip if leading zero
        const total = terms.reduce((acc, word) => acc + translate(word, map), 0);
        if (total === translate(sum, map)) {
            if (solution) return null; // More than one solution
            solution = map;
        }
    }
    return solution;
}

export default solve;
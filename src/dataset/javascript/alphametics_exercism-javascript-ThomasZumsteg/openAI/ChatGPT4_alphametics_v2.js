function* combinations(len, items) {
    const indexes = Array.from({ length: len }, () => 0);
    const maxIndex = items.length - 1;
    while (true) {
        if (new Set(indexes).size === len) {
            yield indexes;
        }
        let i = 0;
        while (i < len) {
            indexes[i]++;
            if (indexes[i] <= maxIndex) break;
            indexes[i] = 0;
            i++;
        }
        if (i === len) return;
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
    if (letters.length > 10) return null; // Early exit if letters exceed digits
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
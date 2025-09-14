function* combinations(len, items) {
    const indexes = new Array(len);
    for (let i = 0; i < len; i++) {
        indexes[i] = 0;
    }

    while (true) {
        const unique = new Set(indexes).size === len;
        if (unique) {
            yield [...indexes];
        }

        let i = 0;
        indexes[0]++;

        while (i < len && items.length < indexes[i] + 1) {
            indexes[i] = 0;
            i++;
            if (i < len) {
                indexes[i]++;
            } else {
                return;
            }
        }
    }
}

function make_map(digits, letters) {
    const map = {};
    for (let i = 0; i < digits.length; i++) {
        map[letters[i]] = digits[i];
    }
    return map;
}

function translate(word, map) {
    let total = 0;
    for (let i = 0; i < word.length; i++) {
        total = total * 10 + map[word[i]];
    }
    return total;
}

function get_letters(...words) {
    const lettersSet = new Set();
    for (const word of words) {
        for (let i = 0; i < word.length; i++) {
            lettersSet.add(word[i]);
        }
    }
    return Array.from(lettersSet);
}

function solve(puzzle) {
    const [termsStr, sum] = puzzle.split(' == ');
    const terms = termsStr.split(' + ');
    const letters = get_letters(sum, ...terms);
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const firstLettersSet = new Set([sum[0], ...terms.map(word => word[0])]);
    const first = Array.from(firstLettersSet);

    for (let combination of combinations(letters.length, digits)) {
        const map = make_map(combination, letters);
        let sumOfTerms = 0;
        for (const word of terms) {
            sumOfTerms += translate(word, map);
        }
        const sumValue = translate(sum, map);

        if (sumOfTerms === sumValue) {
            let firstZero = false;
            for (const l of first) {
                if (map[l] === 0) {
                    firstZero = true;
                    break;
                }
            }

            if (!firstZero) {
                return map;
            }
        }
    }

    return null;
}

export default solve;
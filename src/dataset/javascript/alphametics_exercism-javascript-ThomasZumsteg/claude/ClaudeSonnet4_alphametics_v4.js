function* combinations(len, items) {
    const maxIndex = items.length;
    const indexes = new Array(len).fill(0);
    const used = new Set();
    
    while (true) {
        used.clear();
        let isValid = true;
        for (let i = 0; i < len; i++) {
            if (used.has(indexes[i])) {
                isValid = false;
                break;
            }
            used.add(indexes[i]);
        }
        
        if (isValid) {
            yield indexes.slice();
        }
        
        let pos = 0;
        while (pos < len) {
            indexes[pos]++;
            if (indexes[pos] < maxIndex) {
                break;
            }
            indexes[pos] = 0;
            pos++;
        }
        
        if (pos === len) {
            return;
        }
    }
}

function make_map(digits, letters) {
    const map = {};
    const len = letters.length;
    for (let i = 0; i < len; i++) {
        map[letters[i]] = digits[i];
    }
    return map;
}

function translate(word, map) {
    let result = 0;
    const len = word.length;
    for (let i = 0; i < len; i++) {
        result = result * 10 + map[word[i]];
    }
    return result;
}

function get_letters(...words) {
    const letterSet = new Set();
    for (const word of words) {
        for (let i = 0; i < word.length; i++) {
            letterSet.add(word[i]);
        }
    }
    return Array.from(letterSet);
}

function solve(puzzle) {
    const [leftSide, sum] = puzzle.split(' == ');
    const terms = leftSide.split(' + ');
    const letters = get_letters(sum, ...terms);
    const digits = Array.from({length: 10}, (_, i) => i);
    
    const firstLetters = new Set();
    firstLetters.add(sum[0]);
    for (const term of terms) {
        firstLetters.add(term[0]);
    }
    const firstLettersArray = Array.from(firstLetters);
    
    let solutionCount = 0;
    let lastSolution = null;
    
    for (const combination of combinations(letters.length, digits)) {
        const map = make_map(combination, letters);
        
        let hasZeroFirst = false;
        for (const letter of firstLettersArray) {
            if (map[letter] === 0) {
                hasZeroFirst = true;
                break;
            }
        }
        
        if (hasZeroFirst) continue;
        
        let leftSum = 0;
        for (const term of terms) {
            leftSum += translate(term, map);
        }
        
        if (leftSum === translate(sum, map)) {
            solutionCount++;
            lastSolution = map;
            if (solutionCount > 1) {
                return null;
            }
        }
    }
    
    return solutionCount === 1 ? lastSolution : null;
}

export default solve;
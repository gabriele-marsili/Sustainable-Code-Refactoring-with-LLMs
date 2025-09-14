function* combinations(len, items) {
    if (len > items.length) return;
    
    const indexes = Array.from({length: len}, (_, i) => i);
    const maxIndex = items.length - 1;
    
    do {
        const indexSet = new Set(indexes);
        if (indexSet.size === len) {
            yield [...indexes];
        }
        
        let i = 0;
        while (i < len) {
            if (indexes[i] < maxIndex) {
                indexes[i]++;
                break;
            } else {
                indexes[i] = 0;
                i++;
            }
        }
        
        if (i === len) return;
    } while (true);
}

function make_map(digits, letters) {
    const map = {};
    const length = Math.min(digits.length, letters.length);
    for (let i = 0; i < length; i++) {
        map[letters[i]] = digits[i];
    }
    return map;
}

function translate(word, map) {
    let result = 0;
    for (let i = 0; i < word.length; i++) {
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
        
        let termSum = 0;
        for (const term of terms) {
            termSum += translate(term, map);
        }
        
        if (termSum === translate(sum, map)) {
            solutionCount++;
            lastSolution = map;
            if (solutionCount > 1) return null;
        }
    }
    
    return solutionCount === 1 ? lastSolution : null;
}

export default solve;
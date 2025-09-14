function* combinations(len, items) {
    if (len > items.length) return;
    
    const indexes = Array.from({length: len}, (_, i) => i);
    
    while (true) {
        yield [...indexes];
        
        let i = len - 1;
        while (i >= 0 && indexes[i] === items.length - len + i) {
            i--;
        }
        
        if (i < 0) return;
        
        indexes[i]++;
        for (let j = i + 1; j < len; j++) {
            indexes[j] = indexes[j - 1] + 1;
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
    
    let solution = null;
    let solutionCount = 0;
    
    for (const combination of combinations(letters.length, digits)) {
        const map = make_map(combination, letters);
        
        // Check first letter constraint early
        let hasFirstZero = false;
        for (const letter of firstLettersArray) {
            if (map[letter] === 0) {
                hasFirstZero = true;
                break;
            }
        }
        if (hasFirstZero) continue;
        
        // Calculate sum of terms
        let termSum = 0;
        for (const term of terms) {
            termSum += translate(term, map);
        }
        
        if (termSum === translate(sum, map)) {
            solution = map;
            solutionCount++;
            if (solutionCount > 1) return null;
        }
    }
    
    return solutionCount === 1 ? solution : null;
}

export default solve;
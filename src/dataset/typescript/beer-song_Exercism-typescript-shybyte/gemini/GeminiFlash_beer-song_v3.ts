function bottles(n: number): string {
    if (n === 0) {
        return 'no more bottles';
    }
    return n === 1 ? '1 bottle' : n + ' bottles';
}

function action(n: number): string {
    if (n === 0) {
        return 'Go to the store and buy some more';
    }
    return 'Take ' + (n === 1 ? 'it' : 'one') + ' down and pass it around';
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function verse(beerNumber: number): string {
    const bottlesCurrent = bottles(beerNumber);
    const situation = capitalize(`${bottlesCurrent} of beer on the wall, ${bottlesCurrent} of beer.\n`);
    const nextNumber = beerNumber === 0 ? 99 : beerNumber - 1;
    return situation + action(beerNumber) + `, ${bottles(nextNumber)} of beer on the wall.\n`;
}

function sing(beerMax: number = 99, beerMin: number = 0): string {
    let result = '';
    for (let i = beerMax; i >= beerMin; i--) {
        result += verse(i);
        if (i !== beerMin) {
            result += '\n';
        }
    }
    return result;
}

export default { verse, sing };
const BOTTLE_STRINGS = ['no more bottles', '1 bottle'] as const;
const ACTION_STRINGS = [
    'Go to the store and buy some more',
    'Take it down and pass it around',
    'Take one down and pass it around'
] as const;

function bottles(n: number): string {
    return n <= 1 ? BOTTLE_STRINGS[n] || BOTTLE_STRINGS[0] : `${n} bottles`;
}

function action(n: number): string {
    return ACTION_STRINGS[n <= 1 ? n : 2];
}

function capitalize(s: string): string {
    return s[0].toUpperCase() + s.slice(1);
}

function verse(beerNumber: number): string {
    const bottleText = bottles(beerNumber);
    const situation = capitalize(`${bottleText} of beer on the wall, ${bottleText} of beer.\n`);
    const nextNumber = beerNumber === 0 ? 99 : beerNumber - 1;
    return situation + action(beerNumber) + `, ${bottles(nextNumber)} of beer on the wall.\n`;
}

function sing(beerMax = 99, beerMin = 0): string {
    let result = '';
    for (let i = beerMax; i >= beerMin; i--) {
        if (result) result += '\n';
        result += verse(i);
    }
    return result;
}

export default {verse, sing}
function bottles(n: number) {
    if (n === 0) return 'no more bottles'
    if (n === 1) return '1 bottle'
    return n + ' bottles'
}

function action(n: number) {
    if (n === 0) return 'Go to the store and buy some more'
    if (n === 1) return 'Take it down and pass it around'
    return 'Take one down and pass it around'
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function verse(beerNumber: number) {
    const bottlesText = bottles(beerNumber)
    const situation = capitalize(`${bottlesText} of beer on the wall, ${bottlesText} of beer.\n`)
    const nextNumber = beerNumber === 0 ? 99 : beerNumber - 1
    return situation + action(beerNumber) + `, ${bottles(nextNumber)} of beer on the wall.\n`
}

function sing(beerMax = 99, beerMin = 0) {
    let result = ''
    for (let i = beerMax; i >= beerMin; i--) {
        if (result) result += '\n'
        result += verse(i)
    }
    return result
}

export default {verse, sing}
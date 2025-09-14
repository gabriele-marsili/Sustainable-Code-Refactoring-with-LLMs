const GIFTS = [
    'twelve Drummers Drumming',
    'eleven Pipers Piping',
    'ten Lords-a-Leaping',
    'nine Ladies Dancing',
    'eight Maids-a-Milking',
    'seven Swans-a-Swimming',
    'six Geese-a-Laying',
    'five Gold Rings',
    'four Calling Birds',
    'three French Hens',
    'two Turtle Doves',
    'a Partridge in a Pear Tree',
] as const

const ORDINAL_WORDS = [
    'first', 'second', 'third', 'fourth', 'fifth',
    'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
] as const

// Pre-computed gift combinations to avoid repeated slicing and joining
const GIFT_COMBINATIONS = GIFTS.map((_, index) => {
    const gifts = GIFTS.slice(-(index + 1))
    if (gifts.length === 1) {
        return gifts[0]
    }
    return gifts.slice(0, -1).join(', ') + ', and ' + gifts[gifts.length - 1]
})

class TwelveDays {
    static recite(first: number, last = first) {
        let result = ''
        for (let i = first; i <= last; i++) {
            result += `On the ${ORDINAL_WORDS[i - 1]} day of Christmas my true love gave to me, ${GIFT_COMBINATIONS[i - 1]}.\n`
        }
        return result
    }
}

export default TwelveDays

function concatWithCommaOrAnd(gifts: string[]) {
    if (gifts.length === 1) {
        return gifts[0]
    }
    return gifts.slice(0, -1).join(', ') + ', and ' + gifts[gifts.length - 1]
}

function oneVerse(n: number) {
    return `On the ${ORDINAL_WORDS[n - 1]} day of Christmas my true love gave to me, ${GIFT_COMBINATIONS[n - 1]}.\n`
}
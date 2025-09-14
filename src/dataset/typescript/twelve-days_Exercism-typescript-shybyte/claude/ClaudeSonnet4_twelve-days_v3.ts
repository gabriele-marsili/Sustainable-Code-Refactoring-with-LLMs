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

const PRECOMPUTED_VERSES = ORDINAL_WORDS.map((ordinal, index) => {
    const n = index + 1
    const gifts = GIFTS.slice(-n)
    const giftsText = gifts.length === 1 
        ? gifts[0] 
        : gifts.slice(0, -1).join(', ') + ', and ' + gifts[gifts.length - 1]
    return `On the ${ordinal} day of Christmas my true love gave to me, ${giftsText}.\n`
})

class TwelveDays {
    static recite(first: number, last = first) {
        let result = ''
        for (let i = first; i <= last; i++) {
            result += PRECOMPUTED_VERSES[i - 1]
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
    return PRECOMPUTED_VERSES[n - 1]
}
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

class TwelveDays {
    static recite(first: number, last = first): string {
        let result = ''
        for (let i = first; i <= last; i++) {
            result += oneVerse(i)
        }
        return result
    }
}

export default TwelveDays

function oneVerse(n: number): string {
    const gifts = GIFTS.slice(-n)
    let giftsText: string
    
    if (n === 1) {
        giftsText = gifts[0]
    } else {
        giftsText = gifts.slice(0, -1).join(', ') + ', and ' + gifts[n - 1]
    }
    
    return `On the ${ORDINAL_WORDS[n - 1]} day of Christmas my true love gave to me, ${giftsText}.\n`
}
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
];

const ORDINAL_WORDS = [
    'first', 'second', 'third', 'fourth', 'fifth',
    'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
];

class TwelveDays {
    static recite(first: number, last = first): string {
        let result = '';
        for (let i = first; i <= last; i++) {
            result += TwelveDays.oneVerse(i);
        }
        return result;
    }

    private static oneVerse(n: number): string {
        let giftsText = '';
        if (n === 1) {
            giftsText = GIFTS[11];
        } else {
            for (let i = n - 1; i >= 0; i--) {
                giftsText += GIFTS[12 - n + i];
                if (i > 1) {
                    giftsText += ', ';
                } else if (i === 1) {
                    giftsText += ', and ';
                }
            }
        }
        return `On the ${ORDINAL_WORDS[n - 1]} day of Christmas my true love gave to me, ${giftsText}.\n`;
    }
}

export default TwelveDays
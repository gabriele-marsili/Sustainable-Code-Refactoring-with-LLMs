const days = [
    { day: "first", gift: "a Partridge in a Pear Tree" },
    { day: "second", gift: "two Turtle Doves" },
    { day: "third", gift: "three French Hens" },
    { day: "fourth", gift: "four Calling Birds" },
    { day: "fifth", gift: "five Gold Rings" },
    { day: "sixth", gift: "six Geese-a-Laying" },
    { day: "seventh", gift: "seven Swans-a-Swimming" },
    { day: "eighth", gift: "eight Maids-a-Milking" },
    { day: "ninth", gift: "nine Ladies Dancing" },
    { day: "tenth", gift: "ten Lords-a-Leaping" },
    { day: "eleventh", gift: "eleven Pipers Piping" },
    { day: "twelfth", gift: "twelve Drummers Drumming" },
];

class TwelveDays {
    verse(verses) {
        const [start, end = verses[0]] = verses.map(v => v - 1);
        const result = [];

        for (let current = start; current <= end; current++) {
            const gifts = days
                .slice(0, current + 1)
                .reverse()
                .map((day, index) => (index === 0 && current > 0 ? "and " : "") + day.gift)
                .join(", ");
            result.push(`On the ${days[current].day} day of Christmas my true love gave to me, ${gifts}.\n`);
        }

        return result.join('\n');
    }

    sing() {
        return this.verse([1, 12]);
    }
}

export default TwelveDays;
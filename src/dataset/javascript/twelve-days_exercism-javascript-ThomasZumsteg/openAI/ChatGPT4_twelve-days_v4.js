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
        return Array.from({ length: end - start + 1 }, (_, i) => {
            const current = start + i;
            const gifts = Array.from({ length: current + 1 }, (_, v) => {
                const index = current - v;
                return (index === 0 && current !== 0 ? "and " : "") + days[index].gift;
            }).join(", ");
            return `On the ${days[current].day} day of Christmas my true love gave to me, ${gifts}.\n`;
        }).join('\n');
    }

    sing() {
        return this.verse([1, 12]);
    }
}

export default TwelveDays;
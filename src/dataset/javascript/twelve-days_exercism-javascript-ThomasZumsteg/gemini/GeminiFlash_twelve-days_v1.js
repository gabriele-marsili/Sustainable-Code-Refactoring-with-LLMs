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

const baseLine = "On the ";
const christmasLine = " day of Christmas my true love gave to me";
const andString = "and ";
const commaString = ", ";
const periodNewLine = ".\n";

class TwelveDays {
    verse(verses) {
        const start = verses[0] - 1;
        const end = verses[1] || start + 1;
        const result = [];

        for (let current = start; current < end; current++) {
            let line = baseLine + days[current].day + christmasLine;
            for (let v = current; v >= 0; v--) {
                line += commaString + (v === 0 && current !== 0 ? andString : "") + days[v].gift;
            }
            result.push(line + periodNewLine);
        }
        return result.join('\n');
    }

    sing() {
        return this.verse([1, 12]);
    }
}

export default TwelveDays;
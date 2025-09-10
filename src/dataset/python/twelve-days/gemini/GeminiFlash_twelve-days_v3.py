def recite(start_verse, end_verse):
    days = {
        1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth',
        6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth',
        11: 'eleventh', 12: 'twelfth'
    }
    gifts = [
        'a Partridge in a Pear Tree', 'two Turtle Doves', 'three French Hens',
        'four Calling Birds', 'five Gold Rings', 'six Geese-a-Laying',
        'seven Swans-a-Swimming', 'eight Maids-a-Milking', 'nine Ladies Dancing',
        'ten Lords-a-Leaping', 'eleven Pipers Piping', 'twelve Drummers Drumming'
    ]

    lyrics = []
    for d in range(start_verse, end_verse + 1):
        verse = f"On the {days[d]} day of Christmas my true love gave to me: "
        verse += ", ".join(
            ("and " + gifts[i] if i == 0 and d > 1 else gifts[i])
            for i in range(d - 1, -1, -1)
        ) + "."
        lyrics.append(verse)
    return lyrics
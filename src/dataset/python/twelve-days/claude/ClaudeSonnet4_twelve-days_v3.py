DAYS = ('', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 
        'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth')

GIFTS = ('', 'a Partridge in a Pear Tree', 'two Turtle Doves', 'three French Hens',
         'four Calling Birds', 'five Gold Rings', 'six Geese-a-Laying',
         'seven Swans-a-Swimming', 'eight Maids-a-Milking', 'nine Ladies Dancing',
         'ten Lords-a-Leaping', 'eleven Pipers Piping', 'twelve Drummers Drumming')

def recite(start_verse, end_verse):
    lyrics = []
    for d in range(start_verse, end_verse + 1):
        verse_parts = [f"On the {DAYS[d]} day of Christmas my true love gave to me: "]
        
        for x in range(d, 0, -1):
            if x == 1 and d > 1:
                verse_parts.append("and ")
            verse_parts.append(GIFTS[x])
            verse_parts.append("." if x == 1 else ", ")
        
        lyrics.append(''.join(verse_parts))
    return lyrics
days = { 1 : 'first',
         2 : 'second',
         3 : 'third',
         4 : 'fourth',
         5 : 'fifth',
         6 : 'sixth',
         7 : 'seventh',
         8 : 'eighth',
         9 : 'ninth',
        10 : 'tenth',
        11 : 'eleventh',
        12 : 'twelfth' }
gifts = { 1 : 'a Partridge in a Pear Tree',
          2 : 'two Turtle Doves',
          3 : 'three French Hens',
          4 : 'four Calling Birds',
          5 : 'five Gold Rings',
          6 : 'six Geese-a-Laying',
          7 : 'seven Swans-a-Swimming',
          8 : 'eight Maids-a-Milking',
          9 : 'nine Ladies Dancing',
         10 : 'ten Lords-a-Leaping',
         11 : 'eleven Pipers Piping',
         12 : 'twelve Drummers Drumming' } 
def recite(start_verse, end_verse):
    lyrics = []
    for d in range (start_verse, end_verse + 1):
        verse = f"On the {days[d]} day of Christmas my true love gave to me: "
        for x in range (d, 0, -1):
            verse = verse + ("and " if (x == 1 and d > 1) else "")
            verse = verse + gifts[x]
            verse = verse + ("." if x == 1 else ", ")
        lyrics.append(verse)
    return lyrics     

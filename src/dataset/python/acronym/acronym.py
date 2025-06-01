def abbreviate(words):
    words = words.replace('-', ' ')
    words = words.replace('_', ' ')
    wl = words.split()
    return "".join([x[0].upper() for x in wl])
 
    

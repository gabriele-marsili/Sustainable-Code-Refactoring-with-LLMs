def response(hey_bob):
    hey_bob = hey_bob.strip() # strip trailing whitespaces
    if hey_bob == "" or hey_bob.isspace(): # nothing or whitespaces 
        return "Fine. Be that way!"
    if (not hey_bob.isupper() and hey_bob[-1] == '?'): # lowercase question 
        return "Sure."
    if hey_bob.isupper() and hey_bob[-1] != '?': # uppercase affirmation 
        return "Whoa, chill out!"
    if hey_bob.isupper() and hey_bob[-1] == '?': # uppercase question 
        return "Calm down, I know what I'm doing!"
    else: # whatever else...
        return "Whatever."



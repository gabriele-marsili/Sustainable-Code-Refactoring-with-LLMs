def response(hey_bob):
    hey_bob = hey_bob.strip()
    if not hey_bob:
        return "Fine. Be that way!"
    
    is_upper = hey_bob.isupper()
    is_question = hey_bob[-1] == '?'
    
    if is_upper and is_question:
        return "Calm down, I know what I'm doing!"
    if is_upper:
        return "Whoa, chill out!"
    if is_question:
        return "Sure."
    return "Whatever."
def response(hey_bob):
    hey_bob = hey_bob.strip()

    if not hey_bob:
        return "Fine. Be that way!"

    is_question = hey_bob.endswith('?')
    is_shouting = hey_bob.isupper()

    if is_shouting and is_question:
        return "Calm down, I know what I'm doing!"
    elif is_shouting:
        return "Whoa, chill out!"
    elif is_question:
        return "Sure."
    else:
        return "Whatever."
def response(hey_bob):
    stripped_input = hey_bob.strip()

    if not stripped_input:
        return "Fine. Be that way!"

    is_shouting = stripped_input.isupper()
    is_question = stripped_input.endswith('?')

    if is_shouting and is_question:
        return "Calm down, I know what I'm doing!"
    elif is_shouting:
        return "Whoa, chill out!"
    elif is_question:
        return "Sure."
    else:
        return "Whatever."
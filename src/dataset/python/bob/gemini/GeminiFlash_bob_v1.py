def response(hey_bob):
    stripped_message = hey_bob.strip()

    if not stripped_message:
        return "Fine. Be that way!"

    is_question = stripped_message.endswith('?')
    is_shouting = stripped_message.isupper()

    if is_shouting and is_question:
        return "Calm down, I know what I'm doing!"
    elif is_shouting:
        return "Whoa, chill out!"
    elif is_question:
        return "Sure."
    else:
        return "Whatever."
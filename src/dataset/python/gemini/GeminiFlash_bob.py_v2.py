def response(hey_bob):
    hey_bob_stripped = hey_bob.strip()

    if not hey_bob_stripped:
        # Handles empty string or string containing only whitespaces after stripping.
        return "Fine. Be that way!"

    is_question = hey_bob_stripped.endswith('?')
    is_shouting = hey_bob_stripped.isupper()

    if is_shouting and is_question:
        # Uppercase question
        return "Calm down, I know what I'm doing!"
    elif is_shouting:
        # Uppercase affirmation (implies not a question)
        return "Whoa, chill out!"
    elif is_question:
        # Lowercase question (implies not shouting)
        return "Sure."
    else:
        # Whatever else (not shouting and not a question)
        return "Whatever."
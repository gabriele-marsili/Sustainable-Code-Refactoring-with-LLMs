def response(hey_bob):
    hey_bob_stripped = hey_bob.strip()

    if not hey_bob_stripped:
        # Handles cases where the input is empty or consists only of whitespace.
        # Stripping first consolidates the check for empty and all-whitespace strings.
        return "Fine. Be that way!"

    # Now we know hey_bob_stripped is not empty, so hey_bob_stripped[-1] is safe.
    # Pre-calculate string properties to avoid redundant computations,
    # especially for potentially expensive operations like .isupper().
    is_question = (hey_bob_stripped[-1] == '?')
    is_upper = hey_bob_stripped.isupper()

    if is_upper:
        if is_question:
            # All uppercase and ends with a question mark
            return "Calm down, I know what I'm doing!"
        else:
            # All uppercase but does not end with a question mark
            return "Whoa, chill out!"
    elif is_question:
        # Not all uppercase (i.e., mixed case or lowercase) and ends with a question mark
        return "Sure."
    else:
        # Default case: Not all uppercase and does not end with a question mark
        return "Whatever."
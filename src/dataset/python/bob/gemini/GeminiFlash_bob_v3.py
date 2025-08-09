def response(hey_bob):
    # Strip leading and trailing whitespaces once to normalize the input.
    # This avoids redundant stripping and ensures consistent checks.
    cleaned_input = hey_bob.strip()

    # Case 1: Handle empty strings or strings consisting only of whitespace.
    # If the string is empty after stripping, it means the original input
    # was either empty or contained only whitespace characters.
    if not cleaned_input:
        return "Fine. Be that way!"

    # Pre-calculate characteristics of the cleaned input to avoid redundant
    # string traversals and improve performance.
    # `isupper()` involves iterating through the string, so calling it once is efficient.
    is_shouting = cleaned_input.isupper()
    # `endswith()` is typically optimized for checking suffixes.
    is_question = cleaned_input.endswith('?')

    # Case 2: Shouting question (e.g., "HOW ARE YOU?").
    # This combination is specific and should be checked first among the non-empty cases
    # to maintain the original logic's precedence.
    if is_shouting and is_question:
        return "Calm down, I know what I'm doing!"

    # Case 3: Shouting affirmation (e.g., "WATCH OUT!").
    # If it's shouting but not a question, this rule applies.
    # This check follows the shouting question as it's also a specific shouting type.
    if is_shouting:  # Already confirmed not a shouting question by previous if block
        return "Whoa, chill out!"

    # Case 4: Non-shouting question (e.g., "How are you?").
    # If control reaches here, the input is not empty, not a shouting question,
    # and not a shouting affirmation. Thus, if it's a question, it must be a non-shouting one.
    if is_question:
        return "Sure."

    # Case 5: Default response for all other scenarios.
    # This covers regular statements (e.g., "Good morning."),
    # or inputs that don't fit the above specific categories.
    return "Whatever."
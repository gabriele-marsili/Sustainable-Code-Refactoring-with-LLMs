def response(hey_bob):
    hey_bob = hey_bob.strip()

    # Handle empty or all-whitespace strings first
    if not hey_bob:
        return "Fine. Be that way!"

    # Cache string properties to avoid redundant computations
    # .isupper() can be a relatively expensive operation for long strings
    is_all_caps = hey_bob.isupper()
    ends_with_question_mark = hey_bob[-1] == '?' # hey_bob is guaranteed not to be empty here

    # Use a nested conditional structure to efficiently determine the response
    if is_all_caps:
        if ends_with_question_mark:
            return "Calm down, I know what I'm doing!"
        else:
            return "Whoa, chill out!"
    else:
        if ends_with_question_mark:
            return "Sure."
        else:
            return "Whatever."
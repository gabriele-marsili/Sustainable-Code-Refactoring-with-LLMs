def count_positives(numbers):
    results = {0}

    # make all combinations
    for num in numbers:
        results = {res + num for res in results} | {res - num for res in results}

    # count unique positives
    return sum(1 for res in results if res >= 0)
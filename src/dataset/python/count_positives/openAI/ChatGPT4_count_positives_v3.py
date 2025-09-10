def count_positives(numbers):
    results = {0}

    for num in numbers:
        results = {res + num for res in results} | {res - num for res in results}

    return sum(1 for res in results if res >= 0)
def count_positives(numbers):
    if not numbers:
        return 1
    
    results = {0}
    
    for num in numbers:
        results = {res + sign * num for res in results for sign in (1, -1)}
    
    return sum(1 for res in results if res >= 0)
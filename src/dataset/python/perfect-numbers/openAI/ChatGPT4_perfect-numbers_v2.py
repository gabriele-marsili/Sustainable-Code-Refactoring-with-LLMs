def classify(number):
    if number <= 0:
        raise ValueError("The value is inferior or equal to zero which is not a natural number")
    
    aliquot = 1  # Start with 1 since 1 is a divisor for all natural numbers
    limit = int(number**0.5) + 1  # Only iterate up to the square root of the number
    for i in range(2, limit):
        if number % i == 0:
            aliquot += i
            if i != number // i:  # Avoid adding the square root twice for perfect squares
                aliquot += number // i
    
    if aliquot == number:
        return 'perfect'
    elif aliquot > number:
        return 'abundant'
    else:
        return 'deficient'
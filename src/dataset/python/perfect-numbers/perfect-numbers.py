def classify(number):
    if number <= 0:
        raise ValueError("The value is inferior or equal to zero which is not a natural number")
    
    aliquot = 1
    limit = int(number**0.5) + 1
    for i in range(2, limit):
        if number % i == 0:
            aliquot += i
            if i != number // i:
                aliquot += number // i
    
    if aliquot == number:
        return 'perfect'
    elif aliquot > number:
        return 'abundant'
    else:
        return 'deficient'
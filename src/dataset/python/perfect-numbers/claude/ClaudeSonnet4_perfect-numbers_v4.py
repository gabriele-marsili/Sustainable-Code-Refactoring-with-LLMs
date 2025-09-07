def classify(number):
    if number <= 0:
        raise ValueError("The value is inferior or equal to zero which is not a natural number")
    
    if number == 1:
        return 'deficient'
    
    aliquot = 1
    i = 2
    while i * i <= number:
        if number % i == 0:
            aliquot += i
            if i * i != number:
                aliquot += number // i
        i += 1
    
    if aliquot == number:
        return 'perfect'
    elif aliquot > number:
        return 'abundant'
    else:
        return 'deficient'
def classify(number):
    if number <= 0:
        raise ValueError("The value is inferior or equal to zero which is not a natural number")
    
    aliquot = sum(i for i in range(1, int(number**0.5) + 1) if number % i == 0 and i != number)
    aliquot += sum(number // i for i in range(1, int(number**0.5) + 1) if number % i == 0 and i != 1 and i != number // i)
    
    if aliquot == number:
        return 'perfect'
    elif aliquot > number:
        return 'abundant'
    else:
        return 'deficient'
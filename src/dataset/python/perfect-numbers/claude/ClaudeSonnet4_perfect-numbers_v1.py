def classify(number):
    if number <= 0:
        raise ValueError("The value is inferior or equal to zero which is not a natural number")
    
    if number == 1:
        return 'deficient'
    
    aliquot = 1  # 1 is always a divisor
    sqrt_num = int(number ** 0.5)
    
    for i in range(2, sqrt_num + 1):
        if number % i == 0:
            aliquot += i
            if i != number // i:  # avoid counting the same divisor twice for perfect squares
                aliquot += number // i
    
    if aliquot == number:
        return 'perfect'
    elif aliquot > number:
        return 'abundant'
    else:
        return 'deficient'
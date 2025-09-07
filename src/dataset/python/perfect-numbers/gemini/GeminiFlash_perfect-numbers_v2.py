def classify(number):
    if number <= 0:
        raise ValueError("The value is inferior or equal to zero which is not a natural number")

    aliquot = 0
    for i in range(1, int(number**0.5) + 1):
        if number % i == 0:
            if i * i != number and i != 1:
                aliquot += i + number // i
            elif i == 1:
                aliquot += 1
            elif i * i == number:
                aliquot += i

    if aliquot == number:
        return 'perfect'
    elif aliquot > number:
        return 'abundant'
    else:
        return 'deficient'
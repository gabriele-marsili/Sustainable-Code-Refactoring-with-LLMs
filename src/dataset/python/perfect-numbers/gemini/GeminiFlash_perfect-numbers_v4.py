def classify(number):
    if number <= 0:
        raise ValueError("The value is inferior or equal to zero which is not a natural number")

    aliquot_sum = 0
    for i in range(1, int(number**0.5) + 1):
        if number % i == 0:
            if i * i == number:
                aliquot_sum += i
            else:
                aliquot_sum += i + number // i
    aliquot_sum -= number

    if aliquot_sum == number:
        return 'perfect'
    elif aliquot_sum > number:
        return 'abundant'
    else:
        return 'deficient'
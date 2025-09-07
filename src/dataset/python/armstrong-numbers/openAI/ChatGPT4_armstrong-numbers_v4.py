def is_armstrong_number(number):
    digits = str(number)
    power = len(digits)
    sum_digits = sum(int(e) ** power for e in digits)
    return sum_digits == number
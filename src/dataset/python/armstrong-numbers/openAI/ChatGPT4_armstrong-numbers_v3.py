def is_armstrong_number(number):
    digits = list(map(int, str(number)))
    power = len(digits)
    return sum(digit ** power for digit in digits) == number
def is_armstrong_number(number):
    str_number = str(number)
    num_digits = len(str_number)
    sum_digits = sum(int(digit) ** num_digits for digit in str_number)
    return sum_digits == number
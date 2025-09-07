def is_armstrong_number(number):
    num_str = str(number)
    num_digits = len(num_str)
    sum_digits = sum(int(digit) ** num_digits for digit in num_str)
    return sum_digits == number
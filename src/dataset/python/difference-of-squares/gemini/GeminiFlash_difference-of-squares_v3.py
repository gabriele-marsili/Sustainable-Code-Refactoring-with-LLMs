def square_of_sum(number):
    n = number
    sum_n = n * (n + 1) // 2
    return sum_n**2

def sum_of_squares(number):
    n = number
    return n * (n + 1) * (2 * n + 1) // 6


def difference_of_squares(number):
    n = number
    sum_n = n * (n + 1) // 2
    square_of_sum_val = sum_n**2
    sum_of_squares_val = n * (n + 1) * (2 * n + 1) // 6
    return square_of_sum_val - sum_of_squares_val
def square_of_sum(number):
    n = number
    return (n * (n + 1) // 2) ** 2

def sum_of_squares(number):
    n = number
    return (n * (n + 1) * (2 * n + 1)) // 6


def difference_of_squares(number):
    n = number
    sum_of_n = n * (n + 1) // 2
    return sum_of_n * sum_of_n - (n * (n + 1) * (2 * n + 1)) // 6
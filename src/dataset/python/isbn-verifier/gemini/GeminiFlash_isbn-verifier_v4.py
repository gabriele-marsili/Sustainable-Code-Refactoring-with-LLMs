def is_valid(isbn):
    isbn = isbn.replace('-', '')
    if len(isbn) != 10:
        return False

    sum_isbn = 0
    for i, digit in enumerate(isbn[:-1]):
        if not digit.isdigit():
            return False
        sum_isbn += int(digit) * (10 - i)

    last_char = isbn[-1]
    if last_char == 'X':
        sum_isbn += 10
    elif last_char.isdigit():
        sum_isbn += int(last_char)
    else:
        return False

    return sum_isbn % 11 == 0
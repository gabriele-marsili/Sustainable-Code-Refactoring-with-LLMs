def is_valid(isbn):
    isbn = isbn.replace('-', '')
    if len(isbn) != 10:
        return False

    sum_isbn = 0
    x = 10
    for i, char in enumerate(isbn):
        if i < 9:
            if not char.isdigit():
                return False
            sum_isbn += int(char) * x
        else:
            if char == 'X':
                sum_isbn += 10
            elif char.isdigit():
                sum_isbn += int(char)
            else:
                return False
        x -= 1

    return sum_isbn % 11 == 0
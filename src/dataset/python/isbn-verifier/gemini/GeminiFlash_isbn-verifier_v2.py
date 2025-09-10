def is_valid(isbn):
    isbn = isbn.replace('-', '')
    if len(isbn) != 10:
        return False

    sum_isbn = 0
    x = 10

    for i, char in enumerate(isbn):
        if i < 9:
            if '0' <= char <= '9':
                sum_isbn += int(char) * x
            else:
                return False
        else:
            if char == 'X':
                sum_isbn += 10
            elif '0' <= char <= '9':
                sum_isbn += int(char)
            else:
                return False
        x -= 1

    return sum_isbn % 11 == 0
def palindrome_integer_1(x):
    if x < 0:
        return False

    rev, temp = 0, x
    while temp:
        rev = rev * 10 + temp % 10
        temp //= 10

    return rev == x

def palindrome_integer_2(x):
    if x < 0 or (x % 10 == 0 and x != 0):
        return False

    rev = 0
    while x > rev:
        rev = rev * 10 + x % 10
        x //= 10

    return rev == x or rev // 10 == x
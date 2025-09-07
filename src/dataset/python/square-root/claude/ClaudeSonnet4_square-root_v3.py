def square_root(number):
    if number == 0 or number == 1:
        return number
    
    if number < 0:
        raise ValueError("Cannot compute square root of negative number")
    
    x = number
    while True:
        root = (x + number / x) / 2
        if abs(x - root) < 1e-10:
            break
        x = root
    
    return int(root) if root == int(root) else root
def square_root(number):
    if number == 0:
        return 0
    if number == 1:
        return 1
    
    root = number
    while True:
        new_root = (root + number / root) / 2
        if abs(root - new_root) < 1e-10:
            break
        root = new_root
    
    int_root = int(root)
    if int_root * int_root == number:
        return int_root
    elif (int_root + 1) * (int_root + 1) == number:
        return int_root + 1
    else:
        return root
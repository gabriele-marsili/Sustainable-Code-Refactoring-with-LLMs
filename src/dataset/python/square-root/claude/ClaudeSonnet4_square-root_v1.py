def square_root(number):
    if number == 0 or number == 1:
        return number
    
    # Use binary search for integer square root
    left, right = 1, number
    
    while left <= right:
        mid = (left + right) // 2
        square = mid * mid
        
        if square == number:
            return mid
        elif square < number:
            left = mid + 1
            result = mid
        else:
            right = mid - 1
    
    return result
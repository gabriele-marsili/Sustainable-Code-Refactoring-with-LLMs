from random import randrange

def shuffle_array(arr):
    n = len(arr)
    
    for i in range(n - 1, 0, -1):
        j = randrange(i + 1)
        arr[i], arr[j] = arr[j], arr[i]
    
    return arr
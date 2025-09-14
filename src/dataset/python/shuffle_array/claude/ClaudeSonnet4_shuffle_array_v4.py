from random import randint

def shuffle_array(arr):
    n = len(arr)
    
    for i in range(n - 1):
        rand = randint(i, n - 1)
        if rand != i:
            arr[i], arr[rand] = arr[rand], arr[i]
    
    return arr
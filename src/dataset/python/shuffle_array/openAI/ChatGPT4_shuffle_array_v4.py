from random import randint

def shuffle_array(arr):
    for i in range(len(arr) - 1, 0, -1):
        rand = randint(0, i)
        arr[i], arr[rand] = arr[rand], arr[i]
    return arr
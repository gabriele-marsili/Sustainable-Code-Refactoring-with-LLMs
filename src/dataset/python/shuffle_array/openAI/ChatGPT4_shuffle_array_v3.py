from random import randrange

def shuffle_array(arr):
    for i in range(len(arr) - 1, 0, -1):
        rand = randrange(i + 1)
        arr[i], arr[rand] = arr[rand], arr[i]
    return arr
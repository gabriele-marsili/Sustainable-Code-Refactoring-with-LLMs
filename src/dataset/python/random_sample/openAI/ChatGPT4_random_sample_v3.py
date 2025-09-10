from random import randint, random

def reservoir_sampling(arr, k):
    sample = arr[:k]
    for i in range(k, len(arr)):
        j = randint(0, i)
        if j < k:
            sample[j] = arr[i]
    return sample

def probabilistic_sampling(arr, k):
    sample = []
    n = len(arr)
    for el in arr:
        if k == 0:
            break
        if random() < (k / n):
            sample.append(el)
            k -= 1
        n -= 1
    return sample
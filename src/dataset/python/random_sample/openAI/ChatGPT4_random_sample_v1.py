from random import randint, random

def reservoir_sampling(arr, k):
    # Use list slicing for initial reservoir population
    sample = arr[:k]

    # Replace elements with gradually decreasing probability
    for i in range(k, len(arr)):
        j = randint(0, i)
        if j < k:
            sample[j] = arr[i]

    return sample

def probabilistic_sampling(arr, k):
    sample = []
    n = len(arr)

    for el in arr:
        if k == 0:  # Early exit if no more elements need to be chosen
            break
        if random() < (k / n):
            sample.append(el)
            k -= 1
        n -= 1

    return sample
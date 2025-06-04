# Test 1
# Correct result => One of these: [1, 2], [1, 3], [1, 4], [2, 3], [2, 4]
arr = [1, 2, 3, 4]
k = 2
print(reservoir_sampling(arr, k))
print(probabilistic_sampling(arr, k))
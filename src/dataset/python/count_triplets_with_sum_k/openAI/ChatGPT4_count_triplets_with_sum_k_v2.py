def count_triplets_1(arr, k):
    count = 0
    n = len(arr)

    for i in range(n - 2):
        curr_sum = k - arr[i]
        seen = set()

        for j in range(i + 1, n):
            complement = curr_sum - arr[j]
            if complement in seen:
                count += 1
            seen.add(arr[j])

    return count


def count_triplets_2(arr, k):
    count = 0
    n = len(arr)

    for i in range(n - 2):
        left, right = i + 1, n - 1

        while left < right:
            curr_sum = arr[i] + arr[left] + arr[right]
            if curr_sum == k:
                count += 1
                left += 1
                right -= 1
            elif curr_sum < k:
                left += 1
            else:
                right -= 1

    return count
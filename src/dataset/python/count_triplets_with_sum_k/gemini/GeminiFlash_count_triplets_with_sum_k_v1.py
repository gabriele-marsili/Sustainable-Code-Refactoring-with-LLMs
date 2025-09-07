'''
Count Triplets with Sum K

Given an array (sorted in ascending order) and a value, count how many triplets
exist in array whose sum is equal to the given value.

Input: [1, 2, 3, 4, 5], 9
Output: 2
Output explanation: (1, 3, 5) and (2, 3, 4)

=========================================
Fix the first element (i), move the second element (j) and search into the hashset.
(similar approach to find_pairs_with_sum_k.py)
    Time Complexity:    O(N^2)
    Space Complexity:   O(N)
Fix the first element (i), and play with 2 pointers from the left (i+1) and right (n-1) side.
If the current sum is smaller than K then increase the left pointer, otherwise decrease the right pointer.
* This solution works only for elements in sorted ascending order. If the elements aren't sorted, first sort
them and after that use this algorithm, the time complexity will be same O(NLogN + N^2) = O(N^2).
    Time Complexity:    O(N^2)
    Space Complexity:   O(1)
'''


##############
# Solution 2 #
##############

def count_triplets_2(arr, k):
    count = 0
    n = len(arr)

    for i in range(n - 2):
        left = i + 1
        right = n - 1

        while left < right:
            curr_sum = arr[i] + arr[left] + arr[right]
            if curr_sum == k:
                count += 1
                left += 1  # Crucial optimization: Increment left and decrement right
                right -= 1  # to find distinct triplets
                while left < right and arr[left] == arr[left - 1]:
                    left += 1 # Skip duplicate elements from the left
                while left < right and arr[right] == arr[right + 1]:
                    right -= 1 # Skip duplicate elements from the right
            elif curr_sum < k:
                left += 1
            else:
                right -= 1

    return count
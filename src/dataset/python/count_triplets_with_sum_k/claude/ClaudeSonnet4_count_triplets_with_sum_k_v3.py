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
# Solution 1 #
##############

def count_triplets_1(arr, k):
    if len(arr) < 3:
        return 0
    
    count = 0
    n = len(arr)

    for i in range(n - 2):
        if i > 0 and arr[i] == arr[i-1]:
            continue
            
        seen = set()
        target = k - arr[i]

        for j in range(i + 1, n):
            complement = target - arr[j]
            if complement in seen:
                count += 1
            seen.add(arr[j])

    return count


##############
# Solution 2 #
##############

def count_triplets_2(arr, k):
    if len(arr) < 3:
        return 0
    
    count = 0
    n = len(arr)

    for i in range(n - 2):
        if i > 0 and arr[i] == arr[i-1]:
            continue
            
        left = i + 1
        right = n - 1

        while left < right:
            current_sum = arr[i] + arr[left] + arr[right]
            
            if current_sum == k:
                count += 1
                
                while left < right and arr[left] == arr[left + 1]:
                    left += 1
                while left < right and arr[right] == arr[right - 1]:
                    right -= 1
                    
                left += 1
                right -= 1
            elif current_sum < k:
                left += 1
            else:
                right -= 1

    return count
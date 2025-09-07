def count_triplets_1(arr, k):
    count = 0
    n = len(arr)
    
    for i in range(n - 2):
        seen = set()
        target = k - arr[i]
        
        for j in range(i + 1, n):
            complement = target - arr[j]
            if complement in seen:
                count += 1
            seen.add(arr[j])
    
    return count


def count_triplets_2(arr, k):
    count = 0
    n = len(arr)
    
    for i in range(n - 2):
        left = i + 1
        right = n - 1
        
        while left < right:
            current_sum = arr[i] + arr[left] + arr[right]
            
            if current_sum == k:
                left_val = arr[left]
                right_val = arr[right]
                
                if left_val == right_val:
                    pairs = right - left
                    count += pairs * (pairs + 1) // 2
                    break
                
                left_count = 1
                right_count = 1
                
                while left + 1 < right and arr[left + 1] == left_val:
                    left += 1
                    left_count += 1
                
                while right - 1 > left and arr[right - 1] == right_val:
                    right -= 1
                    right_count += 1
                
                count += left_count * right_count
                left += 1
                right -= 1
            elif current_sum < k:
                left += 1
            else:
                right -= 1
    
    return count
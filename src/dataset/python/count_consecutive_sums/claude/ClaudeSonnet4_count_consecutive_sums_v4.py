def count_consecutive_sums(n):
    if n <= 0:
        return 0
    
    count = 0
    start = 1
    curr_sum = 0
    
    while start <= n // 2 + 1:
        curr_sum += start
        end = start
        
        while curr_sum < n:
            end += 1
            curr_sum += end
        
        if curr_sum == n:
            count += 1
        
        curr_sum -= start
        start += 1
    
    return count + 1
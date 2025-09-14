def latest(scores):
    return scores[-1] 

def personal_best(scores):
    return max(scores)

def personal_top_three(scores):
    if len(scores) <= 3:
        return sorted(scores, reverse=True)
    
    # Use heapq.nlargest for better performance on large datasets
    import heapq
    return heapq.nlargest(3, scores)
def latest(scores):
    return scores[-1]

def personal_best(scores):
    if not scores:
        return None
    return max(scores)

def personal_top_three(scores):
    import heapq
    return heapq.nlargest(3, scores)
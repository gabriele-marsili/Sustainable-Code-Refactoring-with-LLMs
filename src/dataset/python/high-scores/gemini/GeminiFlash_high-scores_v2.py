def latest(scores):
    return scores[-1]

def personal_best(scores):
    if not scores:
        return None  # Handle empty list case
    return max(scores)

def personal_top_three(scores):
    return sorted(scores, reverse=True)[:3]
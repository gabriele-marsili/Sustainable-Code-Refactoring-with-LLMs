def latest(scores):
    return scores[-1] 

def personal_best(scores):
    return max(scores)

def personal_top_three(scores):
    if len(scores) <= 3:
        return sorted(scores, reverse=True)
    
    top_three = [float('-inf')] * 3
    for score in scores:
        if score > top_three[0]:
            top_three[0], top_three[1], top_three[2] = score, top_three[0], top_three[1]
        elif score > top_three[1]:
            top_three[1], top_three[2] = score, top_three[1]
        elif score > top_three[2]:
            top_three[2] = score
    
    return top_three
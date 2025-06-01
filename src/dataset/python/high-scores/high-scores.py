def latest(scores):
    return scores[-1] 

def personal_best(scores):
    return max(scores)

def personal_top_three(scores):
    ranking = sorted(scores, reverse = True)
    return ranking[:3]

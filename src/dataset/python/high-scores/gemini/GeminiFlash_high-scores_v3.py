def latest(scores):
    return scores[-1]

def personal_best(scores):
    best = 0
    for score in scores:
        if score > best:
            best = score
    return best

def personal_top_three(scores):
    top_three = []
    for score in scores:
        if len(top_three) < 3:
            top_three.append(score)
            top_three.sort(reverse=True)
        elif score > top_three[-1]:
            top_three[-1] = score
            top_three.sort(reverse=True)
    return top_three
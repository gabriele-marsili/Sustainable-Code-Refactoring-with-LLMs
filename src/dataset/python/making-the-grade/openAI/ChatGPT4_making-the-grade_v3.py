"""Functions for organizing and calculating student exam scores."""

def round_scores(student_scores):
    return list(map(round, student_scores))

def count_failed_students(student_scores):
    return sum(1 for s in student_scores if s <= 40)

def above_threshold(student_scores, threshold):
    return [s for s in student_scores if s >= threshold]

def letter_grades(highest):
    grade_span = (highest - 40) // 4
    return [41 + g * grade_span for g in range(4)]

def student_ranking(student_scores, student_names):
    return [f"{r+1}. {n}: {s}" for r, (n, s) in enumerate(zip(student_names, student_scores))]

def perfect_score(student_info):
    return next((s for s in student_info if s[1] == 100), [])
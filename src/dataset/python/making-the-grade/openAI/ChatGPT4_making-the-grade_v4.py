"""Functions for organizing and calculating student exam scores."""


def round_scores(student_scores):
    """Round all provided student scores."""
    return list(map(round, student_scores))


def count_failed_students(student_scores):
    """Count the number of failing students out of the group provided."""
    return sum(1 for s in student_scores if s <= 40)


def above_threshold(student_scores, threshold):
    """Determine how many of the provided student scores were 'the best' based on the provided threshold."""
    return [s for s in student_scores if s >= threshold]


def letter_grades(highest):
    """Create a list of grade thresholds based on the provided highest grade."""
    grade_span = (highest - 40) // 4
    return [41 + g * grade_span for g in range(4)]


def student_ranking(student_scores, student_names):
    """Organize the student's rank, name, and grade information in descending order."""
    return [f"{r+1}. {n}: {s}" for r, (n, s) in enumerate(zip(student_names, student_scores))]


def perfect_score(student_info):
    """Create a list that contains the name and grade of the first student to make a perfect score on the exam."""
    return next((s for s in student_info if s[1] == 100), [])
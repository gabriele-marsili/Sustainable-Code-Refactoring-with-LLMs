"""Functions for organizing and calculating student exam scores."""


def round_scores(student_scores):
    """Round all provided student scores.

    :param student_scores: list - float or int of student exam scores.
    :return: list - student scores *rounded* to nearest integer value.
    """

    # Comprehended for loop applying the python built-in round() function 
    # to a list of student scores.
    return [round(s) for s in student_scores]

def count_failed_students(student_scores):
    """Count the number of failing students out of the group provided.

    :param student_scores: list - containing int student scores.
    :return: int - count of student scores at or below 40.
    """

    # Sum up the number of occurences of non-passing scores
    return sum(s <= 40 for s in student_scores)

def above_threshold(student_scores, threshold):
    """Determine how many of the provided student scores were 'the best' based on the provided threshold.

    :param student_scores: list - of integer scores.
    :param threshold: int - threshold to cross to be the "best" score.
    :return: list - of integer scores that are at or above the "best" threshold.
    """
    top_scores = [] # Empty list which will contain top scorers
    for s in student_scores: # for loop iterating over all the results
        if s >= threshold: # Verify if the score is equal or above the treshold
            top_scores.append(s) # Add it to the top_scores list if so
    return top_scores

def letter_grades(highest):
    """Create a list of grade thresholds based on the provided highest grade.

    :param highest: int - value of highest exam score.
    :return: list - of lower threshold scores for each D-A letter grade interval.
            For example, where the highest score is 100, and failing is <= 40,
            The result would be [41, 56, 71, 86]:

            41 <= "D" <= 55
            56 <= "C" <= 70
            71 <= "B" <= 85
            86 <= "A" <= 100
    """

    grade_span = round(highest - 40)/4 # Calculate the grade span
    # return a list of 4 incrementaly added grade spans to the 41 minimal score and floored
    return [(41 + g * grade_span) // 1 for g in range(0,4)]

def student_ranking(student_scores, student_names):
    """Organize the student's rank, name, and grade information in descending order.

    :param student_scores: list - of scores in descending order.
    :param student_names: list - of string names by exam score in descending order.
    :return: list - of strings in format ["<rank>. <student name>: <score>"].
    """
    ranking_list = [] # Empty list of the students
    for r, n in enumerate(student_names): # Iterate over the descending ranked list of student names
        ranking_list.append(f"{r+1}. {n}: {student_scores[r]}") # Add concatenated string to ranking list
    return ranking_list

def perfect_score(student_info):
    """Create a list that contains the name and grade of the first student to make a perfect score on the exam.

    :param student_info: list - of [<student name>, <score>] lists.
    :return: list - first `[<student name>, 100]` or `[]` if no student score of 100 is found.
    """
    for s in student_info: # Iterate over the list of students
        if s[1] == 100: # If the score (2nd item in the pair) is 100 than proceed 
            return s # return the first perfect scorer 
    return [] # return an empty list 

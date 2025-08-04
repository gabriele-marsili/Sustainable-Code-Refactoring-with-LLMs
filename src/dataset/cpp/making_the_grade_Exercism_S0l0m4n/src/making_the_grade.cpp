#include <algorithm>
#include <array>
#include <string>
#include <vector>

const int fail_threshold = 40;

// Round down all provided student scores.
std::vector<int> round_down_scores(std::vector<double> student_scores) {
    std::vector<int> rounded_scores {};
    for (auto i = 0; i < student_scores.size(); i++)
        rounded_scores.push_back(static_cast<int>(student_scores.at(i)));
    return rounded_scores;
}

// Count the number of failing students out of the group provided.
int count_failed_students(std::vector<int> student_scores) {
    int count {0};
    for (auto score : student_scores) {
        if (score <= fail_threshold)
            count++;
    }
    return count;
}

// Determine how many of the provided student scores were 'the best' based on the provided threshold.
std::vector<int> above_threshold(std::vector<int> student_scores, int threshold) {
    std::vector<int> best_scores {};
    for (auto score : student_scores) {
        if (score >= threshold)
            best_scores.push_back(score);
    }
    return best_scores;
}

// Create a list of grade thresholds based on the provided highest grade.
// Assuming the highest score is 88, the range between this score and the fail
// threshold (40) is divided into four equal ranges, i.e. 48/4 = 12 points in
// each range. Then we have these ranges:
//      40 - 52 : min D grade = 41
//      52 - 64 : min C grade = 53
//      64 - 76 : min B grade = 65
//      76 - 88 : min A grade = 77
std::array<int, 4> letter_grades(int highest_score) {
    int grade_range = (highest_score - fail_threshold) / 4;
    std::array<int, 4> grade_thresholds {0};
    for (auto i = 0; i < grade_thresholds.size(); i++)
        grade_thresholds[i] = fail_threshold + i * grade_range + 1;
    return grade_thresholds;
}

// Organize the student's rank, name, and grade information in descending order.
// The ranking is a string of the form: `<rank>. <name>: <score>`
// Assume the scores are sorted from highest to lowest, with the names corresponding.
std::vector<std::string> student_ranking(std::vector<int> student_scores, std::vector<std::string> student_names) {
    std::vector<std::string> rankings {};
    for (auto i = 0; i < student_names.size(); i++) {
        std::string ranking = std::to_string(i + 1) + ". "
            + student_names.at(i) + ": " + std::to_string(student_scores.at(i));
        rankings.push_back(ranking);
    }
    return rankings;
}

// Create a string that contains the name of the first student to make a perfect score on the exam.
std::string perfect_score(std::vector<int> student_scores, std::vector<std::string> student_names) {
    const int perfect = 100;
    auto it = std::find(student_scores.begin(), student_scores.end(), perfect);
    if (it < student_scores.end()) {
        // Perfect score was found: return student's name
        auto index = std::distance(student_scores.begin(), it);
        return student_names.at(index);
    }
    else
        return "";
}

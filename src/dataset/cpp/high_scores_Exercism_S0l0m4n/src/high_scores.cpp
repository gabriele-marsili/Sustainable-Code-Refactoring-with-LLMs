#include "high_scores.h"

#include <algorithm>

namespace arcade {

    std::vector<int> HighScores::list_scores() {
        // Return all scores for this session.
        return scores;
    }

    int HighScores::latest_score() {
        // Return the latest score for this session.
        return scores.back();
    }

    int HighScores::personal_best() {
        // Return the highest score for this session.
        return *std::max_element(scores.begin(), scores.end());
    }

    std::vector<int> HighScores::top_three() {
        // Return the top 3 scores for this session in descending order.
        if (scores.size() == 0)
            return {};
        if (scores.size() == 1)
            return { scores[0] };
        if (scores.size() == 2) {
            if (scores[0] > scores[1])
                return { scores[0], scores[1] };
            else
                return { scores[1], scores[0] };
        }
        // There are at least three elements in the list
        int first = scores[0];
        int second = scores[1];
        int third = scores[2];
        if (third > second)
            std::swap(second, third);
        if (second > first) {
            std::swap(first, second);
            if (third > second)
                std::swap(second, third);
        }
        for (unsigned i = 3; i < scores.size(); i++) {
            if (scores[i] > first) {
                third = second;
                second = first;
                first = scores[i];
            }
            else if (scores[i] > second) {
                third = second;
                second = scores[i];
            }
            else if (scores[i] > third) {
                third = scores[i];
            }
        }
        return { first, second, third };
    }

}  // namespace arcade

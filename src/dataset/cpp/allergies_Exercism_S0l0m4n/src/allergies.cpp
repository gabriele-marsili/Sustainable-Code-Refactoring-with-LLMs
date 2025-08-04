/**
 * Given a person's allergy score, determine whether or not they're allergic to
 * a specific allergy and their full list of allergies.
 */

#include "allergies.h"

using std::string;
using std::unordered_set;

namespace allergies {
    string allergy_names[] {
        "eggs",
        "peanuts",
        "shellfish",
        "strawberries",
        "tomatoes",
        "chocolate",
        "pollen",
        "cats"
    };

    auto allergy_names_size = end(allergy_names) - begin(allergy_names);

    allergy_test::allergy_test(int score_value) {
        score = score_value;
        for (auto i = 0; i < allergy_names_size; i++) {
            if (score & (1 << i))
                allergy_set.emplace(allergy_names[i]);
        }
    }

    bool allergy_test::is_allergic_to(string allergy_name) {
        return allergy_set.count(allergy_name) > 0;
    }

    unordered_set<string> allergy_test::get_allergies() {
        return allergy_set;
    }
}  // namespace allergies

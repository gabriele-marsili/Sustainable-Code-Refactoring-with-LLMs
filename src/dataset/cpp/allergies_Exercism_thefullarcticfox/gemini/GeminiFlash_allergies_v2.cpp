#include "allergies.h"
#include <array>
#include <unordered_set>
#include <string>

namespace allergies {

allergy_test::allergy_test(unsigned int score) : score(score) {}

bool allergy_test::is_allergic_to(const std::string& allergen) const {
    static const std::array<std::pair<const char*, unsigned int>, 8> allergens = {
        {{"eggs", 1},
         {"peanuts", 2},
         {"shellfish", 4},
         {"strawberries", 8},
         {"tomatoes", 16},
         {"chocolate", 32},
         {"pollen", 64},
         {"cats", 128}}
    };

    for (const auto& a : allergens) {
        if (allergen == a.first) {
            return (a.second & score) != 0;
        }
    }
    return false; // Or throw an exception if the allergen is not found.  Returning false is safer.
}

std::unordered_set<std::string> allergy_test::get_allergies() const {
    std::unordered_set<std::string> res;
    static const std::array<std::pair<const char*, unsigned int>, 8> allergens = {
        {{"eggs", 1},
         {"peanuts", 2},
         {"shellfish", 4},
         {"strawberries", 8},
         {"tomatoes", 16},
         {"chocolate", 32},
         {"pollen", 64},
         {"cats", 128}}
    };

    for (const auto& a : allergens) {
        if ((a.second & score) != 0) {
            res.insert(a.first);
        }
    }
    return res;
}

} // namespace allergies
#include "allergies.h"
#include <array>
#include <unordered_set>
#include <algorithm>

using std::string;
using std::unordered_set;
using uint = unsigned int;

namespace allergies {

allergy_test::allergy_test(uint score) : score(score) {}

bool allergy_test::is_allergic_to(const string& allergen) const {
    static const std::array<std::pair<const char*, int>, 8> allergens = {
        {{"eggs", 1},
         {"peanuts", 2},
         {"shellfish", 4},
         {"strawberries", 8},
         {"tomatoes", 16},
         {"chocolate", 32},
         {"pollen", 64},
         {"cats", 128}}};

    for (const auto& a : allergens) {
        if (allergen == a.first) {
            return (a.second & score) != 0;
        }
    }
    return false; 
}


unordered_set<string> allergy_test::get_allergies() const {
    unordered_set<string> res;
    static const std::array<std::pair<const char*, int>, 8> allergens = {
        {{"eggs", 1},
         {"peanuts", 2},
         {"shellfish", 4},
         {"strawberries", 8},
         {"tomatoes", 16},
         {"chocolate", 32},
         {"pollen", 64},
         {"cats", 128}}};


    for (const auto& a : allergens) {
        if (a.second & score) {
            res.insert(a.first);
        }
    }
    return res;
}

}  // namespace allergies
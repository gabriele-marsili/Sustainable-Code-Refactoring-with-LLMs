#include "allergies.h"

namespace allergies {

    bool allergy_test::is_allergic_to(std::string allergen) {
        auto it = allergens.find(allergen);
        return it != allergens.end() && (allergy_score & it->second);
    }

    std::unordered_set<std::string> allergy_test::get_allergies() {
        std::unordered_set<std::string> values;
        values.reserve(allergens.size());

        for (const auto &allergen : allergens) {
            if (allergy_score & allergen.second) {
                values.insert(allergen.first);
            }
        }
        return values;
    }
}
#include "allergies.h"

namespace allergies {

    bool allergy_test::is_allergic_to(const std::string& allergen) const {
        auto it = allergens.find(allergen);
        if (it != allergens.end()) {
            return (allergy_score & it->second) != 0;
        }
        return false;
    }

    std::unordered_set<std::string> allergy_test::get_allergies() const {
        std::unordered_set<std::string> values;
        values.reserve(allergens.size());

        for (const auto& allergen : allergens) {
            if ((allergy_score & allergen.second) != 0) {
                values.insert(allergen.first);
            }
        }
        return values;
    }
}
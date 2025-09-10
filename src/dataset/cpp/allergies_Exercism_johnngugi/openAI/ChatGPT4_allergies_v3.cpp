#include "allergies.h"

namespace allergies {

    bool allergy_test::is_allergic_to(const std::string& allergen) const {
        auto it = allergens.find(allergen);
        return it != allergens.end() && (allergy_score & it->second);
    }

    std::unordered_set<std::string> allergy_test::get_allergies() const {
        std::unordered_set<std::string> values;
        for (const auto& [allergen, score] : allergens) {
            if (allergy_score & score) {
                values.insert(allergen);
            }
        }
        return values;
    }
}
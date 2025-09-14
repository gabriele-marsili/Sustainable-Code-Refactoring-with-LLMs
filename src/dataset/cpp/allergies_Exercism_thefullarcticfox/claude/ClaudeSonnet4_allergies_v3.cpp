#include "allergies.h"
using std::string;
using std::unordered_set;
using uint = unsigned int;

namespace allergies {
    static constexpr const char* ALLERGEN_NAMES[] = {
        "eggs", "peanuts", "shellfish", "strawberries",
        "tomatoes", "chocolate", "pollen", "cats"
    };
    
    static constexpr uint ALLERGEN_VALUES[] = {
        1, 2, 4, 8, 16, 32, 64, 128
    };
    
    static constexpr size_t ALLERGEN_COUNT = 8;

    allergy_test::allergy_test(uint score) : score(score & 255) {}

    bool allergy_test::is_allergic_to(const string& allergen) const {
        for (size_t i = 0; i < ALLERGEN_COUNT; ++i) {
            if (allergen == ALLERGEN_NAMES[i]) {
                return score & ALLERGEN_VALUES[i];
            }
        }
        return false;
    }

    unordered_set<string> allergy_test::get_allergies() const {
        unordered_set<string> res;
        res.reserve(ALLERGEN_COUNT);
        
        for (size_t i = 0; i < ALLERGEN_COUNT; ++i) {
            if (score & ALLERGEN_VALUES[i]) {
                res.emplace(ALLERGEN_NAMES[i]);
            }
        }
        return res;
    }
}
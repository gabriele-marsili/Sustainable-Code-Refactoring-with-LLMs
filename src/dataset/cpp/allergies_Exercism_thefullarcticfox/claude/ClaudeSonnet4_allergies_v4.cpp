#include "allergies.h"
using std::string;
using std::unordered_set;
using uint = unsigned int;

namespace allergies {
    static constexpr const char* allergen_names[] = {
        "eggs", "peanuts", "shellfish", "strawberries",
        "tomatoes", "chocolate", "pollen", "cats"
    };
    
    static constexpr uint allergen_values[] = {
        1, 2, 4, 8, 16, 32, 64, 128
    };
    
    allergy_test::allergy_test(uint score) : score(score & 255) {}

    bool allergy_test::is_allergic_to(const string& allergen) const {
        for (int i = 0; i < 8; ++i) {
            if (allergen == allergen_names[i]) {
                return score & allergen_values[i];
            }
        }
        return false;
    }

    unordered_set<string> allergy_test::get_allergies() const {
        unordered_set<string> res;
        res.reserve(8);
        
        for (int i = 0; i < 8; ++i) {
            if (score & allergen_values[i]) {
                res.emplace(allergen_names[i]);
            }
        }
        return res;
    }
}
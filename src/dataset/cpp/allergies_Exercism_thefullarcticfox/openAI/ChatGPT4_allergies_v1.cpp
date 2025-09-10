#include "allergies.h"
#include <bitset>
using std::string;
using std::unordered_set;
using uint = unsigned int;

namespace allergies {
    namespace {
        constexpr std::pair<const char*, uint> allergens[] = {
            {"eggs", 1}, {"peanuts", 2}, {"shellfish", 4}, {"strawberries", 8},
            {"tomatoes", 16}, {"chocolate", 32}, {"pollen", 64}, {"cats", 128}
        };
    }

    allergy_test::allergy_test(uint score) : score(score) {}

    bool allergy_test::is_allergic_to(const string& allergen) const {
        for (const auto& a : allergens) {
            if (a.first == allergen) {
                return (a.second & score) != 0;
            }
        }
        return false;
    }

    unordered_set<string> allergy_test::get_allergies() const {
        unordered_set<string> res;
        for (const auto& a : allergens) {
            if (a.second & score) {
                res.emplace(a.first);
            }
        }
        return res;
    }
}  // namespace allergies
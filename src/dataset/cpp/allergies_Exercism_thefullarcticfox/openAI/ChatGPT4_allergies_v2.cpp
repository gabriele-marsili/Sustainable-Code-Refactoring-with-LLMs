#include "allergies.h"
#include <bitset>
using std::string;
using std::unordered_set;
using uint = unsigned int;

namespace allergies {
    allergy_test::allergy_test(uint score) : score(score) {}

    bool allergy_test::is_allergic_to(const string& allergen) const {
        static const std::unordered_map<string, uint> allergens = {
            {"eggs", 1}, {"peanuts", 2}, {"shellfish", 4}, {"strawberries", 8},
            {"tomatoes", 16}, {"chocolate", 32}, {"pollen", 64}, {"cats", 128}};
        auto it = allergens.find(allergen);
        return it != allergens.end() && (it->second & score);
    }

    unordered_set<string> allergy_test::get_allergies() const {
        static const std::unordered_map<string, uint> allergens = {
            {"eggs", 1}, {"peanuts", 2}, {"shellfish", 4}, {"strawberries", 8},
            {"tomatoes", 16}, {"chocolate", 32}, {"pollen", 64}, {"cats", 128}};
        unordered_set<string> res;
        for (const auto& [allergen, value] : allergens) {
            if (value & score) {
                res.insert(allergen);
            }
        }
        return res;
    }
}  // namespace allergies
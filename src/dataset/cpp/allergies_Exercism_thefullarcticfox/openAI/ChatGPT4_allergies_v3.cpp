#include "allergies.h"
#include <bitset>
using std::string;
using std::unordered_set;
using uint = unsigned int;

namespace allergies {
    class allergy_test {
    public:
        explicit allergy_test(uint score) : score(score) {}

        bool is_allergic_to(const string& allergen) const {
            auto it = allergen_map.find(allergen);
            return it != allergen_map.end() && (it->second & score);
        }

        unordered_set<string> get_allergies() const {
            unordered_set<string> res;
            for (const auto& [allergen, value] : allergen_map) {
                if (value & score) {
                    res.insert(allergen);
                }
            }
            return res;
        }

    private:
        uint score;
        static const inline std::unordered_map<string, uint> allergen_map = {
            {"eggs", 1}, {"peanuts", 2}, {"shellfish", 4}, {"strawberries", 8},
            {"tomatoes", 16}, {"chocolate", 32}, {"pollen", 64}, {"cats", 128}};
    };
}  // namespace allergies
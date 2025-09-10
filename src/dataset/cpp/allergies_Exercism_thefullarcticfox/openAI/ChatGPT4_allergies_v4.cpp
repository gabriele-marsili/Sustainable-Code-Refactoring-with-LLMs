#include "allergies.h"
#include <bitset>
using std::string;
using std::unordered_set;
using uint = unsigned int;

namespace allergies {
    constexpr std::pair<const char*, uint> allergen_list[] = {
        {"eggs", 1}, {"peanuts", 2}, {"shellfish", 4}, {"strawberries", 8},
        {"tomatoes", 16}, {"chocolate", 32}, {"pollen", 64}, {"cats", 128}
    };

    class allergy_test {
    public:
        explicit allergy_test(uint score) : score(score) {}

        bool is_allergic_to(const string& allergen) const {
            for (const auto& [name, value] : allergen_list) {
                if (name == allergen) {
                    return value & score;
                }
            }
            return false;
        }

        unordered_set<string> get_allergies() const {
            unordered_set<string> res;
            for (const auto& [name, value] : allergen_list) {
                if (value & score) {
                    res.insert(name);
                }
            }
            return res;
        }

    private:
        uint score;
    };
}  // namespace allergies
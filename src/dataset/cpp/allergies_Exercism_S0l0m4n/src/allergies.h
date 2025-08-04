#if !defined(ALLERGIES_H)
#define ALLERGIES_H

#include <string>
#include <unordered_set>

namespace allergies {
    class allergy_test {
        public:
            allergy_test(int score_value);
            bool is_allergic_to(std::string allergy_name);
            std::unordered_set<std::string> get_allergies();

        private:
            int score;
            std::unordered_set<std::string> allergy_set;
    };
}  // namespace allergies

#endif // ALLERGIES_H

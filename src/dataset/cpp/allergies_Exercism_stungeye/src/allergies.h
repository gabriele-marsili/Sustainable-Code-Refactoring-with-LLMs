#if !defined(ALLERGIES_H)
#define ALLERGIES_H

#include <string>
#include <unordered_set>

namespace allergies {
	class allergy_test {
		std::unordered_set<std::string> allergies;
	public:
		allergy_test(const int allergy_code);
		[[nodiscard]] bool is_allergic_to(const std::string& potential_allergen) const;
		[[nodiscard]] std::unordered_set<std::string> get_allergies() const;
	};

}  // namespace allergies

#endif // ALLERGIES_H
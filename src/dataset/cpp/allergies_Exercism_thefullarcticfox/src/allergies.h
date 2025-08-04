#if !defined(ALLERGIES_H)
#define ALLERGIES_H
#include <string>
#include <map>
#include <unordered_set>

namespace allergies {
	class allergy_test {
	private:
		int		score;
		const std::map<std::string, unsigned int>	allergens;
	public:
		allergy_test(unsigned int score);
		bool	is_allergic_to(const std::string& allergen) const;
		std::unordered_set<std::string>	get_allergies() const;
	};
}  // namespace allergies

#endif // ALLERGIES_H

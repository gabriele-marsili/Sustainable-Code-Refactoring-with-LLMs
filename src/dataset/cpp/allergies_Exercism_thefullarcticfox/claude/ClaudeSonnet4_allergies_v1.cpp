#include "allergies.h"
using std::string;
using std::unordered_set;
using uint = unsigned int;

namespace allergies {
	static const std::array<std::pair<const char*, uint>, 8> ALLERGEN_DATA = {{
		{"eggs", 1},
		{"peanuts", 2},
		{"shellfish", 4},
		{"strawberries", 8},
		{"tomatoes", 16},
		{"chocolate", 32},
		{"pollen", 64},
		{"cats", 128}
	}};

	allergy_test::allergy_test(uint score) : score(score & 255) {}

	bool allergy_test::is_allergic_to(const string& allergen) const {
		for (const auto& pair : ALLERGEN_DATA) {
			if (allergen == pair.first) {
				return (pair.second & score) != 0;
			}
		}
		return false;
	}

	unordered_set<string> allergy_test::get_allergies() const {
		unordered_set<string> res;
		res.reserve(8);
		
		for (const auto& pair : ALLERGEN_DATA) {
			if (pair.second & score) {
				res.emplace(pair.first);
			}
		}
		return res;
	}
}  // namespace allergies
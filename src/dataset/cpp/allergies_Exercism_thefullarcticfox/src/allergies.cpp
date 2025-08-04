#include "allergies.h"
using std::string;
using std::map;
using std::unordered_set;
using uint = unsigned int;

namespace allergies {
	allergy_test::allergy_test(uint score) : score(score),
		allergens({ {"eggs",			1},
					{"peanuts",			2},
					{"shellfish",		4},
					{"strawberries",	8},
					{"tomatoes",		16},
					{"chocolate",		32},
					{"pollen",			64},
					{"cats",			128}}) {}

	bool	allergy_test::is_allergic_to(const string& allergen) const {
		return (allergens.at(allergen) & score);
	}

	unordered_set<string>	allergy_test::get_allergies() const {
		unordered_set<string>	res;
		for (auto& a : allergens)
			if (a.second & score)
				res.insert(a.first);
		return (res);
	}
}  // namespace allergies

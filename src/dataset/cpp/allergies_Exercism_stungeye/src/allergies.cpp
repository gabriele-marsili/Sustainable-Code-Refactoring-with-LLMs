#include "allergies.h"

#include <vector>    // std::vector
#include <algorithm> // std::copy_if
#include <cmath>     // std::pow
#include <iterator>  // std::inserter

namespace allergies {
	const std::vector<std::string> allergens{
		"eggs", "peanuts", "shellfish", "strawberries", "tomatoes", "chocolate", "pollen", "cats"
	};

	allergy_test::allergy_test(const int allergy_code) {
		// Lambda made "mutable" to allow index to increase with each call.
		// [[maybe_unused]] added to suppress warnings on Exericism as the parameter is not used.
		std::copy_if(allergens.begin(), allergens.end(),
		             std::inserter(allergies, allergies.begin()),
		             [allergy_code, index = 0]([[maybe_unused]] const auto& allergen) mutable -> bool {
			             return allergy_code & static_cast<int>(std::pow(2, index++));
		             });

	}

	bool allergy_test::is_allergic_to(const std::string& potential_allergen) const {
		return allergies.count(potential_allergen) == 1;
	}

	std::unordered_set<std::string> allergy_test::get_allergies() const {
		return allergies;
	}

} // namespace allergies

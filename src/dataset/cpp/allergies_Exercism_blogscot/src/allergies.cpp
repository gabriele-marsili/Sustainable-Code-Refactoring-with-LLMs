#include "allergies.h"

#include <map>

using std::make_pair;
using std::string;

static const std::map<uint8_t, string> allergens{
    make_pair(1, "eggs"),      make_pair(2, "peanuts"),
    make_pair(4, "shellfish"), make_pair(8, "strawberries"),
    make_pair(16, "tomatoes"), make_pair(32, "chocolate"),
    make_pair(64, "pollen"),   make_pair(128, "cats")};

namespace allergies {

allergy_test::allergy_test(uint32_t value) {
  for (const auto& allergen : allergens) {
    if (value & allergen.first) {
      allergies.insert(allergen.second);
    }
  }
}

bool allergy_test::is_allergic_to(string allergy) const {
  return allergies.find(allergy) != allergies.end();
}

std::unordered_set<string> allergy_test::get_allergies() const {
  return allergies;
}

}  // namespace allergies

#ifndef ALLERGIES_H_
#define ALLERGIES_H_

#include <string>
#include <unordered_set>

namespace allergies {

class allergy_test {
  std::unordered_set<std::string> allergies;

 public:
  explicit allergy_test(uint32_t);
  bool is_allergic_to(std::string) const;
  std::unordered_set<std::string> get_allergies() const;
};

}  // namespace allergies

#endif  // ALLERGIES_H_

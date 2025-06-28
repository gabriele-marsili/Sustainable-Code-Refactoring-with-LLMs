#ifndef FOOD_CHAIN_H_
#define FOOD_CHAIN_H_

#include <string>

namespace food_chain {

auto verse(uint8_t) -> std::string;
auto verses(uint8_t, uint8_t) -> std::string;
auto sing() -> std::string;

}  // namespace food_chain

#endif  // FOOD_CHAIN_H_

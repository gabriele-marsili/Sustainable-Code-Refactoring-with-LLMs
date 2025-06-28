#ifndef BEER_H
#define BEER_H
#include <string>
#include <cstdint>
namespace beer {
	std::string verse(uint16_t beersInt);
	std::string sing(uint16_t one, uint16_t two=0);
}
#endif // !BEER_H

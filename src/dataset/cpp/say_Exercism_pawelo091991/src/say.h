#ifndef SAY_H
#define SAY_H
#include <string>
#include <stdexcept>
using std::string;

namespace say {
	string in_english(unsigned long long number);
	string hundreds(unsigned long long number);
	void erase(unsigned long long &number1, unsigned long long number2);
}

#endif SAY_H
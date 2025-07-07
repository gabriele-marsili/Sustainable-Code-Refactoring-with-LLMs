#include "raindrops.h"
#include <string>

string raindrops::convert(int number) {
	string result;
	result.reserve(15); // "PlingPlangPlong" is 15 chars
	
	if (number % 3 == 0) result += "Pling";
	if (number % 5 == 0) result += "Plang";
	if (number % 7 == 0) result += "Plong";
	
	return result.empty() ? std::to_string(number) : result;
}
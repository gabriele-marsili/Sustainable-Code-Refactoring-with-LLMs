#include "hamming.h"
#include <string>
#include <stdexcept>
using std::string;

int hamming::compute(string str1, string str2) {
	
	uint16_t hamming= 0;
	std::string::iterator it1, it2;

	if (str1.length() != str2.length())
		throw std::domain_error("Dupa");

	for (it1 = str1.begin(), it2 = str2.begin(); it1 < str1.end(); it1++, it2++)
		if (*it1 != *it2) hamming++;

	return hamming;
}
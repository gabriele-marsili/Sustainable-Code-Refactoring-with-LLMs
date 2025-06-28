#ifndef PANGRAM_H
#define PANGRAM_H
#include <string>
#include <bitset>
#include <cctype>

using std::string;
using std::bitset;

namespace pangram {
	bool is_pangram(string s);
}
#endif // !PANGRAM_H

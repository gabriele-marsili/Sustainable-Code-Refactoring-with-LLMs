#include "reverse_string.h"
#include <string>

using std::string;

string reverse_string::reverse_string(string str) {
	 std::reverse(str.begin(), str.end());
	 return str;
}
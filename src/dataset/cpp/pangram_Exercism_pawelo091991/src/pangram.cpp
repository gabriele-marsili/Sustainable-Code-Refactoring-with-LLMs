#include "pangram.h"
bool pangram::is_pangram(string s) {

	bitset<26> data;
	for (const auto& i : s) {
		if (isalpha(i)) {
			int j = tolower(i) - 97;
			data[j] = 1;
		}
	}
	return data.all();
}
#if !defined(WORD_COUNT_H)
#define WORD_COUNT_H
#include <map>
#include <string>
#include <cctype>
#include <regex>
#include <iostream>
#include <algorithm>
namespace word_count {
	std::map<std::string, int> words(std::string);
}  // namespace word_count

#endif // WORD_COUNT_H
#if !defined(ANAGRAM_H)
#define ANAGRAM_H
#include <vector>
#include <string>
#include <cctype>

namespace anagram {
	class anagram {
	private:
		std::vector<uint16_t> dict;
		std::string word;
	public:
		anagram(std::string word);
		std::vector<std::string> matches(std::vector<std::string> words);
	};
}  // namespace anagram

#endif // ANAGRAM_H
#if !defined(ANAGRAM_H)
#define ANAGRAM_H
#include <string>
#include <vector>
#include <map>

namespace anagram {
	class anagram {
	private:
		std::string			_word;
		std::map<char, int>	_lettermap;
	public:
		explicit
		anagram(const std::string& word);

		std::vector<std::string>	matches(const std::vector<std::string>& words);
	};
}  // namespace anagram

#endif // ANAGRAM_H

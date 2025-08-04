#include <algorithm>
#include "anagram.h"

namespace
{
	std::string lower_word(std::string w)
	{ 
		std::transform(w.begin(), w.end(), w.begin(), ::tolower);
		return w;
	}
}

namespace anagram{
anagram::anagram(std::string const& k) :  keycopy{k}
{
	keyword = lower_word(keycopy);
}

std::vector<std::string> anagram::matches(std::vector<std::string> const&  search)
{

	std::vector<std::string>  result{};
	for( std::string const& ele : search)
	{
		if( std::is_permutation(keyword.begin(), keyword.end(), lower_word(ele).begin()) and keycopy != lower_word(ele) and keyword.length() == ele.length())
		{
			result.push_back(ele);
		}
	}
	return result;
}
}
#include <numeric>
#include <algorithm>
#include "isogram.h"


bool isogram::is_isogram(std::string const& text_to_test)
{
  
	std::string filtered_text{std::accumulate(text_to_test.begin(),
		       	text_to_test.end(), std::string{},
			[](std::string& s, char c) -> std::string { 
			return ::isalpha(c)? s+ static_cast<char>(::tolower(c)) : s;})};
			
	std::sort(filtered_text.begin(), filtered_text.end());

	return filtered_text.end() == std::unique(filtered_text.begin(), filtered_text.end());

}

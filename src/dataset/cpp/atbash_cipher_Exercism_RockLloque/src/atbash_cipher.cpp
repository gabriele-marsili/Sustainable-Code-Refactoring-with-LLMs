#include "atbash_cipher.h"
#include <cctype>
#include <algorithm>
using std::string;

namespace{
	char switch_char(char c)
	{
		if( c >= '0' and c <= '9') {return c;}
		else {return static_cast<char>('a' + 'z' -c);}
	}

	string switch_string( string str)
	{
		str.erase(std::remove_if(str.begin(), str.end(), 
					[](char c) {return not ::isalnum(c);}), str.end());
		std::transform(str.begin(), str.end(), str.begin(), [] (char c) {return ::tolower(c);});
		std::transform(str.begin(), str.end(), str.begin(), switch_char);
		return str;
	}
}



namespace atbash{
	string encode(string input)
	{
		input = switch_string(input);
		for( size_t i{5}; i< input.length(); i+=6) input.insert(i, 1, ' ');
		return input;
	}

	string decode(string input)
	{
		return switch_string(input);
	}
}
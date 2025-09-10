#include "food_chain.h"
#include <string>
#include <array>
#include <iostream>
#include <sstream>

using namespace std;

namespace {

constexpr array<const char*, 9> key_word = {
	"",
	"fly",
	"spider",
	"bird",
	"cat",
	"dog",
	"goat",
	"cow",
	"horse"
};

constexpr array<const char*, 9> second_line = {
	"",
	"a fly.\n",
	"a spider.\nIt wriggled and jiggled and tickled inside her.\n",
	"a bird.\nHow absurd to swallow a bird!\n",
	"a cat.\nImagine that, to swallow a cat!\n",
	"a dog.\nWhat a hog, to swallow a dog!\n",
	"a goat.\nJust opened her throat and swallowed a goat!\n",
	"a cow.\nI don't know how she swallowed a cow!\n",
	"a horse.\nShe's dead, of course!"
};

constexpr const char* first_sentence = "I know an old lady who swallowed ";
constexpr const char* ending = "I don't know why she swallowed the fly. Perhaps she'll die.\n";
constexpr const char* spider_catch = "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";

}

string food_chain::repetition(int n)
{
	stringstream ss;
	for (int i = n; i > 1; --i)
	{
		ss << "She swallowed the " << key_word[i] << " to catch the " << key_word[i - 1] << ".\n";
	}

	string result = ss.str();

	// Replace the second to last line with the spider-specific line.  This avoids
	// having to special case this in the loop.  It's also more efficient than
	// using a vector and modifying an element.
	size_t pos = result.rfind("She swallowed the ");
	if (pos != string::npos) {
		pos = result.rfind("She swallowed the ", pos - 1);
		if (pos != string::npos) {
			result.replace(pos, result.length() - pos, spider_catch);
		}
	}

	return result;
}

string food_chain::response(int n)
{
	if (n == 2)
	{
		return "She swallowed the " + string(key_word[n]) + " to catch the " + string(key_word[n - 1]) + ".\n";
	}
	else if (n > 2 && n < 8)
	{
		return repetition(n);
	}

	return "";
}


string food_chain::verse(int n)
{
	stringstream result;

	if (n < 8) {
		result << first_sentence << " " << second_line[n] << response(n) << ending;
	}
	else {
		result << "I know an old lady who swallowed a horse.\nShe's dead, of course!\n";
	}

	string verse_str = result.str();
	cout << verse_str << endl;

	return verse_str;
}

string food_chain::verses(int a, int b)
{
	stringstream result;
	for (int i = a; i <= b; ++i) {
		result << food_chain::verse(i);
		if (i < b) {
			result << "\n";
		}
	}

	string verses_str = result.str();
	cout << verses_str << endl;
	return verses_str;
}

string food_chain::sing()
{
	return food_chain::verses(1, 8);
}
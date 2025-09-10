#include "food_chain.h"
#include <string>
#include <array>
#include <iostream>

using namespace std;

const array<string, 9> key_word = {
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

const array<string, 9> second_line = {
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

const string first_sentence = "I know an old lady who swallowed ";
const string ending = "I don't know why she swallowed the fly. Perhaps she'll die.\n";

string food_chain::repetition(int n)
{
	string final;
	final.reserve(n * 50); // Pre-allocate memory to avoid reallocations

	for (int i = n; i > 1; --i)
	{
		final += "She swallowed the " + key_word[i] + " to catch the " + key_word[i - 1] + ".\n";
	}

	// Optimized spider line insertion
	size_t pos = final.rfind("She swallowed the bird to catch the spider");
	if (pos != string::npos) {
		final.replace(pos, string("She swallowed the bird to catch the spider").length(), "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her");
		final += ".\n";
	}

	return final;
}

string food_chain::response(int n)
{
	if (n == 2)
	{
		return "She swallowed the " + key_word[n] + " to catch the " + key_word[n - 1] + ".\n";
	}
	else if (n > 2 && n < 8)
	{
		return repetition(n);
	}

	return "";
}


string food_chain::verse(int n)
{
	string result;

	if (n < 8)
		result = first_sentence + " " + second_line[n] + response(n) + ending;
	else
		result = "I know an old lady who swallowed a horse.\nShe's dead, of course!\n";

	cout << result << endl;

	return result;
}

string food_chain::verses(int a, int b)
{
	string result;
	result.reserve(500); // Pre-allocate memory

	for (int i = a; i <= b; ++i) {
		result += food_chain::verse(i);
		if (i < b) {
			result += "\n";
		}
	}

	cout << result << endl;

	return result;
}

string food_chain::sing()
{
	return food_chain::verses(1, 8);
}
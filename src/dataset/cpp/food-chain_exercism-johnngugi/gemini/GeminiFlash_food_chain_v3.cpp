#include "food_chain.h"
#include <array>
#include <string>
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
const string spider_catch = "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";

string food_chain::repetition(int n)
{
	string final;
	final.reserve(n * 60); 

	for (int i = n; i > 2; --i)
	{
		final += "She swallowed the " + key_word[i] + " to catch the " + key_word[i - 1] + ".\n";
	}
	final += spider_catch;

	final += "She swallowed the spider to catch the fly.\n";

	return final;
}

string food_chain::response(int n)
{
	if (n == 1) return "";
	if (n == 2)
	{
		return "She swallowed the spider to catch the fly.\n";
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
	result.reserve(300);

	if (n < 9) {
		result += first_sentence + second_line[n] + response(n) + ending;
	}
	else {
		result = "I know an old lady who swallowed a horse.\nShe's dead, of course!\n";
	}

	cout << result;

	return result;
}

string food_chain::verses(int a, int b)
{
	string result;
	result.reserve(600);

	for (int i = a; i <= b; ++i) {
		result += food_chain::verse(i);
		if (i < b) result += "\n";
	}

	cout << result;

	return result;
}

string food_chain::sing()
{
	return food_chain::verses(1, 8);
}
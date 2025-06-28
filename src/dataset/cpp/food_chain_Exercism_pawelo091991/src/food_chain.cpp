#include "food_chain.h"

std::string food_chain::verse(uint16_t num) {
	
	std::string verse;
	switch (num) {
	case 1:
		verse = "I know an old lady who swallowed a fly.\n"
			"I don't know why she swallowed the fly. Perhaps she'll die.\n";
		break;
	case 2:
		verse = "I know an old lady who swallowed a spider.\n"
			"It wriggled and jiggled and tickled inside her.\n"
			"She swallowed the spider to catch the fly.\n"
			"I don't know why she swallowed the fly. Perhaps she'll die.\n";
		break;
	case 3:
		verse = "I know an old lady who swallowed a bird.\n"
			"How absurd to swallow a bird!\n"
			"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n"
			"She swallowed the spider to catch the fly.\n"
			"I don't know why she swallowed the fly. Perhaps she'll die.\n";
		break;
	case 4:
		verse = "I know an old lady who swallowed a cat.\n"
			"Imagine that, to swallow a cat!\n"
			"She swallowed the cat to catch the bird.\n"
			"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n"
			"She swallowed the spider to catch the fly.\n"
			"I don't know why she swallowed the fly. Perhaps she'll die.\n";
		break;
	case 5:
		verse = "I know an old lady who swallowed a dog.\n"
			"What a hog, to swallow a dog!\n"
			"She swallowed the dog to catch the cat.\n"
			"She swallowed the cat to catch the bird.\n"
			"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n"
			"She swallowed the spider to catch the fly.\n"
			"I don't know why she swallowed the fly. Perhaps she'll die.\n";
		break;
	case 6:
		verse = "I know an old lady who swallowed a goat.\n"
			"Just opened her throat and swallowed a goat!\n"
			"She swallowed the goat to catch the dog.\n"
			"She swallowed the dog to catch the cat.\n"
			"She swallowed the cat to catch the bird.\n"
			"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n"
			"She swallowed the spider to catch the fly.\n"
			"I don't know why she swallowed the fly. Perhaps she'll die.\n";
		break;
	case 7:
		verse = "I know an old lady who swallowed a cow.\n"
			"I don't know how she swallowed a cow!\n"
			"She swallowed the cow to catch the goat.\n"
			"She swallowed the goat to catch the dog.\n"
			"She swallowed the dog to catch the cat.\n"
			"She swallowed the cat to catch the bird.\n"
			"She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n"
			"She swallowed the spider to catch the fly.\n"
			"I don't know why she swallowed the fly. Perhaps she'll die.\n";
		break;
	case 8:
		verse = "I know an old lady who swallowed a horse.\n"
			"She's dead, of course!\n";
	}
	return verse;
}

std::string food_chain::verses(uint16_t start, uint16_t end) {
	std::string song = "";
	for (int i = start; i <= end; i++)
		song += verse(i) + '\n';

	return song;
}

std::string food_chain::sing() {
	return verses(1, 8);
}
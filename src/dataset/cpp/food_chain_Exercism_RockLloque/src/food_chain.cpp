/* 
#ifndef FOODCHAIN_H
#define FOODCHAIN_H
#include <string>

namespace food_chain
{
	std::string verse(unsigned);
	std::string verses(unsigned, unsigned);
	std::string sing();

} */


#endif
#include "food_chain.h"

#include <iostream>



namespace food_chain
{

	

	std::string song_content[]{
"I know an old lady who swallowed a fly.\nI don't know why she swallowed the fly. Perhaps she'll die.\n",
 "I know an old lady who swallowed a spider.\nIt wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.\n",
 "I know an old lady who swallowed a bird.\nHow absurd to swallow a bird!\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.\n",
 "I know an old lady who swallowed a cat.\nImagine that, to swallow a cat!\nShe swallowed the cat to catch the bird.\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.\n",
"I know an old lady who swallowed a dog.\nWhat a hog, to swallow a dog!\nShe swallowed the dog to catch the cat.\nShe swallowed the cat to catch the bird.\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.\n",
  "I know an old lady who swallowed a goat.\nJust opened her throat and swallowed a goat!\nShe swallowed the goat to catch the dog.\nShe swallowed the dog to catch the cat.\nShe swallowed the cat to catch the bird.\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.\n",

 "I know an old lady who swallowed a cow.\nI don't know how she swallowed a cow!\nShe swallowed the cow to catch the goat.\nShe swallowed the goat to catch the dog.\nShe swallowed the dog to catch the cat.\nShe swallowed the cat to catch the bird.\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\nShe swallowed the spider to catch the fly.\nI don't know why she swallowed the fly. Perhaps she'll die.\n",
 "I know an old lady who swallowed a horse.\nShe's dead, of course!\n"
	} ;


	std::string verse(unsigned num)
	{
		return song_content[num-1];
	}

	std::string verses(unsigned begin, unsigned end)
	{
		std::string whole{""};
		if(begin >=1 and end <=8)
		{
			for( unsigned it{begin}; it<=end; ++it)
			{
				whole+= verse(it);
				whole+= "\n";
			}
		}
		return whole;
	}

	std::string sing(){
		return verses(1,8);
	}
}
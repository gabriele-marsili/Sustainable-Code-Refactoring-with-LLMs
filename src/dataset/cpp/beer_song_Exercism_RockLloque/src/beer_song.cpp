/*
 * =====================================================================================
 *
 *       Filename:  beer_song.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  29.05.2015 14:34:55
 *       Revision:  none
 *       Compiler:  gcc
 *
 * =====================================================================================

content of beer_song.h:
#ifndef BEER_SONG_H
#define BEER_SONG_H
#include <string>


namespace beer{
	std::string verse(int);
	std::string sing(int, int);
	std::string sing(int);
}


#endif

 */
#include "beer_song.h"
#include <algorithm>
#include <iostream>
#include <boost/algorithm/string.hpp>

namespace beer
{

const std::string lyrics[]{
	" bottles of beer",
	" on the wall",
	"Take one down and pass it around, ",
	"Go to the store and buy some more, ",
	"no more"};


class song
{
	public:
		song( int n): numBottles{n}, line{""} {construct();}

		void setBottles(int n)
		{
			numBottles= n;
			construct();
		}
		void construct()
		{
			std::string numBot= std::to_string(numBottles);
			std::string oneLessBottle= std::to_string(numBottles-1);
			line="";
			//First line
			line+= numBot;
			line+= lyrics[0];
			line+= lyrics[1];
			line+= ", ";
			line+= numBot;
			line+= lyrics[0];
			line+= ".\n";

			if( numBottles==1)
			{
				line.erase( std::remove_if(line.begin(), line.end(), 
							[](char c){return c == 's';}), line.end());
				oneLessBottle = "no more";
			}

			//second line
			line+= lyrics[2];
			line+= oneLessBottle;
			line+= lyrics[0];
			line+= lyrics[1];
			line+= ".\n";
			if( numBottles==2)
			{
				boost::replace_all(line, "1 bottles", "1 bottle");
			}
			if( numBottles==1)
			{
				boost::replace_all(line, "one", "it");
			}
			if( numBottles == 0)
			{
				line = "";
				line+= "No more";
				line+= lyrics[0];
				line+= lyrics[1];
				line+= ", ";
				line+= "no more";
				line+= lyrics[0];
				line+= ".\n";
				line+= lyrics[3];
				line+= "99";
				line+= lyrics[0];
				line+= lyrics[1];
				line+= ".\n";

			}
		}

		void print(){
			std::cout << line << '\n';
		}
		std::string singing()
		{
			return line;
		}

	private:
		std::string line;
		int numBottles;
};

std::string verse(int n){

	song beersong(n);
	return beersong.singing();	
}

std::string sing(int a, int b)
{
	std::string multiverse{};
	song beersong(a);
	multiverse += beersong.singing();
	for(int i= a-1; i>= b; --i)
	{
		multiverse += "\n";
		beersong.setBottles(i);
		multiverse += beersong.singing();
	}
	return multiverse;
}

std::string sing(int a)
{
	return sing(a, 0);
}
}
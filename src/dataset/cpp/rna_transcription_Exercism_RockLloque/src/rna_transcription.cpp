/*
 * =====================================================================================
 *
 *       Filename:  rna_transcription.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  19.06.2015 13:27:13
 *       Revision:  none
 *       Compiler:  gcc
 *
#ifndef RNA_TRANSCRIPTION_H
#define RNA_TRANSCRIPTION_H

#include <string>
namespace transcription
{
	char to_rna(char); //sends back the rna-equivalent for one char
	std::string to_rna(std::string ); //sends back the rna-equivalent for a string
}

#endif
 *
 * =====================================================================================
 */

#include <algorithm>
#include <stdexcept>
#include "rna_transcription.h"



namespace transcription
{
	static std::string const dna{"GCTA"};
	static std::string const rna{"CGAU"};

	char nucleo_switch(char c)
	{
		const auto charpos = dna.find(c);
		if( charpos != std::string::npos )
		{
			c = rna[charpos];
			return c;
		}
		else
		{
			//Not demanded, but couldn't hurt either
			throw std::invalid_argument("Char is not a nucleotide");
		}
		return 0;
	}
/*---------------------------------------------------------
 * This is the old translation function. I replaced it, because the new
 * works better as a concept for comparisions with a larger amount of cases
	char switch_nucleo(char c)
	{
		switch(c)
		{
			case 'A' : c = 'U'; break;
			case 'C' : c = 'G'; break;
			case 'G' : c = 'C'; break;
			case 'T' : c = 'A'; break;
		}
		return c;
	}
---------------------------------------------------------*/

	char to_rna(char c)
	{
		return nucleo_switch(c);
	}


	std::string to_rna( std::string dna_string)
	{
		std::transform( dna_string.begin(), dna_string.end(), dna_string.begin(), nucleo_switch);
		return dna_string;
	}
}
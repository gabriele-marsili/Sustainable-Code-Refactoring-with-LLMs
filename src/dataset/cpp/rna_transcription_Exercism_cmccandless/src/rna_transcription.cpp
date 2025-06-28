#include "rna_transcription.h"

char transcription::to_rna(char ch)
{
	switch (ch)
	{
	case 'C': return 'G';
	case 'G': return 'C';
	case 'A': return 'U';
	case 'T': return 'A';
	}
	return '\0';
}

std::string transcription::to_rna(std::string s)
{
	std::stringstream ss;
	for (auto const &ch : s) ss << to_rna(ch);
	return ss.str();
}
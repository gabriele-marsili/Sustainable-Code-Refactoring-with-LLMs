#include "rna_transcription.h"

using namespace std;

char transcription::to_rna(char input)
{
    return transTable[input];
}

string transcription::to_rna(const string& input)
{
    string result;
    result.reserve(input.size());
    for (char nucleotide : input)
    {
        result.push_back(transTable[nucleotide]);
    }
    return result;
}
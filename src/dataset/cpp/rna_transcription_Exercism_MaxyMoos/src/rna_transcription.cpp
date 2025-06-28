#include "rna_transcription.h"

using namespace std;

char transcription::to_rna(char input)
{
    return transTable[input];
}

string transcription::to_rna(string input)
{
    string result = "";
    for (string::iterator it = input.begin(); it != input.end(); it++)
    {
        result += transTable[*it];
    }
    return result;
}
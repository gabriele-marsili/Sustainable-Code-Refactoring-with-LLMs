#include "nucleotide_count.h"
#include <boost/algorithm/string.hpp>
#include <stdexcept>

using namespace std;

dna::counter::counter(const string& input)
{
    this->refStr = input;
    /*
    this->countMap = { {'A', 0}, {'T', 0}, {'G', 0}, {'C', 0} };
    string accepted = "ATGC";
    for( string::iterator it = this->refStr.begin(); it != this->refStr.end() ; it++)
    {
        if(accepted.find(toupper(*it)) != string::npos)
        {
            this->countMap[toupper(*it)] += 1;
        }
    }
    */
}

const map<char, int> dna::counter::nucleotide_counts()
{
    map<char, int> ret{ {'A', 0}, {'T', 0}, {'G', 0}, {'C', 0} };
    string accepted = "ATGC";
    for( string::iterator it = this->refStr.begin(); it != this->refStr.end() ; it++)
    {
        if(accepted.find(toupper(*it)) != string::npos)
        {
            ret[toupper(*it)] += 1;
        }
    }
    return ret;
}

const int dna::counter::count(char nucleoChar)
{
    string accepted = "ATGC";
    if (accepted.find(toupper(nucleoChar)) == string::npos)
    {
        throw invalid_argument("Wrong nucleotide");
    }
    map<char, int> tmp = this->nucleotide_counts();
    return tmp[nucleoChar];
}
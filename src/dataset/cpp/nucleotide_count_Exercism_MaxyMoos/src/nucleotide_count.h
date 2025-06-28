#include <string>
#include <map>

using namespace std;

namespace dna
{
    class counter
    {
    public:
        counter(const string& input);
        const map<char, int> nucleotide_counts();
        const int count(char nucleoChar);
    protected:
        const string refStr;
        map<char, int> countMap;
    };
}
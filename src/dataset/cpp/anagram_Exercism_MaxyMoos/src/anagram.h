#include <string>
#include <vector>

class anagram
{
public:
    anagram(std::string const& inputString);
    std::vector<std::string> matches(std::vector<std::string> const& candidates);
protected:
    std::string refStr;
    std::string orderedStr;
};
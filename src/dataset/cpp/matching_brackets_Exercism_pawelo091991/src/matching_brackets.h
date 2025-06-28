#if !defined(MATCHING_BRACKETS_H)
#define MATCHING_BRACKETS_H
#include <string>
#include <map>
namespace matching_brackets {
	bool check(std::string str);
	bool erase(char brk, std::string& str);
}  // namespace matching_brackets

#endif // MATCHING_BRACKETS_H
#ifndef grade_school_h
#define grade_school_h

#include <algorithm>
#include <map>
#include <string>
#include <vector>

namespace grade_school
{
	class school
	{
	private:
		std::map<int, std::vector<std::string>> _roster;
	public:
		school();
		std::map<int, std::vector<std::string>> roster();
		void add(std::string, int);
		std::vector<std::string> grade(int);
	};
}

#endif

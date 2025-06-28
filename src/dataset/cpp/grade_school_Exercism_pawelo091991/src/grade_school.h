#ifndef GRADE_SCHOOL_H
#define GRADE_SCHOOL_H
#include <algorithm>
#include <string>
#include <vector>
#include <map>
using std::string;
using std::vector;
using std::map;

namespace grade_school {
	class school {
		map<int, vector<string>> database;
	public:
		const map<int, vector<string>> roster() const;
		void add(const string name, int grade);
		const vector<string> grade(int grade) const;
	};
}

#endif //GRADE_SCHOOL_H
#include "grade_school.h"
#include <algorithm>
using namespace	std;

namespace grade_school {
	school::school() {}

	const map<int, vector<string>>&	school::roster() const {
		return (_roster);
	}

	const vector<string>			school::grade(int grade) const {
		try {
			return (_roster.at(grade));
		} catch (const std::exception& e) {
			return (vector<string>());
		}
	}

	void	school::add(const string& name, int grade) {
		_roster[grade].push_back(name);
		std::sort(_roster[grade].begin(), _roster[grade].end());
	}
}  // namespace grade_school

#include "grade_school.h"
#include <algorithm>
using namespace	std;

namespace grade_school {
	school::school() {}

	const map<int, vector<string>>&	school::roster() const {
		return (_roster);
	}

	const vector<string>			school::grade(int grade) const {
		auto it = _roster.find(grade);
		if (it != _roster.end()) {
			return it->second;
		}
		return vector<string>();
	}

	void	school::add(const string& name, int grade) {
		auto& grade_list = _roster[grade];
		auto insert_pos = std::lower_bound(grade_list.begin(), grade_list.end(), name);
		grade_list.insert(insert_pos, name);
	}
}  // namespace grade_school
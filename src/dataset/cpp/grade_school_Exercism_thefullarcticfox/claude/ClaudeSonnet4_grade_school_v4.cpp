#include "grade_school.h"
#include <algorithm>
using namespace std;

namespace grade_school {
	school::school() {
		_roster.reserve(12);
	}

	const map<int, vector<string>>& school::roster() const {
		return _roster;
	}

	const vector<string> school::grade(int grade) const {
		auto it = _roster.find(grade);
		return (it != _roster.end()) ? it->second : vector<string>();
	}

	void school::add(const string& name, int grade) {
		auto& grade_vector = _roster[grade];
		auto insert_pos = lower_bound(grade_vector.begin(), grade_vector.end(), name);
		grade_vector.insert(insert_pos, name);
	}
}
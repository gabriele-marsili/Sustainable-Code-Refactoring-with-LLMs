#include "grade_school.h"

namespace grade_school {
	const map<int, vector<string>> school::roster()const {
		return database;
	}

	void school::add(const string name, int grade) {
		database[grade].push_back(name);
		std::sort(database[grade].begin(), database[grade].end());
	}

	const vector<string> school::grade(int grade) const {
		if (database.count(grade))
			return database.find(grade)->second;
		else
			return vector<string>{};
	}
}
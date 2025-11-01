#include "grade_school.h"
#include <algorithm>
using namespace std;
using namespace grade_school;

map<int, vector<string> > school::roster()
{
	for (auto& grade_pair : grades) {
		if (!std::is_sorted(grade_pair.second.begin(), grade_pair.second.end())) {
			std::sort(grade_pair.second.begin(), grade_pair.second.end());
		}
	}
	return grades;
}

void school::add(string n, int no)
{
	auto& grade_vector = grades[no];
	auto insert_pos = std::lower_bound(grade_vector.begin(), grade_vector.end(), n);
	grade_vector.insert(insert_pos, std::move(n));
}

vector<string> school::grade(int n)
{
	auto it = grades.find(n);
	if (it != grades.end()) {
		auto& grade_vector = it->second;
		if (!std::is_sorted(grade_vector.begin(), grade_vector.end())) {
			std::sort(grade_vector.begin(), grade_vector.end());
		}
		return grade_vector;
	}
	return vector<string>();
}
#include "grade_school.h"
#include <algorithm>
using namespace std;
using namespace grade_school;

map<int, vector<string> > school::roster()
{
	for (auto& grade_pair : grades) {
		if (!grade_pair.second.empty()) {
			sort(grade_pair.second.begin(), grade_pair.second.end());
		}
	}
	return grades;
}

void school::add(string n, int no)
{
	grades[no].push_back(n);
}

vector<string> school::grade(int n)
{
	auto it = grades.find(n);
	if (it != grades.end()) {
		sort(it->second.begin(), it->second.end());
		return it->second;
	}
	return vector<string>();
}
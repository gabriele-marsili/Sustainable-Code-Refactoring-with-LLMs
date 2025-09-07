#include "grade_school.h"
#include <algorithm>
using namespace std;
using namespace grade_school;

map<int, vector<string> > school::roster()
{
	return grades;
}

void school::add(const string& n, int no)
{
	auto& grade_vector = grades[no];
	auto insert_pos = lower_bound(grade_vector.begin(), grade_vector.end(), n);
	grade_vector.insert(insert_pos, n);
}

vector<string> school::grade(int n)
{
	auto it = grades.find(n);
	if (it != grades.end()) {
		return it->second;
	}
	return vector<string>();
}
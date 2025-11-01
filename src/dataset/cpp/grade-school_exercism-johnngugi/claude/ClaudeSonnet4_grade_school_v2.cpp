#include "grade_school.h"
#include <algorithm>
using namespace std;
using namespace grade_school;

map<int, vector<string> > school::roster()
{
	return grades;
}

void school::add(string n, int no)
{
	auto& grade_vector = grades[no];
	auto insert_pos = lower_bound(grade_vector.begin(), grade_vector.end(), n);
	grade_vector.insert(insert_pos, move(n));
}

vector<string> school::grade(int n)
{
	auto it = grades.find(n);
	return it != grades.end() ? it->second : vector<string>();
}
#include "grade_school.h"
#include <algorithm>
#include <vector>
#include <map>
#include <string>

using namespace std;
using namespace grade_school;

map<int, vector<string> > school::roster() const
{
    return grades;
}

void school::add(const string& name, int grade_level)
{
    grades[grade_level].push_back(name);
    sort(grades[grade_level].begin(), grades[grade_level].end());
}

vector<string> school::grade(int grade_level) const
{
    auto it = grades.find(grade_level);
    if (it != grades.end()) {
        return it->second;
    } else {
        return {};
    }
}
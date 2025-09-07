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

void school::add(const string& n, int no)
{
    auto& grade_level = grades[no];
    grade_level.push_back(n);
    sort(grade_level.begin(), grade_level.end());
}

vector<string> school::grade(int n) const
{
    auto it = grades.find(n);
    if (it != grades.end()) {
        return it->second;
    } else {
        return {};
    }
}
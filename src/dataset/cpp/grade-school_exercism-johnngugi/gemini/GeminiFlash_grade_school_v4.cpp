#include "grade_school.h"
#include <algorithm>
#include <vector>
#include <map>
#include <string>

using namespace std;
using namespace grade_school;

map<int, vector<string>> school::roster() const
{
    return grades;
}

void school::add(const string& name, int grade_level)
{
    auto& grade_list = grades[grade_level];
    grade_list.push_back(name);
    std::sort(grade_list.begin(), grade_list.end());
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
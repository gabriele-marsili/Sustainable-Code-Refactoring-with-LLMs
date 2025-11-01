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
    auto& grade_list = grades[no];
    grade_list.push_back(n);
    sort(grade_list.begin(), grade_list.end());
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
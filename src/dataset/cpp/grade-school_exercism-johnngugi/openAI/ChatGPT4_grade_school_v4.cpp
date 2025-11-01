#include "grade_school.h"
#include <map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;
using namespace grade_school;

map<int, vector<string>> school::roster() const
{
    return grades;
}

void school::add(const string& n, int no)
{
    auto& students = grades[no];
    auto it = lower_bound(students.begin(), students.end(), n);
    if (it == students.end() || *it != n) {
        students.insert(it, n);
    }
}

vector<string> school::grade(int n) const
{
    auto it = grades.find(n);
    return it != grades.end() ? it->second : vector<string>{};
}
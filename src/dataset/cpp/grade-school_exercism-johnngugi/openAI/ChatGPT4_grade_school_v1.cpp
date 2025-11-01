#include "grade_school.h"
#include <algorithm>
using namespace std;
using namespace grade_school;

map<int, vector<string>> school::roster()
{
    return grades;
}

void school::add(const string& n, int no)
{
    auto& students = grades[no];
    if (find(students.begin(), students.end(), n) == students.end()) {
        students.insert(lower_bound(students.begin(), students.end(), n), n);
    }
}

vector<string> school::grade(int n) const
{
    auto it = grades.find(n);
    return it != grades.end() ? it->second : vector<string>{};
}
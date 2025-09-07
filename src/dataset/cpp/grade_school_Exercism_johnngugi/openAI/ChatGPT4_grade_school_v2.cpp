#include "grade_school.h"
#include <map>
#include <set>
#include <vector>
#include <string>
using namespace std;
using namespace grade_school;

map<int, set<string>> grades;

map<int, vector<string>> school::roster()
{
    map<int, vector<string>> result;
    for (const auto& [grade, names] : grades) {
        result[grade] = vector<string>(names.begin(), names.end());
    }
    return result;
}

void school::add(const string& n, int no)
{
    grades[no].insert(n);
}

vector<string> school::grade(int n)
{
    if (grades.find(n) != grades.end()) {
        return vector<string>(grades[n].begin(), grades[n].end());
    }
    return {};
}
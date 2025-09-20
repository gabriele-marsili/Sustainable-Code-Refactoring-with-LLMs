#include "grade_school.h"
#include <map>
#include <vector>
#include <string>
#include <set>
using namespace std;
using namespace grade_school;

map<int, vector<string>> school::roster()
{
    map<int, vector<string>> sorted_roster;
    for (const auto& [grade, names] : grades) {
        sorted_roster[grade] = vector<string>(names.begin(), names.end());
    }
    return sorted_roster;
}

void school::add(string n, int no)
{
    grades[no].insert(n);
}

vector<string> school::grade(int n)
{
    return vector<string>(grades[n].begin(), grades[n].end());
}
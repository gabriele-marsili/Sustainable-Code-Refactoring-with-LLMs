#include "grade_school.h"
#include <map>
#include <vector>
#include <string>
#include <set>
using namespace std;
using namespace grade_school;

map<int, set<string>> grades;

map<int, vector<string>> school::roster()
{
    map<int, vector<string>> result;
    for (const auto& [grade, students] : grades) {
        result[grade] = vector<string>(students.begin(), students.end());
    }
    return result;
}

void school::add(string n, int no)
{
    grades[no].insert(move(n));
}

vector<string> school::grade(int n)
{
    return vector<string>(grades[n].begin(), grades[n].end());
}
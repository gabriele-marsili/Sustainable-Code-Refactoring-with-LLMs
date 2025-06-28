#ifndef GRADE_SCHOOL_H
#define GRADE_SCHOOL_H

#include <string>
#include <vector>
#include <map>

using namespace std;

namespace grade_school
{
    class school
    {
        map<int, vector<string>> _roster;
    public:
        map<int, vector<string>> roster();
        void add(string studentName, int grade);
        vector<string> grade(int grade);
    };
}

#endif
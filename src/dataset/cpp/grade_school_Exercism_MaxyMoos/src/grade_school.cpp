#include "grade_school.h"

#include <iostream>

using namespace std;


namespace grade_school
{

    map<int, vector<string>> school::roster()
    {
        return this->_roster;
    }

    void school::add(string studentName, int grade)
    {
        if(!this->_roster[grade].empty())
        {
            vector<string>::iterator iter = this->_roster[grade].begin();
            bool inserted = false;
            while(iter != this->_roster[grade].end())
            {
                if (*iter > studentName)
                {
                    this->_roster[grade].insert(iter, studentName);
                    inserted = true;
                    break;
                }
                iter++;
            }
            // If we've reached the end of the vector, append the student
            if (!inserted)
                this->_roster[grade].insert(iter, studentName);
        }
        else
            this->_roster[grade] = vector<string>{studentName};
    }

    vector<string> school::grade(int grade)
    {
        return this->_roster[grade];
    }
}
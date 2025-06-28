#include "grade_school.h"

grade_school::school::school() { _roster = std::map<int, std::vector<std::string>>(); }

std::map<int, std::vector<std::string>> grade_school::school::roster() { return _roster; }

void grade_school::school::add(std::string name, int grade)
{
	_roster[grade].push_back(name);
	sort(_roster[grade].begin(), _roster[grade].end());
}

std::vector<std::string> grade_school::school::grade(int grade)
{
	try { return _roster[grade]; }
	catch (...) { return std::vector<std::string>(); }
}

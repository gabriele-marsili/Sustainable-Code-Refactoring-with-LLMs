#include <stdexcept>
#include "hamming.h" 

using namespace std;

int hamming::compute(string a, string b)
{
	int result = 0;
	if (a.length() != b.length())
	{
		throw domain_error("a.size() != b.size()");
	}
	for (int i = 0; i < (int)a.length(); i++)
	{
		result += a[i] != b[i];
	}
	return result;
}
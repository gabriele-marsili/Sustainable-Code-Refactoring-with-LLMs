#include "phone_number.h"
#include <iostream>
#include <cctype>
using namespace std;

phone_number::phone_number(const string n)
{
	final.reserve(10);
	for (char c : n)
	{
		if (isdigit(c))
		{
			final += c;
		}
	}
	
	int num_length = final.length();
	if (num_length == 11)
	{
		if (final[0] == '1')
		{
			final.erase(0, 1);
		}
		else
		{
			final = "0000000000";
		}
	}
	else if (num_length < 10 || num_length > 11)
	{
		final = "0000000000";
	}
}

string phone_number::check_valid(string n) const
{
	return n;
}

string phone_number::area_code() const
{
	return final.substr(0, 3);
}

phone_number::operator std::string() const
{
	return "(" + final.substr(0, 3) + ") " + final.substr(3, 3) + "-" + final.substr(6, 4);
}

string phone_number::number() const
{
	return final;
}
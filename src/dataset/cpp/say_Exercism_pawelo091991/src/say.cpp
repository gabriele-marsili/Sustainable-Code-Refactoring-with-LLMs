#include "say.h"


string say::in_english(unsigned long long number) {

	string word = "";

	
	if (number == 0)											//"zero" - special case
		return "zero";


	if (number / 1000000000) {									//check if there is any billion in number
		word += hundreds(number / 1000000000) + " billion ";	//send bilion part to create word
		erase(number, 1000000000);								//erase bilion part from number
	}
																//repeat for million and thousand
	
	if (number / 1000000) {
		word += hundreds(number / 1000000) + " million ";
		erase(number, 1000000);
	}

	if (number / 1000) {
		word += hundreds(number / 1000) + " thousand ";
		erase(number, 1000);
	}

	if (number == 0) {											//if there is nothing after "billion " or "million " or "thousand ", delete white space
		word.resize(word.size() - 1);
		return word;
	}
	else {														//else add last hundred
		word += hundreds(number);
		return word;
	}
}


string say::hundreds(unsigned long long number) {

	string word = "";
	const string vocabulary1[] = {"", "one", "two","three","four",
		"five", "six", "seven", "eight", "nine" };
	const string vocabulary2[] = { "ten", "eleven", "twelve", "thirteen", "fourteen",
		"fiftheen", "sixteen", "seventeen", "eighteen", "nineteen" };
	const string vocabulary3[] = { "NULL" ,"NULL","twenty","thirty","forty","fifty",
		"sixty","seventy","eighty","ninety" };

	if (number >= 1000 || number < 0)							//check if out of range ( more than 1000 means more than billions)
		throw std::domain_error("Out of range");

	if (number / 100) {											//check if there is hundred
		word += vocabulary1[(number / 100)] + " hundred ";
		erase(number, 100);
	}

	if (number / 10 > 1) {										//check if there is -ty...
		word += vocabulary3[number / 10];
		erase(number, 10);
		if(number == 0)
			return word;
		else {
			word += "-" + vocabulary1[number];
			return word;
		}
	}
	else if (number / 10 == 1) {								//...or -teen
		word += vocabulary2[number - 10];
		return word;
	}
	else {														//if there is no -ty or -teen then add last digit
		word += vocabulary1[number];
		if (word[word.size() - 1] == ' ') word.resize(word.size() - 1);		//if there is "hundred " and nothing left, erase white space at the end
		return word;
	}
}


void say::erase(unsigned long long& number1, unsigned long long number2) {
	unsigned long long number3 = number1;
	number3 /= number2;
	number3 *= number2;
	number1 -= number3;
}
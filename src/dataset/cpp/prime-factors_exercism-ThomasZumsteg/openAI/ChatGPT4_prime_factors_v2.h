#pragma once

#include <vector>

namespace prime_factors {
	using namespace std;

	vector<int> of(int nNum);
}

//prime_factors.cpp
//#include "prime_factors.h"
using namespace std;

vector<int> prime_factors::of(int nNum) {
	vector<int> vnFactors;

	while (nNum % 2 == 0) {
		vnFactors.push_back(2);
		nNum /= 2;
	}

	for (int i = 3; i * i <= nNum; i += 2) {
		while (nNum % i == 0) {
			vnFactors.push_back(i);
			nNum /= i;
		}
	}

	if (nNum > 1) {
		vnFactors.push_back(nNum);
	}

	return vnFactors;
}